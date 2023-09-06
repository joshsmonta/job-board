import { CustomError, CustomErrorResponse } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode: number = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): CustomErrorResponse[] {
        return [{ message: this.message }]
    }
}