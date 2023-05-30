"use strict"

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: "Bad request error",
    CONFLICT: "Conflict error"
}

class  ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status
    }
}

class ConflictResponseError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode);
    }
}

class BadResponseError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode);
    }
}



module.exports = {
    ConflictResponseError,
    BadResponseError
}

