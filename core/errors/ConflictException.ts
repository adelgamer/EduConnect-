import { BaseExceptionClass } from "./BaseExceptionClass.js";

export class ConflictException extends BaseExceptionClass {
    readonly statusCode = 409;
}