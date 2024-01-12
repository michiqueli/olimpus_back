const CartServices = require("../services/carts.services");

const CartControllers = {
  // getProducts: async (req, res) => {
  //   try {
  //     const products = await CartServices.getProducts();
  //     res.json(products);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("Internal Server Error");
  //   }
  // },

  createEmptyCart: async (req, res) => {
    const { userId } = req.params;

    try {
      const newCart = await CartServices.createEmptyCart(userId);
      res.status(201).json({ cart: newCart });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Error al crear el nuevo carrito.' });
    }
  },

  getProductsCart: async (req, res) => {
    try {
      const productsCart = await CartServices.getProductsCart();
      if (productsCart) {
        res.json(productsCart);
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

  deleteProduct: async (req, res) => {
    try {
      await CartServices.deleteProduct(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  // putProduct: async (req, res) => {
  //   try {
  //     await CartServices.putProduct(req, res);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("Internal Server Error");
  //   }
  // },
};

module.exports = CartControllers;
