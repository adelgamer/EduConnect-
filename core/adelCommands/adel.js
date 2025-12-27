import fs, { link } from 'fs';
import { registerRoute } from './commands/createRoute.js';
import { createPrismaModel } from './commands/createPrimsaModel.js';
import { createModuleFolder } from './commands/createModule.js';
import { createController, createService, createRouter, createValidation } from './commands/createControllerService.js';

const commands = ["create:module"];

// 1- Validating command
const userCommand = process.argv[2];
const commandArg = process.argv[3];
const commandFlags = process.argv[4];

if (userCommand && !commands.includes(userCommand)) {
    console.error('Command does not exists');
    process.exit(1);
}

if (!commandArg) {
    console.error(`No argument is provided`);
    process.exit(1);
}


switch (userCommand) {

    case undefined:
        console.log("\x1b[32mWelcome to Adel's command prompt\n\n\x1b[0m");
        break;

    case "create:module":
        console.log(`\x1b[32mCreating a module ${commandArg}\n\n\x1b[0m`);
        // 1- Adding a new route to mainRouter.ts
        registerRoute(commandArg);

        // 2- Adding a new prisma modal
        createPrismaModel(commandArg);

        // 3- Create a module folder
        createModuleFolder(commandArg);

        // 4- Create a controller
        createController(commandArg);

        // 5- Create a service
        createService(commandArg);

        // 6- Create router
        createRouter(commandArg);

        // 7- Create validation
        createValidation(commandArg);

        break;

    default:
        break;
}

// if (process.argv[2] === 'controller' && process.argv[3]) {
//     fs.writeFileSync(`./src/controllers/${process.argv[3]}.controller.ts`, '')
// }