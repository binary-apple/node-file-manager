import path from 'path';
import { createReadStream } from 'fs';
import { AbstractCommand } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

export class CatCommand extends AbstractCommand {
    constructor() {
        super('cat');
    }

    async executeCommand(context, args) {
        console.log('cat implementation');

        if (args.length !== 1) {
            throw new InvalidInputError();
        }

        try {
            const absoultePathToFile = this.getAbsolutePath(context, args[0]);

            await new Promise((resolve, reject) => createReadStream(absoultePathToFile)
                .on('error', reject)
                .on('end', resolve)
                .pipe(process.stdout));
            console.log();
        }
        catch (err) {
            throw new OperationFailedError(err.message);
        }
    }
}