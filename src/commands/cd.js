import path from 'path';
import * as fs from 'node:fs/promises';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";

class CdCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class CdCommand extends AbstractCommand {
    constructor() {
        super('cd');
    }

    async executeCommand(context, args) {
        console.log('cd implementation');

        let result = context;

        if (args.length !== 1) {
            console.log('Invalid input');
            return result;
        }

        const absoultePathToFile = path.isAbsolute(args[0]) ? args[0] : path.resolve(context, args[0]);

        try {
            const stats = await fs.stat(absoultePathToFile);
            result = stats.isDirectory() ? absoultePathToFile : context;
        } catch {
            console.log('Invalid input');
        }
        
        return result;
    }
}