// routes/products.js
const express = require('express');
const router = express.Router();
const productService = require('../services/products.service');

router.get('/search', productService.search);   
router.post('/', productService.add);
router.put('/:id/specifications', productService.updateSpecifications);

module.exports = router;