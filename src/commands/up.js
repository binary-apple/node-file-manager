import path from 'path';
import * as fs from 'node:fs/promises';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";

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
            console.log('Invalid input');
            return result;
        }

        const result = path.resolve(context, '..');

        return result;
    }
}