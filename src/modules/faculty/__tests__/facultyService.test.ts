import { jest } from '@jest/globals';

// 1. Register the mock BEFORE importing anything else
jest.unstable_mockModule("../../../../core/databaseClient/prismaClient/prismaClient.js", async () => {
    const { prismaMock } = await import("../../../../singleton.js");
    return {
        default: prismaMock,
        __esModule: true
    };
});

// Mock the university service
jest.unstable_mockModule("../../university/university.service.js", async () => {
    return {
        checkIfUniversityExists: jest.fn(),
    };
});

// 2. Dynamically import the service and singleton AFTER the mock is registered
const { getAll, getById, create, update, remove } = await import("../faculty.service.js");
const { checkIfUniversityExists } = await import("../../university/university.service.js");
const { prismaMock } = await import("../../../../singleton.js");
import { NotFoundExcpetion } from "../../../../core/errors/NotFoundExcpetion.js";
import { ConflictException } from "../../../../core/errors/ConflictException.js";

describe('Faculty service', () => {
    const mockFaculty = {
        id: 'fac-1',
        name: 'Faculty of Law',
        shortName: 'Law',
        description: 'The Faculty of Law at Algiers 1.',
        website: 'https://law.univ-alger.dz',
        universityId: 'univ-1',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    describe('getAll', () => {
        it('should return all faculties', async () => {
            prismaMock.faculty.findMany.mockResolvedValue([mockFaculty] as any);

            const result = await getAll();

            expect(result).toEqual([mockFaculty]);
            expect(prismaMock.faculty.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('getById', () => {
        it('should return the faculty object when a valid ID is provided', async () => {
            prismaMock.faculty.findUnique.mockResolvedValue(mockFaculty as any);

            const result = await getById('fac-1');

            expect(result).toEqual(mockFaculty);
            expect(prismaMock.faculty.findUnique).toHaveBeenCalledWith({
                where: { id: 'fac-1', deletedAt: null }
            });
        });

        it('should throw NotFoundException when faculty does not exist', async () => {
            prismaMock.faculty.findUnique.mockResolvedValue(null);

            await expect(getById('non-existent')).rejects.toThrow(NotFoundExcpetion);
        });

        it('should throw NotFoundException when faculty is soft-deleted', async () => {
            const deletedFaculty = { ...mockFaculty, deletedAt: new Date() };
            prismaMock.faculty.findUnique.mockResolvedValue(deletedFaculty as any);

            await expect(getById('deleted-id')).rejects.toThrow(NotFoundExcpetion);
        });
    });

    describe('create', () => {
        const facultyData = {
            name: 'New Faculty',
            universityId: 'univ-1'
        };

        it('should create a new faculty if it does not already exist', async () => {
            prismaMock.faculty.findMany.mockResolvedValue([] as any);
            prismaMock.faculty.create.mockResolvedValue({ ...mockFaculty, ...facultyData } as any);

            const result = await create(facultyData);

            expect(result.name).toBe(facultyData.name);
            expect(prismaMock.faculty.create).toHaveBeenCalledWith({
                data: facultyData
            });
        });

        it('should throw ConflictException if faculty name already exists for the university', async () => {
            prismaMock.faculty.findMany.mockResolvedValue([mockFaculty] as any);

            await expect(create(facultyData)).rejects.toThrow(ConflictException);
            expect(prismaMock.faculty.create).not.toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('should update an existing faculty', async () => {
            const updateData = { name: 'Updated Faculty Name', universityId: 'univ-1' };
            (checkIfUniversityExists as any).mockResolvedValue({ id: 'univ-1' });
            prismaMock.faculty.update.mockResolvedValue({ ...mockFaculty, ...updateData } as any);

            const result = await update('fac-1', updateData);

            expect(result.name).toBe(updateData.name);
            expect(checkIfUniversityExists).toHaveBeenCalledWith('univ-1');
            expect(prismaMock.faculty.update).toHaveBeenCalledWith({
                where: { id: 'fac-1' },
                data: updateData
            });
        });
    });

    describe('remove', () => {
        it('should soft delete a faculty when it exists', async () => {
            prismaMock.faculty.findUnique.mockResolvedValue(mockFaculty as any);
            prismaMock.faculty.update.mockResolvedValue({ ...mockFaculty, deletedAt: new Date() } as any);

            const result = await remove('fac-1');

            expect(result.deletedAt).toBeDefined();
            expect(prismaMock.faculty.update).toHaveBeenCalledWith({
                where: { id: 'fac-1' },
                data: { deletedAt: expect.any(Date) }
            });
        });

        it('should throw NotFoundException when soft deleting a non-existent faculty', async () => {
            prismaMock.faculty.findUnique.mockResolvedValue(null);

            await expect(remove('non-existent')).rejects.toThrow(NotFoundExcpetion);
            expect(prismaMock.faculty.update).not.toHaveBeenCalled();
        });
    });
});
