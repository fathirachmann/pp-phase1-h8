const express = require('express');
const router = express.Router()
<<<<<<<<< Temporary merge branch 1
const profileRoute = require('./route-profiles');
const productRoute = require('./route-products');


router.use('/profiles', profileRoute)
router.use('/products', productRoute)
router.use('/', indexRoute)

module.exports = router