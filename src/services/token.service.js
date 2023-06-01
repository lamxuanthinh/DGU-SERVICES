"use strict"

const TokenModel = require("../models/token.model")

class Token {
     tokenStorage = async({userId, privateKey, publicKey, refreshToken}) => {
        try {
            const filter = {userId: userId}
            const update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken}
            const option = {upsert: true, new: true}
            const tokens = await  TokenModel.findOneAndUpdate(filter, update, option)
            return tokens ? tokens.publicKey : null
        }catch (e) {
            return e
        }
    }

     findOneByUserId = async (userId) => {
         const holderToken = await TokenModel.findOne({userId}).select(["publicKey"]).lean();
         return holderToken
    }

     removeTokenByUserId = async (_id) => {
         const removeToken = await TokenModel.deleteOne({ _id })
         return removeToken
    }
}

module.exports = new Token()
