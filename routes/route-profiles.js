const express = require('express');
const Controller = require('../controllers/profileController');
const router = express.Router()

router.get('/:id', Controller.getProfile)
router.post('/:id', Controller.postProfile)

module.exports = router