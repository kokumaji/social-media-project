import { error } from "winston";

export class GenericError implements Error {
    name: string;
    message: string;
    status: number;

    constructor(errorName?: string, errorMessage?: string, errorCode?: number);

    constructor(errorName: string, errorMessage: string, errorCode: number) {
        this.name = !errorName ? "GenericError" : errorName;
        this.message = !errorMessage ? "An Error Occured!" : errorMessage;
        this.status = !errorCode ? 400 : errorCode;
    }

}

export class BadRequest extends GenericError {

    constructor(msg: string) {
        super("BadRequest", `Bad Request! ${msg}`, 400);
    }

}

export class RequestDenied extends GenericError {

    constructor(errorMessage?: string) {
        super("RequestDenied", `Request Denied! ${errorMessage}`, 403);
    }

}

export class UnauthorizedError extends GenericError {

    constructor(errorMessage?: string) {
        super("Unauthorized", `Authorization Failed! ${errorMessage}`, 401);
    }

}
