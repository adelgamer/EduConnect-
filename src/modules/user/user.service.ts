import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { ConflictException } from "../../../core/errors/ConflictException.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";
import { UnauthorizedExcpetion } from "../../../core/errors/UnauthorizedExcpetion.js";
import bycrypt from 'bcrypt'
import { sanitizeUser } from "../../helpers/user.helper.js";
import { BadRequestExcpetion } from "../../../core/errors/BadRequestException.js";
import { User } from "../../../generated/prisma/client.js";
import { redisClient } from "../../../core/redis/redis.client.js";
import { s3Client } from "../../../core/cloudStorage/s3Client.js";
import { randomUUID } from "crypto";
import path from "path";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs/promises";

export const userFields = {
    id: true,
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    createdAt: true,
    updatedAt: true,
    profilePhoto: true,
    academicYear: true
}

/**
 * Fetches all user data.
 */
export async function getAll(cursor: string, limit: number) {

    // Checking cache
    const redisKey: string = `users:${cursor}:${limit}`;
    let response: any = await redisClient.get(redisKey);
    if (response) return { cache: true, data: JSON.parse(response) };

    const query: any = {
        take: limit + 1,
        orderBy: {
            id: 'asc'
        }
    }
    if (cursor) {
        query.cursor = { id: cursor };
    }

    const users = await prisma.user.findMany(query);

    let hasNextPage: boolean = false;
    let nextCursor: string | null = null;
    if (users.length > limit) {
        hasNextPage = true;
        nextCursor = users[limit].id;
        users.pop();
    };

    // Getting images
    for (const user of users) {
        if (!user.profilePhoto) continue;

        const command = new GetObjectCommand({
            Key: user.profilePhoto,
            Bucket: "edu-connect",
        });
        user.profilePhoto = await getSignedUrl(s3Client, command, {
            expiresIn: 1800
        })
    }

    // Setting cache and returning response
    response = { cache: false, data: { users, pagination: { hasNextPage, nextCursor, count: users.length } } };
    await redisClient.setEx(redisKey, 1800, JSON.stringify(response.data))

    return response;
}

/**
 * Fetches a single user by ID.
 */
export async function getById(id: string) {
    // Checking cache
    const redisKey = `user:${id}`;
    let response: any = await redisClient.get(redisKey);
    if (response) return { cache: true, data: JSON.parse(response) }

    // 1- Getting user and checking if exists
    const user = await prisma.user.findUnique({
        where: { id }, select: userFields
    });
    if (!user) throw new NotFoundExcpetion('User not found');

    // Getting image
    if (user.profilePhoto) {
        const command = new GetObjectCommand({
            Key: user.profilePhoto,
            Bucket: "edu-connect",
        });
        user.profilePhoto = await getSignedUrl(s3Client, command, {
            expiresIn: 1800
        })
    }

    // Setting cache
    response = { cache: false, data: user }
    await redisClient.setEx(redisKey, 1800, JSON.stringify(response.data))

    return response;
}

/**
 * Processes data to update an existing user.
 */
export async function update(actorId: string, id: string, data: any, profileImage: Express.Multer.File | undefined) {
    // 1- Check if user is updating himself
    if (actorId !== id) throw new UnauthorizedExcpetion('Can\'t update another user');

    // 2- Check if the updated user exists
    const user = await prisma.user.findUnique({ where: { id }, select: userFields });
    if (!user) throw new NotFoundExcpetion('User not found');

    // 3- Check if username exists in another record
    const usersWithSameUsername = await prisma.user.findMany({
        where: {
            id: {
                not: id
            },
            username: data.username
        },
        select: userFields
    })
    if (usersWithSameUsername.length > 0) throw new ConflictException('Username already exists');

    // 4- Check if profileImage is an image
    let profileImageUrl: string | null = null;
    if (profileImage && (profileImage.mimetype !== 'image/jpeg' || profileImage.size / (1024 * 1024) > 2)) throw new BadRequestExcpetion('Profile image is not an image less then 2mb');
    if (profileImage) profileImageUrl = profileImage.path.replaceAll('\\', '/');

    // 5- Update user informations
    const dataToUpdate: Partial<User> = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        bio: data.bio,
    }
    if (profileImageUrl) {
        // creating s3 command
        const key = `user/${id}/avatar/${randomUUID()}${path.extname(profileImage!.originalname)}`;

        // Since we are using diskStorage, we must read the file from disk
        const fileBuffer = await fs.readFile(profileImage!.path);

        const command = new PutObjectCommand({
            Key: key,
            Bucket: 'edu-connect',
            Body: fileBuffer,
            ContentType: profileImage!.mimetype
        })

        await s3Client.send(command);
        dataToUpdate.profilePhoto = key;

        // Clean up: remove the local file after uploading to S3
        await fs.unlink(profileImage!.path).catch(err => console.error("Failed to delete local image:", err));
    }

    let updatedUser: any = await prisma.user.update({
        where: { id },
        data: dataToUpdate,
        select: userFields,
    })

    // Generating signed URL for the response
    if (updatedUser.profilePhoto) {
        const command = new GetObjectCommand({
            Key: updatedUser.profilePhoto,
            Bucket: "edu-connect",
        });
        updatedUser.profilePhoto = await getSignedUrl(s3Client, command, {
            expiresIn: 1800
        })
    }

    // 6- Updating cache
    const redisKey = `user:${id}`;
    await redisClient.setEx(redisKey, 1800, JSON.stringify(updatedUser));

    return updatedUser;
}

/**
 * Processes data to update an existing user.
 */
export async function updatePassword(actorId: string, data: any) {
    // 1- Check if user exists
    const user = await prisma.user.findUnique({ where: { id: actorId }, select: userFields });
    if (!user) throw new NotFoundExcpetion('User not found');

    // 2- Hash the password
    const salt = process.env.PASSWORD_HASHING_ROUNDS ? parseInt(process.env.PASSWORD_HASHING_ROUNDS, 10) : 10;
    const hashed = await bycrypt.hash(data.password, salt);

    // 3- Update password
    await prisma.user.update({
        where: {
            id: actorId
        },
        data: {
            passwordHash: hashed
        }
    })

    return user;
}

/**
 * Processes data to update an existing user.
 */
export async function updateUserAcdemicYear(actorId: string, data: any) {
    // 1- Check if user exists
    const user = await prisma.user.findUnique({ where: { id: actorId }, select: userFields });
    if (!user) throw new NotFoundExcpetion('User not found');

    // 2- Update academic year
    const userToReturn = await prisma.user.update({
        where: {
            id: actorId
        },
        data: {
            academicYear: data.academicYear
        },
        select: userFields
    })

    // 3- Setting cache
    const redisKey = `user:${actorId}`;
    await redisClient.setEx(redisKey, 1800, JSON.stringify(userToReturn));

    return userToReturn;
}