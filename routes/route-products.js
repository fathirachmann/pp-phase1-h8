const express = require('express');
const Controller = require('../controllers/productController');
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

router.get('/', Controller.getProduct)
router.get('/add', Controller.getAddProduct)
router.post('/add', Controller.postAddProduct)
router.get('/:id', Controller.productDetail)
router.get('/:id/edit', Controller.getEditProduct)
router.post('/:id/edit', Controller.postEditProduct)
router.get('/:id/delete', Controller.deleteProduct)
router.get('/:id/buy', Controller.getBuyProduct)
router.post('/:id/buy', Controller.postBuyProduct)

module.exports = router