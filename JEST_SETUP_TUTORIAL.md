# Setting up Jest with TypeScript, ESM, and Prisma Mocking

This guide explains how to configure Jest for a modern Node.js project using **ES Modules (ESM)**, **TypeScript**, and **Prisma**. It covers the standard installation and the specific patterns required to mock Prisma in an ESM environment.

## 1. Installation

Install the core testing dependencies:

```bash
npm install --save-dev jest ts-jest @types/jest @jest/globals jest-mock-extended
```

*   `jest`: The testing framework.
*   `ts-jest`: Allows Jest to test projects written in TypeScript.
*   `@jest/globals`: Provides type support for Jest globals (required for ESM).
*   `jest-mock-extended`: Simplifies mocking complex objects like the Prisma Client.

## 2. Jest Configuration (`jest.config.ts`)

Create a `jest.config.ts` file in your root directory. This configuration is specifically tuned for ESM and TypeScript.

```typescript
import type { Config } from 'jest';

const config: Config = {
  // Use the ESM preset for ts-jest
  preset: 'ts-jest/presets/default-esm',
  
  // Transform TypeScript files using ts-jest with ESM support
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },

  // Required for ESM support in Jest
  extensionsToTreatAsEsm: ['.ts'],

  // Maps .js imports to .ts files during testing (standard in TS ESM)
  moduleNameMapper: {
    '^(.*)\\.js$': '$1',
  },

  // Automatically clear mock calls/instances between tests
  clearMocks: true,

  // Automatically load the Prisma mock before every test suite
  setupFilesAfterEnv: ['<rootDir>/singleton.ts'], 
};

export default config;
```

## 3. Package Scripts (`package.json`)

Node.js requires the `--experimental-vm-modules` flag to run Jest in ESM mode. Update your `scripts` section:

```json
"scripts": {
  "test": "set NODE_ENV=test&& node --experimental-vm-modules node_modules/jest/bin/jest.js"
}
```
*Note: On Linux/macOS, use `export NODE_ENV=test && ...` or use the `cross-env` package.*

## 4. Prisma Mock Singleton (`singleton.ts`)

Create a `singleton.ts` file in your root to hold the mocked Prisma instance.

```typescript
import { PrismaClient } from '@prisma/client' // or your generated path
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import { beforeEach } from '@jest/globals'

// Create a deep mock of the Prisma Client
export const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>

// Reset the mock before each test to ensure test isolation
beforeEach(() => {
  mockReset(prismaMock)
})
```

## 5. Preventing Real Database Connections

In your Prisma Client initialization file (e.g., `prismaClient.ts`), ensure the client does not attempt to connect to a real database during tests.

```typescript
import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV !== 'test') {
    // Real production/development initialization
    prisma = new PrismaClient({
        // your config (adapters, logs, etc.)
    })
} else {
    // Placeholder for tests (will be replaced by the mock)
    prisma = {} as PrismaClient
}

export default prisma;
```

## 6. Writing a Mocked Test

In ESM, static `import` statements are evaluated before code execution. To mock a module, you must use `jest.unstable_mockModule` and dynamic `import()`.

```typescript
import { jest } from '@jest/globals';

// 1. Tell Jest to replace the real prismaClient module with our mock
// Provide the path to the file that exports your prisma instance
jest.unstable_mockModule("PATH_TO_YOUR_PRISMA_CLIENT_FILE.js", async () => {
    const { prismaMock } = await import("PATH_TO_YOUR_SINGLETON.js");
    return { 
        default: prismaMock,
        __esModule: true 
    };
});

// 2. Dynamically import the service and the mock AFTER the mock registration
const { myFunction } = await import("../my.service.js");
const { prismaMock } = await import("PATH_TO_YOUR_SINGLETON.js");

describe('My Service', () => {
  it('should behave correctly with mocked prisma', async () => {
    const mockData = { id: 1, name: 'Mocked Result' };

    // 3. Define the mock behavior for a specific Prisma model
    prismaMock.user.findUnique.mockResolvedValue(mockData as any);

    const result = await myFunction(1);

    expect(result).toEqual(mockData);
    expect(prismaMock.user.findUnique).toHaveBeenCalled();
  });
});
```

## Key Takeaways
1.  **Hoisting**: In ESM, `jest.mock()` does not hoist. Use `jest.unstable_mockModule`.
2.  **Dynamic Imports**: Use `await import()` for the modules you want to test after registering the mock.
3.  **Environment Check**: Always check `NODE_ENV` in your Database client to avoid unintended side effects during tests.
