import { PrismaClient } from './generated/prisma/client.js'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import { beforeEach } from '@jest/globals'

// Create the deep mock of PrismaClient
export const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>

// Reset the mock before each test to ensure isolation
beforeEach(() => {
  mockReset(prismaMock)
})