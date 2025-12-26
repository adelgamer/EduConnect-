import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { ConflictException } from "../../../core/errors/ConflictException.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sanitizeUser } from "../../helpers/user.helper.js";
import { InternalServerError } from "../../../core/errors/InternalServerError.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";
import { UnauthorizedExcpetion } from "../../../core/errors/UnauthorizedExcpetion copy.js";
import { Request } from "express";

/**
 * Processes data to create a new auth.
 */
export async function signup(data: any) {
    // 1- Check if email
    let user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if (user) throw new ConflictException('User with this email already exists')

    // 2- Check if username exists
    user = await prisma.user.findUnique({
        where: {
            username: data.username
        }
    })
    if (user) throw new ConflictException('User with this username already exists')

    // 3- Hashing password
    const salt = process.env.PASSWORD_HASHING_ROUNDS ? parseInt(process.env.PASSWORD_HASHING_ROUNDS, 10) : 10;
    data.passwordHash = await bcrypt.hash(data.password, salt);
    delete data.password;

    // 4- Create user
    user = await prisma.user.create({
        data
    });
    const userToReturn = sanitizeUser(user);

    // 5- Generate access and refresh token
    try {
        const accessToken = await jwt.sign({ userId: userToReturn.id }, process.env.ACCESS_TOKEN_SECRET_KEY || 'secret_key', { expiresIn: '15m' });
        const refreshToken = await jwt.sign({ userId: userToReturn.id }, process.env.REFRESH_TOKEN_SECRET_KEY || 'refresh_secret_key', { expiresIn: '7d' });

        // Store refresh token in the database
        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
        })

        return {
            user: userToReturn,
            accessToken,
            refreshToken
        }
    } catch (err) {
        throw new InternalServerError('Internal server error', err);
    }
}

/**
 * Processes data to create a new auth.
 */
export async function login(data: any) {
    // 1- Check if user with the provided email exists
    let user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (!user) throw new NotFoundExcpetion('No user found with this email');
    // 2- Comparing password hashs if they match
    const isPasswordCorrect = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordCorrect) throw new UnauthorizedExcpetion('Incorrect credentials');

    // 3- Generate access and refresh token
    try {
        const accessToken = await jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET_KEY || 'secret_key', { expiresIn: "15m" });
        const refreshToken = await jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET_KEY || 'refresh_secret_key', { expiresIn: '7d' });

        // Store refresh token in the database
        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
        })

        const userToReturn = sanitizeUser(user);

        return {
            user: userToReturn,
            accessToken,
            refreshToken
        }
    } catch (err) {
        throw new InternalServerError('Internal server error', err);
    }
}

/**
 * Processes data to create a new auth.
 */
export async function logout(userId: string, data: any) {
    // 1- Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundExcpetion('User is not found');

    // 2- Check if refresh token exists in db
    console.log('Refresh token', data.refreshToken);
    const token = await prisma.refreshToken.findUnique({ where: { token: data.refreshToken } });
    if (!token) throw new NotFoundExcpetion('Refresh token not found');

    // 3- Delete refresh token from the database
    await prisma.refreshToken.delete({ where: { token: data.refreshToken } });

    return null;
}