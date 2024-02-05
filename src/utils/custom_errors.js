export class InvalidInputError extends Error {
    constructor(originalErrorMessage) {
        super('Invalid input');
        this.originalErrorMessage = originalErrorMessage;
        this.name = 'InvalidInputError';
    }
}

export class OperationFailedError extends Error {
    constructor(originalErrorMessage) {
        super('Operation failed');
        this.originalErrorMessage = originalErrorMessage;
        this.name = 'OperationFailed';
    }
}