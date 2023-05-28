"use strict"

const _ = require("lodash")

const getInfoData = ({object = {}, fields = []}) => {
    return _.pick(object, fields)
}

module.exports = {
    getInfoData
}