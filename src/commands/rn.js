import path from 'path';
import { rename } from 'fs/promises';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";

class RnCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class RnCommand extends AbstractCommand {
    constructor() {
        super('rn');
    }

    async executeCommand(context, args) {
        console.log('rn implementation');

        if (args.length !== 2) {
            console.log('Invalid input');
        }

        try {
            const absoultePathToFile = path.isAbsolute(args[0]) ? args[0] : path.resolve(context, args[0]);
            const newAbsolutePathToFile = path.resolve(absoultePathToFile, '..', args[1]);
            await rename(absoultePathToFile, newAbsolutePathToFile);
        }
        catch {
            console.log('Operation failed');
        }
    }
}