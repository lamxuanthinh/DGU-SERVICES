const { OK } = require("../core/success.response");
const VideoService = require("../services/video.service");

class VideoController {
    async getAllVideoShort(req, res) {
        console.log(req.query);
        new OK({
            message: "Get videos Success !!!",
            metaData: await VideoService.getAllVideoShort(),
        }).send(res);
    }

    async getVideo(req, res) {
        var video = await VideoService.getVideo(req.params.videoId);

        new OK({
            message:
                video !== null
                    ? "Get video Success !!!"
                    : "Video Not Found !!!",
            metaData: video,
        }).send(res);
    }
}
module.exports = new VideoController();
