const express = require('express');
const router = express.Router()
const profileRoute = require('./route-profiles');
const productRoute = require('./route-products');
const indexRoute = require('./indexRouter');

router.use('/profiles', profileRoute)
router.use('/products', productRoute)

router.use('/', indexRoute)

module.exports = router