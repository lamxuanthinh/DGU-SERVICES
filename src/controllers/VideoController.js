class VideoController {
    getVideo (req, res){
        return res.status(200).send({pathVideo:"HAHAHA"})
}
}

module.exports = new VideoController();