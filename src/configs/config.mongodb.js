require('dotenv').config()

const development = {
    app: {
        port: process.env.DEV_APP_PORT || 3000,
    },
    db: {
        name: process.env.DEV_DB_NAME || "DGU",
        userName : process.env.DEV_DB_USERNAME || "" ,
        password: process.env.DEV_DB_PASSWORD || "nevergiveupk21"
    }
}

const production = {
    app: {
        port: process.env.PRO_APP_PORT || 3000,
    },
    db: {
        name: process.env.PRO_DB_NAME || "",
        userName : process.env.PRO_DB_USERNAME || "",
        password: process.env.PRO_Db_PASSWORD || ""
    }
}

const config = {development, production}
const env = process.env.NODE_ENV || "development"

module.exports = config[env]
