import fs, { link } from 'fs';

export function createController(commandArg) {
    const controllerText = fs.readFileSync('./core/adelCommands/commands/templates/controller.txt', 'utf8')
        .replace(/\${moduleNamePascal}/g, commandArg)
        .replace(/\${moduleName}/g, commandArg);

    fs.writeFileSync(`./src/modules/${commandArg}/${commandArg}.controller.ts`, controllerText);
}

export function createService(commandArg) {
    const serviceText = fs.readFileSync('./core/adelCommands/commands/templates/service.txt', 'utf8')
        .replace(/\${moduleNamePascal}/g, commandArg)
        .replace(/\${moduleName}/g, commandArg);

    fs.writeFileSync(`./src/modules/${commandArg}/${commandArg}.service.ts`, serviceText);
}

export function createRouter(commandArg) {
    const routeText = fs.readFileSync('./core/adelCommands/commands/templates/route.txt', 'utf8')
        .replace(/\${moduleNamePascal}/g, commandArg)
        .replace(/\${moduleName}/g, commandArg);

    fs.writeFileSync(`./src/modules/${commandArg}/${commandArg}.route.ts`, routeText);
}