"use strict";

const AccessService = require("../services/access.service");
const { CREATE, OK } = require("../core/success.response");

class AccessController {
    signUp = async (req, res) => {
        console.log("[P]::SignUp::", req.body);
        new CREATE({
            message: "SignIn Success !!!",
            metaData: await AccessService.signUp(req.body),
        }).send(res);
    };
    login = async (req, res) => {
        console.log("[P]::Login::", req.body);
        new OK({
            message: "Login Success !!!",
            metaData: await AccessService.login(req.body),
        }).send(res);
    };
    refreshToken = async (req, res) => {
        new OK({
            message: "Refresh Token Success !!!",
            metaData: await AccessService.refreshToken({
                user: req.user,
                keyStorage: req.keyStorage,
                refreshToken: req.refreshToken,
            }),
        }).send(res);
    };
    logout = async (req, res) => {
        console.log("[P]::Logout::", req.keyStorage);
        new OK({
            message: "Logout Success !!!",
            metaData: await AccessService.logout(req.keyStorage),
        }).send(res);
    };
}

module.exports = new AccessController();
