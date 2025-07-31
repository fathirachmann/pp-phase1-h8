const express = require('express');
const router = express.Router()
const indexRoute = require('./indexRouter');


router.use('/', indexRoute)
const profileRoute = require('./route-profiles');
const productRoute = require('./route-products');
const indexRoute = require('./indexRouter');

router.use('/profiles', profileRoute)
router.use('/products', productRoute)
router.use('/', indexRoute)

module.exports = router