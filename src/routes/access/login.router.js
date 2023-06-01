"use strict"

const express = require("express")
const router = express.Router()
const AccessController = require("../../controllers/access.controller")
const {asyncHandler} = require("../../middleware/handlerError.middleware");

router.post("/login", asyncHandler(AccessController.login) )

module.exports = router