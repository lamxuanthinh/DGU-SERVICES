"use strict";

const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const UserModel = require("../models/user.model");
const Token = require("./token.service");
const { createTokenPair } = require("../auth/authUtil");
const { getInfoData } = require("../utils");

const roleDGU = {
  USER: "0001",
  CONTENT_MODERATION: "0002",
  ADMIN: "0003",
};

class AccessService {
  static signUp = async ({ email, name, password }) => {
    try {
      const holderUser = await UserModel.findOne({ email }).lean();
      if (holderUser) {
        return {
          code: "xxx",
          message: "User already exist",
        };
      }

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
        if (!tokenSaved) {
          return {
            code: "xxx",
            message: "Token Error",
          };
        }
        const tokens = await createTokenPair(
          { userId: createUser._id, email: createUser.email },
          privateKey,
          publicKey
        );
        return {
          code: "xxx",
          message: "SignUp Successfully",
          dataMeta: getInfoData({
            object: createUser,
            fields: ["_id", "email", "name"],
          }),
          tokens,
        };
      }
    } catch (e) {
      return {
        code: "xxx",
        message: e.message,
        status: "Error",
      };
    }
  };
}

module.exports = AccessService;
