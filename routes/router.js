const express = require('express');
const router = express.Router()
const profileRoute = require('./route-profiles');
const productRoute = require('./route-products');

router.use('/profiles', profileRoute)
router.use('/products', productRoute)
router.get('/')

module.exports = router