import { BaseExceptionClass } from "./BaseExceptionClass.js";

export class NotFoundExcpetion extends BaseExceptionClass {
    readonly statusCode = 404;
}