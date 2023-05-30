"use strict"

const TokenModel = require("../models/token.model")

class Token {
     tokenStorage = async({userId, privateKey, publicKey}) => {
        try {

            const saveTokens = await TokenModel.create(
                {
                    userId,
                    privateKey,
                    publicKey
                }
            )
            return saveTokens ? true : false;
        }catch (e) {
            return e
        }
    }
}

module.exports = new Token()
