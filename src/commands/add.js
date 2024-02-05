import path from 'path';
import { writeFile } from 'fs/promises';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

class AddCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class AddCommand extends AbstractCommand {
    constructor() {
        super('add');
    }

    async executeCommand(context, args) {
        console.log('add implementation');

        if (args.length !== 1) {
            throw new InvalidInputError();
        }

        try {
            const absoultePathToFile = path.resolve(context, args[0]);
            await writeFile(absoultePathToFile, '', {flag: 'wx'});
        }
        catch (err) {
            throw new OperationFailedError(err.message);
        }
    }
}