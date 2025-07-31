const express = require('express');
const Controller = require('../controllers/indexController');
const router = express.Router()



router.get('/', Controller.home)

router.get('/login', Controller.login)
router.post('/login', Controller.validate)
router.get('/signup', Controller.signup)

router.get('/logout', Controller.logout)


module.exports = router