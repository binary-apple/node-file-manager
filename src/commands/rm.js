import path from 'path';
import { rm } from 'fs';
import { AbstractCommand } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

export class RmCommand extends AbstractCommand {
    constructor() {
        super('rm');
    }

    async executeCommand(context, args) {
        console.log('rm implementation');

        if (args.length !== 1) {
            throw new InvalidInputError();
        }

        try {
            const absoultePathToFile = path.isAbsolute(args[0]) ? args[0] : path.resolve(context, args[0]);

            rm(absoultePathToFile, () => {});
        }
        catch (err) {
            throw new OperationFailedError(err.message);
        }
    }
}