require("dotenv").config();

const vdocypher = {
    folderId: process.env.VDOCYPHER_FOLDER_ID,
    apiKey: process.env.VDOCYPHER_API_KEY,
};

const config = { vdocypher };

module.exports = config;
