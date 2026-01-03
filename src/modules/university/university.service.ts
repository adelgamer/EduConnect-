import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";

/**
 * Fetches all University data.
 */
export async function getAll() {
    return "List of all Universitys retrieved from the service.";
}

/**
 * Fetches a single University by ID.
 */
export async function getById(id: string) {
    // 1- Checking if usiversity exists
    const university = await prisma.university.findUnique({ where: { id } })
    if (!university) throw new NotFoundExcpetion('University does not exists');

    // 2- Return it with related faculties and specialties
    return university;
}

/**
 * Processes data to create a new University.
 */
export async function create(data: any) {
    return "University data processed and created successfully.";
}

/**
 * Processes data to update an existing University.
 */
export async function update(id: string, data: any) {
    return `University with ID: ${id} updated successfully.`;
}

/**
 * Performs the deletion of a University record.
 */
export async function remove(id: string) {
    return `University with ID: ${id} deleted successfully.`;
}