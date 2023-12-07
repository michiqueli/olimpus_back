const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/users.controllers');

// Endpoint para obtener todos los usuarios
router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);

module.exports = router;