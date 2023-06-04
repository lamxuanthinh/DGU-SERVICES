const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const cors = require("cors")
const app = express()
const {app: { clientUrl }} = require("./configs/config.mongodb")

// Initialize Middleware
app.use(
    cors({
        origin: clientUrl,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())



// Initialize Database
require("./database/init.mongodb")


// Initialize Routes
app.use("/", require("./routes"))


// Handing Error
app.use((req,res, next) => {
    return res.status(404).json(
        {
            message: "NOT FOUND"
        }
    )
})

module.exports = app
