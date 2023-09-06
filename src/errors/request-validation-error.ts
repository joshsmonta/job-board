import { ValidationError } from "express-validator";
import { CustomError, CustomErrorResponse } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode: number = 400;
    constructor(public errors: ValidationError[]) {
        super('Invalid Request parameters');
        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(): CustomErrorResponse[] {
        return this.errors.map((err) => {
            if (err.type === 'field') {
                return { message: err.msg, field: err.path }
            }
            return { message: err.msg }
        });
    }
}

