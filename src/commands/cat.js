import path from 'path';
import { createReadStream } from 'fs';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

class CatCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

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
            const absoultePathToFile = path.isAbsolute(args[0]) ? args[0] : path.resolve(context, args[0]);

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