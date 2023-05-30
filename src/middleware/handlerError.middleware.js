"use strict"

const asyncHandler = fn => {
    return (req, res, next) => {
        fn (req, res, next).catch((e) => {
            return res.status(e.status).json({
                status: "Error",
                code: e.status,
                message: e.message
            })
        })
    }
}

module.exports = {
    asyncHandler
}