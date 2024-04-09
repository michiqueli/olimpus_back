const CartServices = require("../services/carts.services");

const CartControllers = {

  getAllCarts: async (req, res) => {
    try {
      const allCarts = await CartServices.getAllCarts();
      if (allCarts) {
        res.json(allCarts);
      } else {
        res.json({ mensaje: "no hay carros para mostrar" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  addProductsCart: async (req, res) => {
    try {
      const { items, amount } = req.body;
      const { userId, cartId } = req.params;

      console.log("Datos recibidos:", {
        userId,
        cartId,
        items,
        amount,
      });

      const result = await CartServices.addProductsCart({
        userId,
        cartId,
        cartDetails: { items, amount },
      });
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ mensaje: error.message });
    }
  },
};

module.exports = CartControllers;
