"use strict";

const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const {asyncHandler} = require("../middleware/handlerError.middleware");
const {BadResponseError} = require("../core/error.response");

// services
const TokenServices = require("../services/token.service");
const AccessService = require("../services/access.service");

const {HEADER} = require("../utils/nameHeaders");

const createTokenPair = async (payload, privateKey, publicKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {expiresIn: 30});
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: "7 days",
        });
        return {accessToken, refreshToken};
    } catch (e) {
        return e;
    }
};

const createKeyPair = () => {
    const privateKey = crypto.randomBytes(64).toString();
    const publicKey = crypto.randomBytes(64).toString();

    return {privateKey, publicKey};
};

const authentication = asyncHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new BadResponseError("Not found user id");

    const authorizationHeader = req.headers[HEADER.AUTHORIZATION];
    const accessToken = authorizationHeader.replace("Bearer ", "");
    if (!accessToken) throw new BadResponseError("Not found access token");

    const keyStorage = await TokenServices.findOneByUserId(userId);
    if (!keyStorage) throw new BadResponseError("Not found key store");

    JWT.verify(accessToken, keyStorage.publicKey, (err, decoded) => {
        if (err) throw new BadResponseError(err.name);
        if (!decoded) throw new BadResponseError("Invalid Token");
        if (userId !== decoded.userId) throw new BadResponseError("Not Match Token");
        req.keyStorage = keyStorage;
        return next();
    });
});

const authRefreshToken = asyncHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    console.log("::KEY USER ID::", userId);
    if (!userId) throw new BadResponseError("Not found user id");

    const keyStorage = await TokenServices.findOneByUserId(userId);
    console.log("::KEY STORAGE::", keyStorage);
    if (!keyStorage) throw new BadResponseError("Not found key store");

    if (req.headers[HEADER.REFRESH_TOKEN]) {
        const refreshToken = req.headers[HEADER.REFRESH_TOKEN];

        JWT.verify(refreshToken, keyStorage.privateKey, (err, decoded) => {
            if (err) throw new BadResponseError(err.name);
            if (!decoded) throw new BadResponseError("Invalid Token");
            if (userId !== decoded.userId) throw new BadResponseError("Not Match Token");
            req.keyStorage = keyStorage;
            req.user = decoded;
            req.refreshToken = refreshToken;
            return next();
        });
    }
});

module.exports = {
    createKeyPair,
    createTokenPair,
    authentication,
    authRefreshToken,
};
