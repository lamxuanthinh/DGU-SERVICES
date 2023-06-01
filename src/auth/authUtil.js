"use strict"

const JWT = require("jsonwebtoken")

const crypto = require("crypto");
const {asyncHandler} = require("../middleware/handlerError.middleware");
const {BadResponseError} = require("../core/error.response");
// services
const TokenServices = require("../services/token.service")



const HEADER = {
    API_KEY: "x-api-key",
    CLIENT_ID: "x-api-client",
    AUTHORIZATION: "authorization"
}

const createTokenPair = async (payload, privateKey, publicKey) => {
    try{
        const accessToken = await JWT.sign(payload, publicKey, { expiresIn: "2 days"})
        const refreshToken = await  JWT.sign(payload, privateKey , { expiresIn: "7 days"})
        return {accessToken, refreshToken}
    }catch (e) {
        return  e
    }
}

const createKeyPair =  () => {
    const privateKey = crypto.randomBytes(64).toString();
    const publicKey = crypto.randomBytes(64).toString();

    return {privateKey, publicKey}
}

const authentication = asyncHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new BadResponseError("Not found user id")

    const keyStorage = await TokenServices.findOneByUserId(userId)
    if(!keyStorage) throw  new BadResponseError("Not found key store")

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw  new BadResponseError("Not found access token")

    try{
        const deCodeUser = JWT.verify(accessToken, keyStorage.publicKey)
        if(userId !== deCodeUser.userId) throw  BadResponseError("Token Invalid")
        req.keyStorage = keyStorage
        return  next()
    }catch (e) {
        throw  e
    }
})

module.exports = {
    createKeyPair,
    createTokenPair,
    authentication
}