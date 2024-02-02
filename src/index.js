const USERNAME_ARG_PREFIX = '--username=';

const startFileManager = () => {
    const args = process.argv.slice(2);
    const enteredUsername = args.find((el) => el.startsWith(USERNAME_ARG_PREFIX))?.slice(USERNAME_ARG_PREFIX.length);

    console.log(`Welcome to the File Manager, ${enteredUsername || 'Anonymous'}!`);
}

startFileManager();