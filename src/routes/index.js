"use strict";

const express = require("express")
const {asyncHandler} = require("../middleware/handlerError.middleware");
const {BadResponseError} = require("../core/error.response");
const router = express.Router()

router.use("/v1/api", require("./bootstrap/bootstrap.router") )
router.use("/v1/api", require("./access/signUp.router"))

module.exports = router