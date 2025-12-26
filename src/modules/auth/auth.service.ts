import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { ConflictException } from "../../../core/errors/ConflictException.js";
import bcrypt from 'bcrypt';

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
    data.passwordHash = bcrypt.hashSync(data.password, salt);
    delete data.password;

    // 4- Create user
    user = await prisma.user.create({
        data
    });

    return user;
}