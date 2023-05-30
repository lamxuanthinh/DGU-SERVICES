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
    constructor({message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, dataMeta = {} }) {
            this.message = !message ? reasonStatusCode : message
            this.status = statusCode
            this.dataMeta = dataMeta
    }
    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends  SuccessResponse {
    constructor({message, dataMeta}) {
        super({message, dataMeta});
    }
}

class CREATE extends  SuccessResponse {
    constructor({message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, dataMeta }) {
        super({message, statusCode, reasonStatusCode, dataMeta});
    }
}

module.exports = {
   OK,
   CREATE
}