const express = require('express');
const Controller = require('../controllers/profileController');
const router = express.Router()

router.use((req, res, next) => {
	console.log(req.session); // received from postLogin Controller 
	if (!req.session.userId) {
		const err = "Please login first"
		res.redirect(`/login?err=${err}`)
		console.log('Time:', Date.now(), "<<Mw One")
	} else { 
  next()}
})

router.get('/:id', Controller.getProfile)
router.post('/:id', Controller.postProfile)
router.get('/:id/topup', Controller.getTopUp)
router.post('/:id/topup', Controller.postTopUp)

module.exports = router