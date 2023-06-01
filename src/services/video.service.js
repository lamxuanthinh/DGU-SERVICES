"use strict";
const { Video, Hashtag, Author } = require("../models/video");
class VideoService {
    getCloud() {}
    uploadVideo() {}
    addVideo() {}

    async getPathVideoAPI(videoId) {
        const formData = new FormData();
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Apisecret ${process.env.VDOCYPHER_API_KEY}`,
            },
            body: formData,
        };

        formData.append("ttl", 300);

        return await fetch(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            options
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const strURL = "https://player.vdocipher.com/v2/";
                const pathVideo = new URL(strURL);
                pathVideo.searchParams.set("otp", data.otp);
                pathVideo.searchParams.set("playbackInfo", data.playbackInfo);
                return pathVideo.href;
            });
    }

    async getAllVideoApi() {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Apisecret ${process.env.VDOCYPHER_API_KEY}`,
            },
        };
        const strURL = "https://www.vdocipher.com/api/videos";
        return await fetch(strURL, options)
            .then((res) => res.json())
            .then((data) => data.rows);
    }

    async getVideos() {
        const APIvideos = await VideoService.prototype.getAllVideoApi();
        return await Promise.all(
            APIvideos.map(async (APIvideo) => {
                const video = new Video();

                video.author = new Author(
                    "https://papik.pro/en/uploads/posts/2022-06/1655848161_1-papik-pro-p-cool-avatar-pictures-for-guys-1.png"
                );

                video.video_id = APIvideo.id;
                video.title = APIvideo.title;
                video.caption = APIvideo.description;
                video.sharers = new Array(Math.random);
                video.hashtags = APIvideo.tags.map((tag) => {
                    return new Hashtag(tag);
                });
                video.likers = new Array(Math.random);
                video.pathVideo = await VideoService.prototype.getPathVideoAPI(
                    video.video_id
                );
                return video;
            })
        );
    }
}

module.exports = new VideoService();
