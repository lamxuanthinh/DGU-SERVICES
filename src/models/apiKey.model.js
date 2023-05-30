"use strict"

const {Schema, model} = require("mongoose")

const COLLECTION_NAME = "ApiKeys"
const DOCUMENT_NAME = "ApiKey"

const  apiKeySchema = new Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: Boolean,
            default: true
        },
        permissions: {
            type: [String],
            required: true,
            enum: ["0001", "0002","0003"]
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

module.exports = model(DOCUMENT_NAME, apiKeySchema)