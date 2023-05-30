"use strict"

const AccessService = require("../services/access.service")
const { CREATE } = require("../core/success.response")

class AccessController {
    signUp  = async (req, res, next) => {
            console.log("[P]::SignUp::", req.body)
            new CREATE({
                message: "SignIn Success !!!",
                dataMeta: await AccessService.signUp(req.body)
            }).send(res)
    }
}

module.exports = new AccessController()