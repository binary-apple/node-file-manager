import { InvalidInputError } from "./custom_errors.js";

export const commandParser = (commandString) => {
    const regexp = /[^\s"]+|"([^"]*)"/gi;
    const regexpFullInput = /^\s*([a-z]+(\s+([^\s"]+|"[^"]+"))*)\s*$/gi;
    if (!regexpFullInput.test(commandString)) {
        throw new InvalidInputError();
    }

    const commandStringParts = [...commandString.matchAll(regexp)].map((el) => el[1] || el[0]);
    return {
        commandName: commandStringParts[0],
        args: commandStringParts.slice(1)
    };
}