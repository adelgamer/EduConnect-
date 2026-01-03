import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { ConflictException } from "../../../core/errors/ConflictException.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";

export async function checkIfUniversityExists(id: string) {
	const university = await prisma.university.findUnique({ where: { id, deletedAt: null } })
	if (!university || university.deletedAt) throw new NotFoundExcpetion('University does not exists');
	return university
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
	const university = await checkIfUniversityExists(id);

	// 2- Return it with related faculties and specialties
	return university;
}

/**
 * Processes data to create a new University.
 */
export async function create(data: any) {
	// 1- Check if university is unique
	const isUniversityExists = await prisma.university.findMany({
		where: {
			name: data.name,
			shortName: data.shortName,
			deletedAt: null,
		}
	})
	if (isUniversityExists.length > 0) throw new ConflictException('University already exists');

	// 2- Create
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
	const deletedUniversity = await prisma.university.update({ where: { id }, data: { deletedAt: new Date() } });

	return deletedUniversity;
}