"use strict"

const {Schema, model} = require("mongoose")

const DOCUMENT_NAME = "User"
const COLLECTION_NAME = "Users"

let userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive"
        },
        roles: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

module.exports = model(DOCUMENT_NAME, userSchema)