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
}

export class AbstractCommandResult {
    constructor() {
        if (new.target === AbstractCommandResult) {
            throw new Error('Abstract class cannot be instantiated');
        }
    }

    // should return the result of operation as string
    print() {
        throw new Error('Abstract method must be overridden');
    }
}