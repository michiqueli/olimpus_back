const { Router } = require('express');
const router = Router();
const UserControllers = require('../controllers/users.controllers');

// Endpoint para obtener todos los usuarios
router.get('/', UserControllers.getAllUsers);
router.post('/', UserControllers.createUser);

module.exports = router;