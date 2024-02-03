import path from 'path';
import { rm } from 'fs';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";

class RmCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class RmCommand extends AbstractCommand {
    constructor() {
        super('rm');
    }

    async executeCommand(context, args) {
        console.log('rm implementation');

        if (args.length !== 1) {
            console.log('Invalid input');
        }

        try {
            const absoultePathToFile = path.isAbsolute(args[0]) ? args[0] : path.resolve(context, args[0]);

            rm(absoultePathToFile, () => {});
        }
        catch {
            console.log('Operation failed');
        }
    }
}