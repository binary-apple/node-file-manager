import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";

class CpCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class CpCommand extends AbstractCommand {
    constructor() {
        super('cp');
    }

    async executeCommand(context, args) {
        console.log('cp implementation');

        if (args.length !== 2) {
            console.log('Invalid input');
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
        catch {
            console.log('Operation failed');
        }
    }
}