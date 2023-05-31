"use strict";

const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const UserModel = require("../models/user.model");
const Token = require("./token.service");
const {createTokenPair, createKeyPair} = require("../auth/authUtil");
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
            if (holderUser) throw new BadResponseError("Error: Gmail already exist")

            const holderName = await  UserModel.findOne({name}).lean();
            if (holderName) throw new BadResponseError("Error: User Name already exist")

            const hashPassword = await bcrypt.hash(password, 10);
            const createUser = await UserModel.create({
                email,
                name,
                password: hashPassword,
                roles: [roleDGU.USER],
            });

            if (createUser) {
                const {privateKey, publicKey} =  createKeyPair()

                const tokenSaved = await Token.tokenStorage({
                    userId: createUser._id,
                    privateKey,
                    publicKey,
                });
                if (!tokenSaved) throw new ConflictResponseError()

                const tokens = await createTokenPair({
                    userId: createUser._id, email: createUser.email},
                    privateKey,
                    publicKey
                );
                return {
                    user: dataFilter({object: createUser, fields: ["_id", "email", "name"]}),
                    tokens,
                };
            }
    };

    login = async ({email, password, refreshToken = {}}) => {

        const holderUser = await UserModel.findOne({ email }).select(["email","name","password"]).lean()
        if(!holderUser) throw new BadResponseError("Error: Email don't exists")

        const match = await bcrypt.compare(password, holderUser.password)
        if(!match) throw new BadResponseError("Error: Password don't match")

        const {privateKey, publicKey} = createKeyPair()


        const tokens = await createTokenPair({
            userId: holderUser._id, email: holderUser.email}    ,
            privateKey,
            publicKey
        );

        const tokenSave = Token.tokenStorage({
            userId: holderUser._id,
            privateKey,
            publicKey,
            refreshToken: tokens.refreshToken
        })

        return {
            user: dataFilter({object: holderUser, fields: ["_id", "email", "name"]}),
            tokens
        }
    }
}

module.exports = new AccessService();
