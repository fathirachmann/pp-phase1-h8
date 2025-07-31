const express = require('express');
const router = express.Router()

router.get('/profiles/:id')
router.post('/profiles/:id')

module.exports = router