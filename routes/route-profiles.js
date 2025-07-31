const express = require('express');
const router = express.Router()

router.get('/')
router.get('/add')
router.post('/add')
router.get('/:id')
router.get('/:id/edit')
router.post('/:id/edit')
router.get('/:id/delete')
router.get('/:id/buy')

module.exports = router