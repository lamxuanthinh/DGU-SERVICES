"use strict";
const { Video, Hashtag, Author } = require("../models/video");
const { vdocypher } = require("../configs/config.vdocypher");
const fetch = require("node-fetch");
const FormData = require("form-data");

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
                Authorization: `Apisecret ${vdocypher.apiKey}`,
            },
            body: formData,
        };

        formData.append("ttl", 31622400);

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

    async getAllVideoApi(folderId) {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Apisecret ${vdocypher.apiKey}`,
            },
        };
        const URL_VDOCYPHER = new URL("https://www.vdocipher.com/api/videos");

        if (folderId) {
            URL_VDOCYPHER.searchParams.set("folderId", folderId);
        }

        return await fetch(URL_VDOCYPHER.href, options)
            .then((res) => res.json())
            .then((data) => data.rows);
    }

    async getVideoApi(videoId) {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Apisecret ${vdocypher.apiKey}`,
            },
        };
        const API_URL = new URL(
            `https://www.vdocipher.com/api/videos/${videoId}`
        );
        return await fetch(API_URL.href, options).then((res) => res.json());
    }

    async getSubFolderWithFolderId(folderId) {
        const URL_VDOCYPHER = new URL(
            `https://www.vdocipher.com/api/videos/folders/${folderId}`
        );

        const options = {
            method: "GET",
            headers: {
                Authorization: `Apisecret ${vdocypher.apiKey}`,
            },
        };
        const { folderList } = await fetch(URL_VDOCYPHER.href, options).then(
            (res) => res.json()
        );

        return folderList.map((folder) => ({
            folderId: folder.id,
            parentVideoId: folder.name,
        }));
    }

    async getAllParentVideo() {
        const URL_VDOCYPHER = new URL(
            `https://www.vdocipher.com/api/videos/folders/${process.env.VDOCYPHER_FOLDER_ID}`
        );

        const options = {
            method: "GET",
            headers: {
                Authorization: `Apisecret ${vdocypher.apiKey}`,
            },
        };
        const { folderList } = await fetch(URL_VDOCYPHER.href, options).then(
            (res) => res.json()
        );

        return folderList.map((folder) => ({
            folderId: folder.id,
            parentVideoId: folder.name,
        }));
    }

    async getAllSubVideo(parentVideoId) {
        const parentVideos = await VideoService.prototype.getAllParentVideo();
        const parentVideoFound = parentVideos.find(
            (parentVideo) => parentVideo.parentVideoId === parentVideoId
        );
        if (parentVideoFound) {
            return await VideoService.prototype.getVideoWithFolderId(
                parentVideoFound.folderId
            );
        } else {
            return [];
        }
    }

    async getVideoWithFolderId(folderId) {
        const URL_VDOCYPHER = new URL(`https://www.vdocipher.com/api/videos`);

        URL_VDOCYPHER.searchParams.set("folderId", folderId);

        const options = {
            method: "GET",
            headers: {
                Authorization: `Apisecret ${vdocypher.apiKey}`,
            },
        };

        return await fetch(URL_VDOCYPHER.href, options).then((res) =>
            res.json()
        );
    }

    async getAllVideoShort() {
        const folders = await VideoService.prototype.getSubFolderWithFolderId(
            vdocypher.folderId
        );

        const data = await Promise.all(
            folders.map(async (folder) => {
                let { rows } =
                    await VideoService.prototype.getVideoWithFolderId(
                        folder.folderId
                    );
                const videos = await Promise.all(
                    rows.map(async (video) => {
                        const dataVideo =
                            await VideoService.prototype.convertResponseVideo(
                                video
                            );
                        dataVideo.parent_id = folder.parentVideoId;
                        return dataVideo;
                    })
                );
                return videos;
            })
        );
        const [videos] = data;

        return await videos;
    }

    async getVideo(videoId) {
        const shortVideos = await VideoService.prototype.getAllVideoShort();
        const videoFound = shortVideos.find(
            (video) => video.video_id === videoId
        );
        if (videoFound) {
            return videoFound;
        } else if (APIvideo.id) {
            APIvideo = await VideoService.prototype.getVideoApi(videoId);
            const video = await VideoService.prototype.convertResponseVideo(
                APIvideo
            );
            const { rows } = await VideoService.prototype.getAllSubVideo(
                video.video_id
            );
            if (rows) {
                video.video_id_children = await Promise.all(
                    rows.map(async (itemVideo) => {
                        const dataVideo =
                            await VideoService.prototype.convertResponseVideo(
                                itemVideo
                            );
                        dataVideo.parent_id = video.video_id;
                        return dataVideo;
                    })
                );
            }

            return video;
        } else {
            return null;
        }
    }

    async convertResponseVideo(APIvideo) {
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
            APIvideo.id
        );
        video.duration = APIvideo.length;

        return video;
    }
}

module.exports = new VideoService();
