require('dotenv').config()

const development = {
    app: {
        port: process.env.DEV_APP_PORT || 3000,
        clientUrl: process.env.CLIENT_URL_DEV || ""
    },
    db: {
        name: process.env.DEV_DB_NAME || "",
        userName : process.env.DEV_DB_USERNAME || "" ,
        password: process.env.DEV_DB_PASSWORD || ""
    }
}

const vdocypher = {
    folderId:process.env.VDOCYPHER_FOLDER_ID,
    apiKey:process.env.VDOCYPHER_API_KEY
}

const config = {vdocypher}

module.exports = config
