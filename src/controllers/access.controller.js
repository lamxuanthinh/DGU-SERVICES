"use strict"

const AccessService = require("../services/access.service")
const { CREATE, OK} = require("../core/success.response")

class AccessController {

    logout = async (req, res, next) => {
        console.log("[P]::Logout::", req.keyStorage)
        new OK({
            message: "Logout Success !!!",
            metaData: await AccessService.logout(req.keyStorage)
        }).send(res)
    }


    signUp  = async (req, res, next) => {
            console.log("[P]::SignUp::", req.body)
            new CREATE({
                message: "SignIn Success !!!",
                metaData: await AccessService.signUp(req.body)
            }).send(res)
    }

    login = async (req, res, next) => {
        console.log("[P]::Login::", req.body)
        new OK({
            message: "Login Success !!!",
            metaData: await AccessService.login(req.body)
        }).send(res)
    }

}

module.exports = new AccessController()