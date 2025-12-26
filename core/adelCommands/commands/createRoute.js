import fs, { link } from 'fs';

export function registerRoute(commandArg) {
    const mainRouterLinesArray = fs.readFileSync('./src/mainRouter.ts', 'utf8').split('\n');

    const pattern = /export.*default.*mainRouter/;

    for (const [index, line] of mainRouterLinesArray.entries()) {
        if (pattern.test(line)) {
            // Go back two linesand add

            const importNewRoute = `import ${commandArg}Router from './modules/${commandArg}/${commandArg}.route.js';`;
            const newRoute = `mainRouter.use('/${commandArg}', ${commandArg}Router);`;
            mainRouterLinesArray.splice(0, 0, importNewRoute);
            mainRouterLinesArray.splice(index, 0, newRoute);
            break;
        }
    }
    fs.writeFileSync('./src/mainRouter.ts', mainRouterLinesArray.join('\n'));
}