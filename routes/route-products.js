const express = require('express');
const Controller = require('../controllers/productController');
const router = express.Router()

router.get('/', Controller.getProduct)
router.get('/add', Controller.getAddProduct)
router.post('/add', Controller.postAddProduct)
router.get('/:id', Controller.productDetail)
router.get('/:id/edit', Controller.getEditProduct)
router.post('/:id/edit', Controller.postEditProduct)
router.get('/:id/delete', Controller.deleteProduct)
router.get('/:id/buy', Controller.buyProduct)


module.exports = router