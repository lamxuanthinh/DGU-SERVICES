"use strict"

const JWT = require("jsonwebtoken")
const crypto = require("node:crypto");


const createKeyPairMaster = async () => {
    try {
        const { publicKey, privateKey} = await crypto.generateKeyPairSync(
            "rsa",
            {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: "pkcs1",
                    format: "pem"
                },
                privateKeyEncoding: {
                    type: "pkcs1",
                    format: "pem"
                }
            }
        )
        return  {publicKey, privateKey}
    }catch (e) {
        return e
    }
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

module.exports = {
    createKeyPair,
    createTokenPair,
}