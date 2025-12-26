import fs, { link } from 'fs';

export function createPrismaModel(commandArg) {
    let prismaSchemaText = fs.readFileSync('./prisma/schema.prisma', 'utf8');
    prismaSchemaText += fs.readFileSync('./core/adelCommands/commands/templates/prismaModel.txt', 'utf8').replace('${commandArg}', commandArg);
    fs.writeFileSync('./prisma/schema.prisma', prismaSchemaText);
}