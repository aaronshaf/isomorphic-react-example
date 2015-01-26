const namespace = require('express').Router()
const endpoints = require('express').Router()

endpoints.get('/', require('./controllers/pandas/get'))
endpoints.get('/:id', require('./controllers/pandas/:id/get'))

namespace.use('/pandas', endpoints)
module.exports = namespace
