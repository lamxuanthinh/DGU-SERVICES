"use strict"

const StatusCode = {
    OK: 200,
    CREATED: 201
}

const ReasonStatusCode = {
    OK: "Success",
    CREATED: "Created"
}


class SuccessResponse {
    constructor({message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, data = {} }) {
            this.message = !message ? reasonStatusCode : message
            this.status = statusCode
            this.data = data
    }
    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends  SuccessResponse {
    constructor({message, data}) {
        super({message, data});
    }
}

class CREATE extends  SuccessResponse {
    constructor({message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, data }) {
        super({message, statusCode, reasonStatusCode, data});
    }
}

module.exports = {
   OK,
   CREATE
}