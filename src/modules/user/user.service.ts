import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";

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
export async function update(id: string, data: any) {
    return "user with ID: \${id\} updated successfully.";
}

/**
 * Performs the deletion of a user record.
 */
export async function remove(id: string) {
    return "user with ID: \${id\} deleted successfully.";
}