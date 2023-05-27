"use strict";

const express = require("express")
const router = express.Router()

router.get("/bootstrap", (req, res) => {
    return res.status(200).send("Bootstrap Success :)")
})

module.exports = router;
