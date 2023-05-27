class VideoController {
    getVideo (req, res){
        return res.status(200).send({pathVideo:"Hello"})
}
}

module.exports = new VideoController();