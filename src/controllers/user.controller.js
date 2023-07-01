"use strict";

const UserService = require("../services/user.service");
const { OK } = require("../core/success.response");

class UserController {
    profile = async (req, res, next) => {
        console.log("[P]::Profile::", req.keyStorage);
        new OK({
            message: "Get Profile Success !!!",
            metaData: await UserService.profile(req.keyStorage),
        }).send(res);
    };
}

module.exports = new UserController();
