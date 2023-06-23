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

    // async getVideoParent(req, res) {
    //     console.log(req.query);
    //     new OK({
    //         message: "Get videos Success !!!",
    //         metaData: await VideoService.getVideoParent(),
    //     }).send(res);
    // }

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
