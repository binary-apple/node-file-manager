import path from 'path';

export class AbstractCommand {
    constructor(name) {
        this.name = name;
        if (new.target === AbstractCommand) {
            throw new Error('Abstract class cannot be instantiated');
        }
    }

    executeCommand(context, commandString, args) {
        throw new Error('Abstract method must be overridden');
    }

    getAbsolutePath(context, pathToFile) {
        return path.isAbsolute(pathToFile) ? pathToFile : path.resolve(context, pathToFile);
    }
}