import { BaseExceptionClass } from "./BaseExceptionClass.js";

export class InternalServerError extends BaseExceptionClass {
    readonly statusCode = 500;
}