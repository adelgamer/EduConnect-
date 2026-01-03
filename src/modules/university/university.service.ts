import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";

async function checkIfUniversityExists(id: string) {
    const university = await prisma.university.findUnique({ where: { id } })
    if (!university) throw new NotFoundExcpetion('University does not exists');
}

/**
 * Fetches all University data.
 */
export async function getAll() {
    const universities = await prisma.university.findMany();
    return universities;
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
    const createdUniversity = await prisma.university.create({ data });
    return createdUniversity;
}

/**
 * Processes data to update an existing University.
 */
export async function update(id: string, data: any) {
    const updatedUniversity = await prisma.university.update({ where: { id }, data });
    return updatedUniversity;
}

/**
 * Performs the deletion of a University record.
 */
export async function remove(id: string) {
    // 1- Checking if usiversity exists
    await checkIfUniversityExists(id)

    // 2- Delete it
    const deletedUniversity = await prisma.university.delete({ where: { id } });
    return deletedUniversity;
}