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
const {asyncHandler} = require("./middleware/handlerError.middleware");
const {BadResponseError} = require("./core/error.response");


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

// app.use((req, res, next) => {
//     const error = new Error("Not Found")
//     error.status = 404
//     next(error)
// })
//
// app.use((error,req, res, next) => {
//     const statusCode = error.status || 500
//         return res.status(statusCode).json(
//         {
//             status: "Error",
//             code: statusCode,
//             message: error.message
//         }
//     )
// })



module.exports = app
