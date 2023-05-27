class VideoController {
    getVideo (req, res){
        return res.status(200).send({pathVideo:"Haaaaa"})
}
}

module.exports = new VideoController();