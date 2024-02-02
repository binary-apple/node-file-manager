import { homedir } from 'os';

const USERNAME_ARG_PREFIX = '--username=';

const startFileManager = () => {
    const args = process.argv.slice(2);
    const enteredUsername = args.find((el) => el.startsWith(USERNAME_ARG_PREFIX))?.slice(USERNAME_ARG_PREFIX.length) || 'Anonymous';

    const workingDirectory = homedir();

    console.log(`Welcome to the File Manager, ${enteredUsername}!`);

    console.log(`You are currently in ${workingDirectory}`);

    process.stdin.on('data', (data) => {
        const input = data.toString().trim();
        if (input === '.exit') {
            process.exit();
        }
        //TODO: input handling
        console.log(`You are currently in ${workingDirectory}`);

    });

    process.on('SIGINT', () => {
        process.exit();
    });
    process.on('exit', (code) => {
        console.log(`Thank you for using File Manager, ${enteredUsername}, goodbye!`);
    });
}

startFileManager();