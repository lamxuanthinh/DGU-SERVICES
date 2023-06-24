const express = require("express");
const router = express.Router();
const videoController = require("../../controllers/videoController");
const { asyncHandler } = require("../../middleware/handlerError.middleware");
router.get("/video/:videoId", asyncHandler(videoController.getVideo));
router.get("/video", asyncHandler(videoController.getAllVideoShort));


module.exports = router;
