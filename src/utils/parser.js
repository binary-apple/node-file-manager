export const commandParser = (commandString) => {
    const regexp = /[a-z0-9_.-]+/gi;
    const regexp2 = /[^\sa-z0-9_.-]+/gi;
    if (regexp2.test(commandString)) {
        throw new Error('Invalid input');
    }
    const commandStringParts = [...commandString.matchAll(regexp)].map((el) => el[0]);
    return {
        command: commandStringParts[0],
        args: commandStringParts.slice(1)
    };
}