"use strict";

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const UserModel = require("../models/user.model");
const { createTokenPair, createKeyPair } = require("../auth/authUtil");
const { dataFilter } = require("../utils/dataFilter");
const { roleDGU } = require("../utils/role");
const { BadResponseError, ConflictResponseError } = require("../core/error.response");

// import services
const Token = require("./token.service");

class AccessService {
    signUp = async ({ email, name, password }) => {
        const holderUser = await UserModel.findOne({ email }).lean();
        if (holderUser) throw new BadResponseError("Error: Gmail already exist");

        const holderName = await UserModel.findOne({ name }).lean();
        if (holderName) throw new BadResponseError("Error: User Name already exist");

        const hashPassword = await bcrypt.hash(password, 10);
        const createUser = await UserModel.create({
            email,
            name,
            password: hashPassword,
            roles: [roleDGU.USER],
        });

        if (createUser) {
            const { privateKey, publicKey } = createKeyPair();

            const tokens = await createTokenPair(
                {
                    userId: createUser._id,
                    email: createUser.email,
                },
                privateKey,
                publicKey,
            );

            const tokenSave = await Token.tokenStorage({
                userId: createUser._id,
                privateKey,
                publicKey,
                refreshToken: tokens.refreshToken,
            });
            if (!tokenSave) throw new ConflictResponseError();

            return {
                user: dataFilter({ object: createUser, fields: ["_id", "email", "name"] }),
                tokens,
            };
        }
    };

    login = async ({ email, password, refreshToken = {} }) => {
        const holderUser = await UserModel.findOne({ email }).select(["email", "name", "password"]).lean();
        if (!holderUser) throw new BadResponseError("Error: Email don't exists");

        const match = await bcrypt.compare(password, holderUser.password);
        if (!match) throw new BadResponseError("Error: Password don't match");

        const { privateKey, publicKey } = createKeyPair();

        const tokens = await createTokenPair(
            {
                userId: holderUser._id,
                email: holderUser.email,
            },
            privateKey,
            publicKey,
        );

        const tokenSave = await Token.tokenStorage({
            userId: holderUser._id,
            privateKey,
            publicKey,
            refreshToken: tokens.refreshToken,
        });

        if (!tokenSave) throw new ConflictResponseError();

        return {
            user: dataFilter({ object: holderUser, fields: ["_id", "email", "name"] }),
            tokens,
        };
    };

    refreshToken = async ({ user, keyStorage, refreshToken }) => {
        const { userId, email } = user;

        if (keyStorage.refreshToken !== refreshToken) {
            await Token.removeTokenByUserId(userId);
            throw new BadResponseError("Please ReLogin");
        }
        const tokens = await createTokenPair({ userId, email }, keyStorage.privateKey, keyStorage.publicKey);
        const newRefreshToken = tokens.refreshToken;

        await Token.updateRefreshToken({ userId, newRefreshToken });
        return {
            user: { _id: userId, email },
            tokens,
        };
    };

    logout = async ({ userId }) => {
        await Token.removeTokenByUserId(userId);
        return {
            deleted: true,
        };
    };
}

module.exports = new AccessService();
