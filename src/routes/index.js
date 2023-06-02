"use strict";

const express = require("express")
const router = express.Router()

// Bootstraps
router.use("/v1/api", require("./bootstrap/bootstrap.router") );


// Authentication
router.use("/v1/api", require("./access/signUp.router"))
router.use("/v1/api", require("./access/login.router"))
router.use("/v1/api", require("./access/logout.router"))

// User
router.use("/v1/api", require("./user/profile.router"))

// Video
router.use("/v1/api", require("./video/video.router") );

module.exports = router