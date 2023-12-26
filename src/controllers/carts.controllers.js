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

  getProductsCart: async (req, res) => {
    try {
      const productsCart = await CartServices.getProductsCart();
      if (productsCart) {
        res.json(productsCart);
      } else {
        res.json({ mensaje: "no hay productos en el carrito" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  addProductsCart: async (req, res) => {
    try {
      const { id, products, quantity, amount } = req.body;

      console.log("Datos recibidos:", { id, products, quantity, amount });

      const result = await CartServices.addProductsCart({
        id,
        products,
        quantity,
        amount,
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
