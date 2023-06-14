const { OK } = require("../core/success.response");
const VideoService = require("../services/video.service");

class VideoController {
    async getVideos(req, res) {
        new OK({
            message: "Get videos Success !!!",
            metaData: await VideoService.getVideos(),
        }).send(res);
    }

    async getVideo(req, res) {
        new OK(
            {
                message:"Get Video Success !!!",
                metaData: await VideoService.getVideo(req.params.videoId)
            }
        ).send(res)
    }
}
module.exports = new VideoController();
