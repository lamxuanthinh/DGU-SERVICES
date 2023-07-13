require("dotenv").config();

const development = {
    app: {
        port: process.env.DEV_APP_PORT || 3000,
        clientUrl: process.env.CLIENT_URL_DEV || "",
    },
    db: {
        databaseName: process.env.DEV_DB_NAME || "",
        userName: process.env.DEV_DB_USERNAME || "",
        password: process.env.DEV_DB_PASSWORD || "",
        port: process.env.DEV_DB_PORT || 27017,
        ip: process.env.DEV_DB_IP || "",
    },
};

const production = {
    app: {
        port: process.env.PRO_APP_PORT || 3000,
        clientUrl: process.env.CLIENT_URL_PRO || "",
    },
    db: {
        databaseName: process.env.PRO_DB_NAME || "",
        userName: process.env.PRO_DB_USERNAME || "",
        password: process.env.PRO_DB_PASSWORD || "",
        port: process.env.PRO_DB_PORT || 27017,
        ip: process.env.PRO_DB_IP || "",
    },
};

const config = { development, production };
const env = process.env.NODE_ENV || "development";

module.exports = config[env];
