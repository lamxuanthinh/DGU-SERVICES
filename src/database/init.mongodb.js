'use strict'

const {mongoose} = require('mongoose')
const {db: { userName , password }} = require("../configs/config.mongodb")

const connectString = `mongodb+srv://dgu:${password}@dgu.53hsntq.mongodb.net/`

console.log("Connection URL :", connectString)

class  Database {
    constructor() {
        this.connect()
    }

    connect(type = "mongoose") {
        if(true) {
            mongoose.set('debug', true);
            mongoose.set('debug', {color: true})
        }
        mongoose.connect(connectString).then(() => {
            console.log('Connected MongoDB Success')
        }).catch((err) => console.log("Error Connect !!!"))
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
