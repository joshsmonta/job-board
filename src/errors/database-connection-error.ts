import { CustomError, CustomErrorResponse } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode: number = 500;
    reason: string = 'Error conneciton to database';
    constructor() {
        super('Error connecting to database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(): CustomErrorResponse[] {
        return [{ message: this.reason }]
    }
}