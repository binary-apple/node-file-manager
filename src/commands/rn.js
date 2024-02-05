import path from 'path';
import { rename } from 'fs/promises';
import { AbstractCommand } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

export class RnCommand extends AbstractCommand {
    constructor() {
        super('rn');
    }

    async executeCommand(context, args) {
        if (args.length !== 2) {
            throw new InvalidInputError();
        }

        try {
            const absoultePathToFile = this.getAbsolutePath(context, args[0]);
            const newAbsolutePathToFile = path.resolve(absoultePathToFile, '..', args[1]);
            await rename(absoultePathToFile, newAbsolutePathToFile);
        }
        catch (err) {
            throw new OperationFailedError(err.message);
        }
    }
}