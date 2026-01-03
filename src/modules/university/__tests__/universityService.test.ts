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
const { getById } = await import("../university.service.js");
const { prismaMock } = await import("../../../../singleton.js");

describe('University service', () => {
  it("It should return the university object when a valid ID is provided", async () => {
    const mockUniversity = {
      id: 'adc',
      name: 'University of Algiers 1 (Ben Youcef Benkhedda)',
      shortName: 'Algiers 1',
      description: 'The oldest university in Algeria, founded in 1909. It focuses on Law, Islamic Sciences, and Medicine.',
      location: '2 Rue Didouche Mourad, Alger Centre 16000',
      website: 'https://www.univ-alger.dz',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Configure the mock behavior
    prismaMock.university.findUnique.mockResolvedValue(mockUniversity as any);

    const result = await getById('adc');

    // Verify the result matches our mock data
    expect(result).toEqual(mockUniversity);

    // Verify that the mock was called with correct parameters
    expect(prismaMock.university.findUnique).toHaveBeenCalledWith({
      where: { id: 'adc' }
    });
  });
});