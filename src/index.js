import { homedir } from 'os';
import CommandsHandler from './commands_handler.js';
import { CdCommand } from './commands/cd.js';
import { UpCommand } from './commands/up.js';
import { LsCommand } from './commands/ls.js';
import { OsCommand } from './commands/os.js';
import { HashCommand } from './commands/hash.js';
import { CompressCommand } from './commands/compress.js';
import { DecompressCommand } from './commands/decompress.js';
import { RmCommand } from './commands/rm.js';
import { CatCommand } from './commands/cat.js';
import { AddCommand } from './commands/add.js';
import { RnCommand } from './commands/rn.js';
import { CpCommand } from './commands/cp.js';
import { MvCommand } from './commands/mv.js';

const USERNAME_ARG_PREFIX = '--username=';

const startFileManager = async () => {
    const args = process.argv.slice(2);
    const enteredUsername = args.find((el) => el.startsWith(USERNAME_ARG_PREFIX))?.slice(USERNAME_ARG_PREFIX.length) || 'Anonymous';

    let workingDirectory = homedir();

    const commandsHandler = CommandsHandler.getCommandsHandler();
    //register implemented commands
    commandsHandler.registerCommand('cd', CdCommand);
    commandsHandler.registerCommand('up', UpCommand);
    commandsHandler.registerCommand('ls', LsCommand);
    commandsHandler.registerCommand('cat', CatCommand);
    commandsHandler.registerCommand('add', AddCommand);
    commandsHandler.registerCommand('rn', RnCommand);
    commandsHandler.registerCommand('cp', CpCommand);
    commandsHandler.registerCommand('mv', MvCommand);
    commandsHandler.registerCommand('rm', RmCommand);
    commandsHandler.registerCommand('os', OsCommand);
    commandsHandler.registerCommand('os', OsCommand);
    commandsHandler.registerCommand('hash', HashCommand);
    commandsHandler.registerCommand('compress', CompressCommand);
    commandsHandler.registerCommand('decompress', DecompressCommand);

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