const { Router } = require("express");
const router = Router();
const ComprasController = require("../controllers/compras.controllers");

//agregar una ruta para traer todas las compras (para Admin)
router.get("/getUserHistorial/:userId", ComprasController.getUserHistorial); //! Obtener historial de compras de un usuario
router.post("/addCompraToHistorial/:userId/:cartId", ComprasController.addCompraToHistorial); //! Agregar una nueva compra al historial de un usuario

module.exports = router;
