"use strict";

const express = require("express")

const VideoController = require("../src/controllers/VideoController")
const router = express.Router()

router.get("/get", VideoController
)
module.exports = router;