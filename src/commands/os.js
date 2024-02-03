import os from 'os';
import { AbstractCommand, AbstractCommandResult } from "./_abstract_command.js";

class OsCommandResult extends AbstractCommandResult {
    print() {
        return;
    }
}

export class OsCommand extends AbstractCommand {
    constructor() {
        super('os');
        this.commandOptions = new Map();
        this.commandOptions.set('EOL', () => {
            console.log(os.EOL);
        });
        this.commandOptions.set('cpus', () => {
            console.log(os.cpus().map((cpu) => {
                return {
                    model: cpu.model,
                    speed: `${cpu.speed/1000} GHz`
                }
            }));
        });
        this.commandOptions.set('homedir', () => {
            console.log(os.homedir());
        });
        this.commandOptions.set('username', () => {
            console.log(os.userInfo().username);
        });
        this.commandOptions.set('architecture', () => {
            console.log(os.arch());
        });
    }

    async executeCommand(_context, args) {
        console.log('os implementation');

        if (args.length !== 1 || !args[0].startsWith('--')) {
            console.log('Invalid input');
            return;
        }

        const option = args[0].slice(2);
        if (this.commandOptions.has(option)) {
            this.commandOptions.get(option)();
            return;
        }
        console.log('Invalid input');
    }
}