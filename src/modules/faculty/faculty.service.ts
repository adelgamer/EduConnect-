import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { ConflictException } from "../../../core/errors/ConflictException.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";
import { checkIfUniversityExists } from "../university/university.service.js";

export async function checkIfFacultyExists(id: string) {
    const faculty = await prisma.faculty.findUnique({ where: { id, deletedAt: null } });
    if (!faculty || faculty.deletedAt) throw new NotFoundExcpetion('Faculty not found');
    return faculty;
}

/**
 * Fetches all Faculty data.
 */
export async function getAll() {
    const faculties = await prisma.faculty.findMany();
    return faculties;
}

/**
 * Fetches a single Faculty by ID.
 */
export async function getById(id: string) {
    // 1- Checking if faculty exists
    const faculty = await checkIfFacultyExists(id);

    // 2- Return it
    return faculty;
}

/**
 * Processes data to create a new Faculty.
 */
export async function create(data: any) {
    // 1- Check if unique
    const isNotUnique = await prisma.faculty.findMany({ where: { name: data.name, universityId: data.universityId, deletedAt: null } })
    if (isNotUnique.length > 0) throw new ConflictException('A faculty with this name already exists for this university');

    // 2- Create
    const faculty = await prisma.faculty.create({ data });
    return faculty;
}

/**
 * Processes data to update an existing Faculty.
 */
export async function update(id: string, data: any) {
    // 1- Check if university exists
    await checkIfUniversityExists(data.universityId);

    // 2- Update the data
    const faculty = await prisma.faculty.update({ where: { id }, data })

    return faculty;
}

/**
 * Performs the deletion of a Faculty record.
 */
export async function remove(id: string) {
    // 1- Check if it exists 
    await checkIfFacultyExists(id);

    // 2- Delete
    const faculty = await prisma.faculty.update({ where: { id }, data: { deletedAt: new Date() } })

    return faculty;
}