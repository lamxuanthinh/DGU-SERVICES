"use strict"

const {Schema, model} = require("mongoose")

const DOCUMENT_NAME = "Token"
const COLLECTION_NAME = "Tokens"

let tokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        privateKey: {
            type: String,
            required: true
        },
        publicKey: {
            type: String,
            required: true
        },
        refreshToken: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

module.exports = model(DOCUMENT_NAME, tokenSchema)