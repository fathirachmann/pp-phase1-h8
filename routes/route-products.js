const express = require('express');
const Controller = require('../controllers/productController');
const router = express.Router()

router.get('/', Controller.getProduct)
// router.get('/add')
// router.post('/add')
// router.get('/:id')
// router.get('/:id/edit')
// router.post('/:id/edit')
// router.get('/:id/delete')
// router.get('/:id/buy')


module.exports = router