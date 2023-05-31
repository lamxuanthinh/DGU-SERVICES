"use strict"

const asyncHandler = fn => {
    return (req, res, next) => {
        fn (req, res, next).catch((e) => {
            const statusCode = e.status || "500"
            const messages = e.message || "Server Error"
            return res.status(statusCode).json({
                status: "Error",
                code: statusCode,
                message: messages,
            })
        })
    }
}

module.exports = {
    asyncHandler
}