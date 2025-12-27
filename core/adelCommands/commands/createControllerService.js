import fs, { link } from 'fs';

function convertToCamelCase(text) {
    if (!text) return '';

    return text
        .split(/[-_\s]+/) // Split by hyphen, underscore, or space
        .map((word, index) => {
            // Force lowercase for the entire first word
            if (index === 0) {
                return word.toLowerCase();
            }
            // Capitalize first letter of subsequent words
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

function convertToPascalCase(text) {
    return text
        .replace(/\.[^/.]+$/, "") // Remove file extension (e.g., .jpg)
        .replace(/[^a-zA-Z0-9]/g, ' ') // Replace all non-alphanumeric with space
        .split(' ')
        .filter(Boolean) // Remove empty strings from double spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}

export function createController(commandArg) {
    const controllerText = fs.readFileSync('./core/adelCommands/commands/templates/controller.txt', 'utf8')
        .replace(/\${moduleNamePascal}/g, convertToPascalCase(commandArg))
        .replace(/\${moduleName}/g, commandArg);

    fs.writeFileSync(`./src/modules/${commandArg}/${commandArg}.controller.ts`, controllerText);
}

export function createService(commandArg) {
    const serviceText = fs.readFileSync('./core/adelCommands/commands/templates/service.txt', 'utf8')
        .replace(/\${moduleNamePascal}/g, convertToPascalCase(commandArg))
        .replace(/\${moduleName}/g, commandArg);

    fs.writeFileSync(`./src/modules/${commandArg}/${commandArg}.service.ts`, serviceText);
}

export function createRouter(commandArg) {
    const routeText = fs.readFileSync('./core/adelCommands/commands/templates/route.txt', 'utf8')
        .replace(/\${moduleNamePascal}/g, convertToPascalCase(commandArg))
        .replace(/\${moduleName}/g, commandArg);

    fs.writeFileSync(`./src/modules/${commandArg}/${commandArg}.route.ts`, routeText);
}