"use strict";

const TokenModel = require("../models/token.model");

class Token {
    tokenStorage = async ({ userId, privateKey, publicKey, refreshToken }) => {
        try {
            const filter = { userId: userId };
            const update = { privateKey, publicKey, refreshTokensUsed: [], refreshToken };
            const option = { upsert: true, new: true };
            const tokens = await TokenModel.findOneAndUpdate(filter, update, option);
            return tokens ? tokens.publicKey : null;
        } catch (e) {
            return e;
        }
    };

    findOneByUserId = async (userId) => {
        return TokenModel.findOne({ userId }).select(["userId", "publicKey", "privateKey", "refreshToken"]).lean();
    };

    removeTokenByUserId = async (userId) => {
        return TokenModel.deleteOne({ userId });
    };

    updateRefreshToken = ({ userId, newRefreshToken }) => {
        const filter = { userId };
        const update = { refreshToken: newRefreshToken };
        const option = { new: true };
        return TokenModel.findOneAndUpdate(filter, update, option);
    };
}

module.exports = new Token();
