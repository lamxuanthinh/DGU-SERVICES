"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtil");
const { asyncHandler } = require("../../middleware/handlerError.middleware");
const UserController = require("../../controllers/user.controller");
const router = express.Router();

router.get("/profile", authentication, asyncHandler(UserController.profile));

module.exports = router;
