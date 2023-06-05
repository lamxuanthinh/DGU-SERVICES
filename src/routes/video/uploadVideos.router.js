const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload =  multer();
const videoController = require("../../controllers/videoController");
const { asyncHandler } = require("../../middleware/handlerError.middleware");
router.post("/video/upload",upload.array('files'), asyncHandler(videoController.uploadVideo));

module.exports = router;
