"use strict"

const express = require("express")
const router = express.Router()
const AccessController = require("../../controllers/access.controller")
const {asyncHandler} = require("../../middleware/handlerError.middleware");

router.post("/signup", asyncHandler(AccessController.signUp))

module.exports = router