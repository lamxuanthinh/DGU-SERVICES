"use strict"

const UserModel = require("../models/user.model")
const {BadResponseError} = require("../core/error.response");
class UserService {
    profile = async({ userId }) => {
        const select = ["email","name","roles"]
        const holderProfile = await UserModel.findById({_id: userId}).select(select).lean()
        if(!holderProfile) throw new BadResponseError("Error: Profile don't exist")
        return{
         profile: holderProfile
        }
    }
}

module.exports = new UserService()