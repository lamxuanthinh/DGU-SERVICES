function Video() {
    this.author = null;

    this.video_id = null;
    this.title = null;
    this.caption = null;
    this.course_id = null;

    this.sharers = [];
    this.hashtags = [];
    this.comments = [];
    this.likers = [];
    this.video_id_children = [];
    this.parent_id = null;
}

function Hashtag(name) {
    this.name = name;
}
function Author(pathAvatar) {
    this.pathAvatar = pathAvatar;
}

module.exports = { Video, Hashtag, Author };
