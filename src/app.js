const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

// Initialize Middleware
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
