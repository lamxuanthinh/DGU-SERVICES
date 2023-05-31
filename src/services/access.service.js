"use strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserModel = require("../models/user.model");
const Token = require("./token.service");
const {createTokenPair} = require("../auth/authUtil");
const {dataFilter} = require("../utils/dataFilter");
const {BadResponseError, ConflictResponseError} = require("../core/error.response");

const roleDGU = {
    USER: "0001",
    CONTENT_MODERATION: "0002",
    ADMIN: "0003",
};

class AccessService {
    signUp = async ({email, name, password}) => {

            const holderUser = await UserModel.findOne({email}).lean();
            if (holderUser) { throw new BadResponseError("Error: User already exist") }

            const hashPassword = await bcrypt.hash(password, 10);
            const createUser = await UserModel.create({
                email,
                name,
                password: hashPassword,
                roles: [roleDGU.USER],
            });

            if (createUser) {
                const privateKey = crypto.randomBytes(64).toString();
                const publicKey = crypto.randomBytes(64).toString();

                const tokenSaved = await Token.tokenStorage({
                    userId: createUser._id,
                    privateKey,
                    publicKey,
                });
                if (!tokenSaved) { throw new ConflictResponseError()}

                const tokens = await createTokenPair({
                    userId: createUser._id, email: createUser.email},
                    privateKey,
                    publicKey
                );
                return {
                    dataMeta:dataFilter({object: createUser, fields: ["_id", "email", "name"]}),
                    tokens,
                };
            }
    };
}

module.exports = new AccessService();
