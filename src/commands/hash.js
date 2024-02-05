import path from 'path';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { AbstractCommand } from "./_abstract_command.js";
import { pipeline } from 'node:stream/promises';
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

export class HashCommand extends AbstractCommand {
    constructor() {
        super('hash');
    }

    async executeCommand(context, args) {
        console.log('hash implementation');

        if (args.length !== 1) {
            throw new InvalidInputError();
        }
        
        try {
            const absoultePathToFile = this.getAbsolutePath(context, args[0]);

            await new Promise((resolve, reject) => createReadStream(absoultePathToFile)
                .on('error', reject)
                .on('end', resolve)
                .pipe(createHash('sha256'))
                .setEncoding('hex')
                .pipe(process.stdout));
            console.log();
        }
        catch (err) {
            throw new OperationFailedError(err.message);
        }
    }
}