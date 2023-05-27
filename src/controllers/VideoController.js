class VideoController {
    getVideo (req, res){
        return res.status(200).send({pathVideo:"OMG"})
}
}

module.exports = new VideoController();