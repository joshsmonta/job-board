export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): CustomErrorResponse[]
}

export interface CustomErrorResponse {
    message: string;
    field?: string | undefined;
}