import { homedir } from 'os';
import CommandsHandler from './commands_handler.js';
import { CdCommand } from './commands/cd.js';
import { UpCommand } from './commands/up.js';

const USERNAME_ARG_PREFIX = '--username=';

const startFileManager = async () => {
    const args = process.argv.slice(2);
    const enteredUsername = args.find((el) => el.startsWith(USERNAME_ARG_PREFIX))?.slice(USERNAME_ARG_PREFIX.length) || 'Anonymous';

    let workingDirectory = homedir();

    const commandsHandler = CommandsHandler.getCommandsHandler();
    //register implemented commands
    commandsHandler.registerCommand('cd', CdCommand);
    commandsHandler.registerCommand('up', UpCommand);

    console.log(`Welcome to the File Manager, ${enteredUsername}!`);

    console.log(`You are currently in ${workingDirectory}`);

    process.stdin.on('data', async (data) => {
        const input = data.toString().trim();
        if (input === '.exit') {
            process.exit();
        }

        workingDirectory = await commandsHandler.executeCommand(workingDirectory, input);

        console.log(`You are currently in ${workingDirectory}`);

    });

    process.on('SIGINT', () => {
        process.exit();
    });
    process.on('exit', (code) => {
        console.log(`Thank you for using File Manager, ${enteredUsername}, goodbye!`);
    });
}

await startFileManager();