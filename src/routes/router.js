require('dotenv').config();
const { Router } = require('express');
const router = Router();

const products = require('./products.routes.js');
const users= require('./users.routes.js');

router.use('/products', products);
router.use('/users', users);

module.exports = router;