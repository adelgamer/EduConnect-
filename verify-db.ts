import prisma from './core/databaseClient/prismaClient/prismaClient.js';

async function main() {
    try {
        console.log('Connecting to database...');
        // Simple query to verify connection
        const result = await prisma.$queryRaw`SELECT 1 as result`;
        console.log('Connection successful!', result);
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
