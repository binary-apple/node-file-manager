import path from 'path';
import { AbstractCommand } from "./_abstract_command.js";
import { InvalidInputError } from '../utils/custom_errors.js';

export class UpCommand extends AbstractCommand {
    constructor() {
        super('up');
    }

    async executeCommand(context, args) {
        if (args.length > 0) {
            throw new InvalidInputError();
        }

        const result = path.resolve(context, '..');

        return result;
    }
}