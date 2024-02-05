import * as fs from 'node:fs/promises';
import { AbstractCommand } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

export class CdCommand extends AbstractCommand {
    constructor() {
        super('cd');
    }

    async executeCommand(context, args) {
        let result = context;

        if (args.length !== 1) {
            throw new InvalidInputError();
        }

        const absoultePathToFile = this.getAbsolutePath(context, args[0]);

        try {
            const stats = await fs.stat(absoultePathToFile);
            result = stats.isDirectory() ? absoultePathToFile : context;
        } catch (err) {
            throw new OperationFailedError(err.message);
        }
        
        return result;
    }
}