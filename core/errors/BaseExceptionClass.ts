export abstract class BaseExceptionClass extends Error {
    constructor(message: string, data?: any) {
        super(message)
        this.data = data;
    }
    data?: any
}