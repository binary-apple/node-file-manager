import path from 'path';
import { createReadStream, createWriteStream, rm } from 'fs';
import { pipeline } from 'stream/promises';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";

class MvCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class MvCommand extends AbstractCommand {
    constructor() {
        super('mv');
    }

    async executeCommand(context, args) {
        console.log('mv implementation');

        if (args.length !== 2) {
            console.log('Invalid input');
        }

        try {
            const absoultePathToFile = path.isAbsolute(args[0]) ? args[0] : path.resolve(context, args[0]);
            const newAbsolutePathToFile = path.resolve(path.isAbsolute(args[1]) ? args[1] : path.resolve(context, args[1]), path.basename(absoultePathToFile));

            const inputStream = createReadStream(absoultePathToFile).on('end', ()=>{console.log(`readable ends`)}).on('error', ()=>{});
            const outputStream = createWriteStream(newAbsolutePathToFile);

            console.log(`before pipeline`);
            await pipeline(inputStream, outputStream);
            console.log(`after pipeline`);

            rm(absoultePathToFile, (err) => {if (err) console.log(`rm error`)});
        }
        catch (err) {
            console.log('Operation failed');
        }
    }
}