import { commandParser } from './utils/parser.js';
import { InvalidInputError } from './utils/custom_errors.js';

export default class CommandsHandler {
    static _instance = null;
    static commandRegistry = new Map();

    static getCommandsHandler() {
        return this._instance = this._instance || this;
    };

    static registerCommand(commandName, commandInstance) {
        this.commandRegistry.set(commandName, commandInstance);
    }

    static async executeCommand(context, commandString) {
        const parsedCommandData = commandParser(commandString);
        if (!this.commandRegistry.has(parsedCommandData.commandName)) {
            throw new InvalidInputError();
        }
        return await this.commandRegistry.get(parsedCommandData.commandName).executeCommand(context, parsedCommandData.args) || context;
    }
}