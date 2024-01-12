const { Router } = require("express");
const router = Router();
const CartControllers = require("../controllers/carts.controllers");

router.get("/getAllCarts", CartControllers.getAllCarts); //Devuelve Todos los carros de la BDD
//Agregar una Ruta para traer solo los carros activos del usuario
router.post("/addproducts/:userId/:cartId", CartControllers.addProductsCart); // Agrega Productos al Carrito

module.exports = router;
