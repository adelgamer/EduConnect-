import { jest } from '@jest/globals';

// 1. Register the mock BEFORE importing anything else
// We use the same path as used in the service file
jest.unstable_mockModule("../../../../core/databaseClient/prismaClient/prismaClient.js", async () => {
  // We import the mock object dynamically here
  const { prismaMock } = await import("../../../../singleton.js");
  return {
    default: prismaMock,
    __esModule: true
  };
});

// 2. Dynamically import the service and singleton AFTER the mock is registered
const { getAll, getById, create, update, remove } = await import("../university.service.js");
const { prismaMock } = await import("../../../../singleton.js");
import { NotFoundExcpetion } from "../../../../core/errors/NotFoundExcpetion.js";

describe('University service', () => {
  const mockUniversity = {
    id: 'adc',
    name: 'University of Algiers 1 (Ben Youcef Benkhedda)',
    shortName: 'Algiers 1',
    description: 'The oldest university in Algeria, founded in 1909.',
    location: '2 Rue Didouche Mourad, Alger Centre 16000',
    website: 'https://www.univ-alger.dz',
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('getAll', () => {
    it('should return all universities', async () => {
      prismaMock.university.findMany.mockResolvedValue([mockUniversity] as any);

      const result = await getAll();

      expect(result).toEqual([mockUniversity]);
      expect(prismaMock.university.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it("should return the university object when a valid ID is provided", async () => {
      prismaMock.university.findUnique.mockResolvedValue(mockUniversity as any);

      const result = await getById('adc');

      expect(result).toEqual(mockUniversity);
      expect(prismaMock.university.findUnique).toHaveBeenCalledWith({
        where: { id: 'adc' }
      });
    });

    it('should throw NotFoundException when university does not exist', async () => {
      prismaMock.university.findUnique.mockResolvedValue(null);

      await expect(getById('non-existent')).rejects.toThrow(NotFoundExcpetion);
    });
  });

  describe('create', () => {
    it('should create a new university', async () => {
      const universityData = {
        name: 'New University',
        shortName: 'NU',
        location: 'Location'
      };
      prismaMock.university.create.mockResolvedValue({ ...mockUniversity, ...universityData } as any);

      const result = await create(universityData);

      expect(result.name).toBe(universityData.name);
      expect(prismaMock.university.create).toHaveBeenCalledWith({
        data: universityData
      });
    });
  });

  describe('update', () => {
    it('should update an existing university', async () => {
      const updateData = { name: 'Updated Name' };
      prismaMock.university.update.mockResolvedValue({ ...mockUniversity, ...updateData } as any);

      const result = await update('adc', updateData);

      expect(result.name).toBe(updateData.name);
      expect(prismaMock.university.update).toHaveBeenCalledWith({
        where: { id: 'adc' },
        data: updateData
      });
    });
  });

  describe('remove', () => {
    it('should delete a university when it exists', async () => {
      prismaMock.university.findUnique.mockResolvedValue(mockUniversity as any);
      prismaMock.university.delete.mockResolvedValue(mockUniversity as any);

      const result = await remove('adc');

      expect(result).toEqual(mockUniversity);
      expect(prismaMock.university.delete).toHaveBeenCalledWith({
        where: { id: 'adc' }
      });
    });

    it('should throw NotFoundException when deleting a non-existent university', async () => {
      prismaMock.university.findUnique.mockResolvedValue(null);

      await expect(remove('non-existent')).rejects.toThrow(NotFoundExcpetion);
      expect(prismaMock.university.delete).not.toHaveBeenCalled();
    });
  });
});