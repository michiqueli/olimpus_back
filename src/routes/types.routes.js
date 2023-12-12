const { Router } = require('express');
const router = Router();

const TypeControllers = require('../controllers/types.controllers')

router.get('/', TypeControllers.getAllTypes)

module.exports = router;