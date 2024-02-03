import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';

import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";

class DecompressCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class DecompressCommand extends AbstractCommand {
    constructor() {
        super('decompress');
    }

    async executeCommand(context, args) {
        console.log('decompress implementation');

        if (args.length !== 2) {
            console.log('Invalid input');
        }

        try {
            const absoultePathToSrc = path.isAbsolute(args[0]) ? args[0] : path.resolve(context, args[0]);
            const absoultePathToDest = path.isAbsolute(args[1]) ? args[1] : path.resolve(context, args[1]);

            await new Promise((resolve, reject) => createReadStream(absoultePathToSrc)
            .on('error', reject)
            .on('end', resolve)
            .pipe(zlib.createBrotliDecompress())
            .on('error', reject)
            .on('end', resolve)
            .pipe(createWriteStream(absoultePathToDest)));
        }
        catch (err) {
            console.log('Operation failed');
        }

    }
}