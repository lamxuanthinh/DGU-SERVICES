"use strict";

const express = require("express");
const router = express.Router();
const AccessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../middleware/handlerError.middleware");
const { authRefreshToken } = require("../../auth/authUtil");

router.get("/refreshtoken", authRefreshToken, asyncHandler(AccessController.refreshToken));

module.exports = router;
