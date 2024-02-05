import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';

import { AbstractCommand } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

export class CompressCommand extends AbstractCommand {
    constructor() {
        super('compress');
    }

    async executeCommand(context, args) {
        console.log('compress implementation');

        if (args.length !== 2) {
            throw new InvalidInputError();
        }

        try {
            const absoultePathToSrc = this.getAbsolutePath(context, args[0]);
            const absoultePathToDest = this.getAbsolutePath(context, args[1]);

            await new Promise((resolve, reject) => createReadStream(absoultePathToSrc)
            .on('error', reject)
            .on('end', resolve)
            .pipe(zlib.createBrotliCompress())
            .pipe(createWriteStream(absoultePathToDest)));

        }
        catch (err) {
            throw new OperationFailedError(err.message);
        }

    }
}