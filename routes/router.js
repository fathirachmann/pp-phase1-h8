const express = require('express');
const router = express.Router()
const indexRoute = require('./indexRouter');


router.use('/', indexRoute)

module.exports = router