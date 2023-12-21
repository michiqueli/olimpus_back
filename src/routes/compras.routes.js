const { Router } = require('express');
const router = Router();
const ComprasController = require('../controllers/compras.controllers');

router.post('/createEmptyHistorial/:userId', ComprasController.createEmptyHistorial);			//! Crear un historial vacío para un usuario (si no existe)
router.get('/getUserHistorial/:userId', ComprasController.getUserHistorial);					//! Obtener historial de compras de un usuario
router.post('/addCompraToHistorial/:userId/:cartId', ComprasController.addCompraToHistorial);	//! Agregar una nueva compra al historial de un usuario

module.exports = router;
