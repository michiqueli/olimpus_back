require('dotenv').config();
const { Router } = require('express');
const router = Router();

const products = require('./products.routes.js');
const users= require('./users.routes.js');
const carts = require('./carts.routes.js')

router.use('/products', products);
router.use('/users', users);
router.use('/carts', carts);

module.exports = router;