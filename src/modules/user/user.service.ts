import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { ConflictException } from "../../../core/errors/ConflictException.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";
import { UnauthorizedExcpetion } from "../../../core/errors/UnauthorizedExcpetion.js";
import bycrypt from 'bcrypt'
import { sanitizeUser } from "../../helpers/user.helper.js";
import { BadRequestExcpetion } from "../../../core/errors/BadRequestException.js";
import { User } from "../../../generated/prisma/client.js";
import { redisClient } from "../../../core/redis/redis.client.js";

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
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundExcpetion('User not found');

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
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundExcpetion('User not found');

    // 3- Check if username exists in another record
    const usersWithSameUsername = await prisma.user.findMany({
        where: {
            id: {
                not: id
            },
            username: data.username
        }
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
    if (profileImageUrl) dataToUpdate.profilePhoto = profileImageUrl;
    const updatedUser = await prisma.user.update({
        where: { id },
        data: dataToUpdate
    })

    return updatedUser;
}

/**
 * Processes data to update an existing user.
 */
export async function updatePassword(actorId: string, data: any) {
    // 1- Check if user exists
    const user = await prisma.user.findUnique({ where: { id: actorId } });
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

    return sanitizeUser(user);
}

/**
 * Processes data to update an existing user.
 */
export async function updateUserAcdemicYear(actorId: string, data: any) {
    // 1- Check if user exists
    const user = await prisma.user.findUnique({ where: { id: actorId } });
    if (!user) throw new NotFoundExcpetion('User not found');

    // 2- Update academic year
    const userToReturn = await prisma.user.update({
        where: {
            id: actorId
        },
        data: {
            academicYear: data.academicYear
        }
    })

    return sanitizeUser(userToReturn);
}