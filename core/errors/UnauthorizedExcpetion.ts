import { BaseExceptionClass } from "./BaseExceptionClass.js";

export class UnauthorizedExcpetion extends BaseExceptionClass {
    readonly statusCode = 401;
}