require("dotenv").config();
const { Router } = require("express");
const router = Router();

const products = require("./products.routes.js");
const users = require("./users.routes.js");
const types = require("./types.routes.js");
const carts = require("./carts.routes.js");
const purchases = require("./compras.routes.js");
const login = require("./login.routes.js")
//const subTypes = require ('./subTypes.routes.js')

router.use("/products", products);
router.use("/users", users);
router.use("/login", login)
router.use("/types", types);
router.use("/carts", carts);
router.use("/purchases", purchases); //! historial de compras x usuario
//router.use('subtypes', subTypes)

module.exports = router;
