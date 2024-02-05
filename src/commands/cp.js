import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { AbstractCommand } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

export class CpCommand extends AbstractCommand {
    constructor() {
        super('cp');
    }

    async executeCommand(context, args) {
        console.log('cp implementation');

        if (args.length !== 2) {
            throw new InvalidInputError();
        }

        try {
            const absoultePathToFile = path.isAbsolute(args[0]) ? args[0] : path.resolve(context, args[0]);
            const newAbsolutePathToFile = path.resolve(path.isAbsolute(args[1]) ? args[1] : path.resolve(context, args[1]), path.basename(absoultePathToFile));

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