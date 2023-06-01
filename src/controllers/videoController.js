const { OK } = require("../core/success.response");
const VideoService = require("../services/video.service");
require("dotenv").config();

class VideoController {
    async getVideos(req, res) {
        new OK({
            message: "Get videos Success !!!",
            metaData: await VideoService.getVideos(),
        }).send(res);
    }
}
module.exports = new VideoController();
