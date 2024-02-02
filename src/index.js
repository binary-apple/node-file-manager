const USERNAME_ARG_PREFIX = '--username=';

const startFileManager = () => {
    const args = process.argv.slice(2);
    const enteredUsername = args.find((el) => el.startsWith(USERNAME_ARG_PREFIX))?.slice(USERNAME_ARG_PREFIX.length) || 'Anonymous';

    console.log(`Welcome to the File Manager, ${enteredUsername}!`);

    process.stdin.on('data', (data) => {
        const input = data.toString().trim();
        if (input === '.exit') {
            process.exit();
        }
    });

    process.on('SIGINT', () => {
        process.exit();
    });
    process.on('exit', (code) => {
        console.log(`Thank you for using File Manager, ${enteredUsername}, goodbye!`);
    });
}

startFileManager();