import path from 'path';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";
import { pipeline } from 'node:stream/promises';

class HashCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class HashCommand extends AbstractCommand {
    constructor() {
        super('hash');
    }

    async executeCommand(context, args) {
        console.log('hash implementation');

        if (args.length !== 1) {
            console.log('Invalid input');
            return;
        }
        
        try {
            const absoultePathToFile = path.isAbsolute(args[0]) ? args[0] : path.resolve(context, args[0]);

            await new Promise((resolve, reject) => createReadStream(absoultePathToFile)
                .on('error', reject)
                .on('end', resolve)
                .pipe(createHash('sha256'))
                .setEncoding('hex')
                .pipe(process.stdout));
            console.log();
        }
        catch (err) {
            console.log('Operation failed');
        }
    }
}