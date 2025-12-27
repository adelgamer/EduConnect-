import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { ConflictException } from "../../../core/errors/ConflictException.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";
import { UnauthorizedExcpetion } from "../../../core/errors/UnauthorizedExcpetion copy.js";

/**
 * Fetches all user data.
 */
export async function getAll() {
    return "List of all users retrieved from the service.";
}

/**
 * Fetches a single user by ID.
 */
export async function getById(id: string) {
    // 1- Getting user and checking if exists
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundExcpetion('User not found');

    return user;
}

/**
 * Processes data to create a new user.
 */
export async function create(data: any) {
    return "user data processed and created successfully.";
}

/**
 * Processes data to update an existing user.
 */
export async function update(actorId: string, id: string, data: any) {
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

    // 4- Update user informations
    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            bio: data.bio,
        }
    })

    return updatedUser;
}

/**
 * Performs the deletion of a user record.
 */
export async function remove(id: string) {
    return "user with ID: \${id\} deleted successfully.";
}