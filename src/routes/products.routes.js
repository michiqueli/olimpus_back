const { Router } = require('express');
const router = Router();
const ProductController = require('../controllers/products.controllers');

router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.createProduct);

module.exports = router;