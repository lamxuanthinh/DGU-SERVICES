"use strict"

const _ = require("lodash")

const dataFilter = ({object = {}, fields = []}) => {
    return _.pick(object, fields)
}

module.exports = {
    dataFilter
}