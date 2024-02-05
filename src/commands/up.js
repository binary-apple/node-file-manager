import path from 'path';
import * as fs from 'node:fs/promises';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";
import { InvalidInputError } from '../utils/custom_errors.js';

class UpCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class UpCommand extends AbstractCommand {
    constructor() {
        super('up');
    }

    async executeCommand(context, args) {
        console.log('up implementation');

        if (args.length > 0) {
            throw new InvalidInputError();
        }

        const result = path.resolve(context, '..');

        return result;
    }
}