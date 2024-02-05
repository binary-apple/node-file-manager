import path from 'path';
import { createReadStream, createWriteStream, rm } from 'fs';
import { pipeline } from 'stream/promises';
import { AbstractCommand } from "./_abstract_command.js";
import { InvalidInputError, OperationFailedError } from '../utils/custom_errors.js';

export class MvCommand extends AbstractCommand {
    constructor() {
        super('mv');
    }

    async executeCommand(context, args) {
        if (args.length !== 2) {
            throw new InvalidInputError();
        }

        try {
            const absoultePathToFile = this.getAbsolutePath(context, args[0]);
            const newAbsolutePathToFile = path.resolve(this.getAbsolutePath(context, args[1]), path.basename(absoultePathToFile));

            const inputStream = createReadStream(absoultePathToFile).on('end', ()=>{}).on('error', ()=>{});
            const outputStream = createWriteStream(newAbsolutePathToFile);

            await pipeline(inputStream, outputStream);

            rm(absoultePathToFile, (err) => {throw err;});
        }
        catch (err) {
            throw new OperationFailedError(err.message);
        }
    }
}