import path from 'path';
import * as fs from 'node:fs/promises';
import { readdir } from 'fs/promises';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";

class LsCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class LsCommand extends AbstractCommand {
    constructor() {
        super('ls');
    }

    async executeCommand(context, args) {
        console.log('ls implementation');

        if (args.length > 0) {
            console.log('Invalid input');
            return;
        }

        try {
            const files = (await readdir(context, {withFileTypes: true})).map((file) => {
                return {
                    Name: file.name,
                    Type: file.isDirectory() ? 'Directory' : 'File'
                }
            }).sort((a,b) => {
                const compareStrings = (str1, str2) => {
                    return str1 > str2 ? 1 : str1 < str2 ? -1 : 0
                }
                return a.Type !== b.Type ? compareStrings(a.Type, b.Type) : compareStrings(a.Name, b.Name);
            });

            console.table(files);
            
        } catch (err) {
            console.log('Operation failed');
        }

        return;
    }
}