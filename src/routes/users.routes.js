const { Router } = require('express');
const router = Router();
const UserControllers = require('../controllers/users.controllers');

// Endpoint para obtener todos los usuarios
router.post('/register', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/name', UserControllers.getUserByEmail);
router.get('/:id', UserControllers.getUserById);
router.delete('/delete/:id', UserControllers.deleteUser);
router.patch('/update/:id', UserControllers.updateUser);

module.exports = router;