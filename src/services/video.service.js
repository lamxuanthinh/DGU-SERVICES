"use strict";
const { Video, Hashtag, Author } = require("../models/video");
require("dotenv").config();
const fetch = require("node-fetch");
const FormData = require('form-data');
const Token = require("../configs/config.video");
const request =  require("request")

class VideoService {
    async getDataCloud(titleVideo) {
        const options = {
            method:"PUT",
            headers:
            {
                Authorization: `Apisecret ${Token.vdocypher_api_key}`,
            }
        } ;
        const API_URL = new URL("https://www.vdocipher.com/api/videos")
        API_URL.searchParams.set("title",titleVideo)
        return await fetch(API_URL.href, options).then(res => res.json())
    }

    async uploadVideoCloud(dataCloud, fileVideo) {
        console.log(fileVideo);
        const stream = require("stream");
        const bufferStream = stream.PassThrough()
        fileVideo.originalname = Buffer.from(
            fileVideo.originalname,
            "latin1"
          ).toString("utf8");
        bufferStream.end(fileVideo.buffer)
        const formData = FormData();
        formData.append("policy",dataCloud['policy']);
        formData.append("key",dataCloud['key']);
        formData.append("x-amz-signature",dataCloud['x-amz-signature']);
        formData.append("x-amz-algorithm",dataCloud['x-amz-algorithm']);
        formData.append("x-amz-date",dataCloud['x-amz-date']);
        formData.append("x-amz-credential",dataCloud['x-amz-credential']);
        formData.append("success_action_status","201");
        formData.append("success_action_redirect","");
        formData.append("file", {
            value: bufferStream,
            options: { filename: fileVideo.originalname, contentType: null }
        });
        const formHeader = formData.getHeaders();

        const options = {
            method:"POST",
            headers:{
                ...formHeader
            },
            body: formData, 
        } ;
        const API_URL = new URL(dataCloud.uploadLink)
        return await fetch(API_URL.href, options).then(res=>{
            console.log(res.body);
            return res.body;
        })
    }

    async uploadVideo(reqBody) {
        return await Promise.all(
            reqBody.list_video.map(async (video) =>{
                 return video;
              })
        )
    }

    addVideo() {

    }

    async getPathVideoAPI(videoId) {
        const formData = new FormData();
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Apisecret ${Token.vdocypher_api_key}`,
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
                Authorization: `Apisecret ${Token.vdocypher_api_key}`,
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
