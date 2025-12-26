import { BaseExceptionClass } from "./BaseExceptionClass.js";

export class BadRequestExcpetion extends BaseExceptionClass {
    readonly statusCode = 400;
}