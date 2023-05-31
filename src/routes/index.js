"use strict";

const express = require("express")
const router = express.Router()


router.use("/v1/api", require("./bootstrap/bootstrap.router") );
router.use("/v1/api/video", require("./video/video.router") );

router.use("/v1/api", require("./bootstrap/bootstrap.router") )
router.use("/v1/api", require("./access/signUp.router"))
router.use("/v1/api", require("./access/login.router"))

module.exports = router