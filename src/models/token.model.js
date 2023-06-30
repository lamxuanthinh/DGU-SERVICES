"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Token";
const COLLECTION_NAME = "Tokens";

const tokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        privateKey: {
            type: String,
            required: true,
        },
        publicKey: {
            type: String,
            required: true,
        },
        refreshTokensUsed: {
            type: Array,
            default: [],
        },
        refreshToken: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

module.exports = model(DOCUMENT_NAME, tokenSchema);
