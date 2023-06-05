const { OK } = require("../core/success.response");
const videoService = require("../services/video.service");
const VideoService = require("../services/video.service");

class VideoController {
    async getVideos(req, res) {
        new OK({
            message: "Get videos Success !!!",
            metaData: await VideoService.getVideos(),
        }).send(res);
    }
    
    async uploadVideo(req, res)
    {
        new OK({
            message: "Upload Video Success !!!",
            metaData: await videoService.uploadVideo(req.body)
        }).send(res);
    }
}
module.exports = new VideoController();
