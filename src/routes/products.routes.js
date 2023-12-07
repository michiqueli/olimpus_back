const { Router } = require('express');
const router = Router();
const ProductControllers = require('../controllers/products.controllers');

router.get('/', ProductControllers.getAllProducts);
router.post('/', ProductControllers.createProduct);

module.exports = router;