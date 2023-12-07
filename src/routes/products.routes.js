const { Router } = require('express');
const router = Router();
const ProductControllers = require('../controllers/products.controllers');

router.get('/', ProductControllers.getAllProducts);
router.get('/name', ProductControllers.getProductByName)
router.get('/:id', ProductControllers.getProductById);
router.post('/', ProductControllers.createProduct);
router.patch('/update/:id', ProductControllers.updateProduct)
router.delete('/delete/:id', ProductControllers.deleteProduct)


module.exports = router;