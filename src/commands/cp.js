import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { AbstractCommand } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

export class CpCommand extends AbstractCommand {
    constructor() {
        super('cp');
    }

    async executeCommand(context, args) {
        if (args.length !== 2) {
            throw new InvalidInputError();
        }

        try {
            const absoultePathToFile = this.getAbsolutePath(context, args[0]);
            const newAbsolutePathToFile = path.resolve(this.getAbsolutePath(context, args[1]), path.basename(absoultePathToFile));

            await new Promise((resolve, reject) => createReadStream(absoultePathToFile)
                .on('error', reject)
                .on('end', resolve)
                .pipe(createWriteStream(newAbsolutePathToFile))
                .on('error', reject)
                .on('end', resolve));
        }
        catch (err) {
            throw new OperationFailedError(err.message);
        }
    }
}