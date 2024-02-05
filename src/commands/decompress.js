import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';

import { AbstractCommand } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

export class DecompressCommand extends AbstractCommand {
    constructor() {
        super('decompress');
    }

    async executeCommand(context, args) {
        if (args.length !== 2) {
            throw new InvalidInputError();
        }

        try {
            const absoultePathToSrc = this.getAbsolutePath(context, args[0]);
            const absoultePathToDest = this.getAbsolutePath(context, args[1]);

            await new Promise((resolve, reject) => createReadStream(absoultePathToSrc)
            .on('error', reject)
            .on('end', resolve)
            .pipe(zlib.createBrotliDecompress())
            .on('error', reject)
            .on('end', resolve)
            .pipe(createWriteStream(absoultePathToDest)));
        }
        catch (err) {
            throw new OperationFailedError(err.message);
        }

    }
}