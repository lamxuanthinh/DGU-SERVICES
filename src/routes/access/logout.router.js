"use strict"

const express = require("express")
const {authentication} = require("../../auth/authUtil");
const {asyncHandler} = require("../../middleware/handlerError.middleware");
const AccessController = require("../../controllers/access.controller")
const router = express.Router()

router.post("/logout", authentication , asyncHandler(AccessController.logout))

module.exports = router