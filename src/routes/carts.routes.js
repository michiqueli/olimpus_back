const { Router } = require("express");
const router = Router();
const CartControllers = require("../controllers/carts.controllers");

// router.get("/", CartControllers.getProducts); //traer productos
router.get("/products-cart", CartControllers.getProductsCart); //traer productos del carrito

router.post("/addproducts", CartControllers.addProductsCart); //agregar productos al carrito

// router.put("/products-cart/:productId", CartControllers.putProduct); //para agrandar o disminuir la cantidad de productos

router.delete("/deleteproducts/:productId", CartControllers.deleteProduct); //elimina productos del carrito

module.exports = router;
