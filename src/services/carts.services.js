const { Product, Review, Type, Subtype, Cart } = require("../db/db");
const { Op } = require("sequelize");

const CartServices = {
  // getProducts: async () => {
  //   try {
  //     const products = await Product.findAll();
  //     if (products) {
  //       res.json({ products });
  //     } else {
  //       res.json({ mensaje: "no hay productos" });
  //     }
  //     return products;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Error al obtener productos");
  //   }
  // },
  
  createEmptyCart: async (userId) => {
    try {
      // Desactiva cualquier carrito activo previo
      await Cart.update({ isActive: false }, {
        where: { userId: userId, isActive: true },
      });

      const newCart = await Cart.create({
        userId: userId,
        products: [],
        quantity: 0,
        amount: 0,
        inCart: true,
        isActive: true,
      });

      return newCart;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear el nuevo carrito.");
    }
  },

  getProductsCart: async () => {
    try {
      const productsCart = await Cart.findAll();
      if (productsCart.length > 0) {
        return productsCart;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener productos del carrito");
    }
  },

  addProductsCart: async ({ userId, cartId, cartDetails }) => {
    try {
      const cart = await Cart.findOne({
        where: {
          id: cartId,
          usuarioId: userId,
          isActive: true,
        },
      });

      if (!cart) {
        throw new Error("No se encontró el carrito activo para el usuario.");
      }

      cart.products = cartDetails.products;
      cart.quantity = cartDetails.quantity;
      cart.amount = cartDetails.amount;

      await cart.save();

      return {
        mensaje: "El carrito fue actualizado correctamente.",
        cart: cart,
      };
    } catch (error) {
      console.error(error);
      throw new Error(`Error al agregar productos al carrito: ${error.message}`);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      console.log(productId);

      const inTheCart = await Cart.findOne({
        where: {
          products: {
            [Op.contains]: [parseInt(productId)],
          },
        },
      });

      if (!inTheCart) {
        return res
          .status(400)
          .json({ mensaje: "El producto no está en el carrito" });
      }

      await Cart.destroy({
        where: {
          products: {
            [Op.contains]: [parseInt(productId)],
          },
        },
      });

      const product = await Product.findByPk(parseInt(productId));
      await product.update({ inCart: false });

      return res.json({
        mensaje: "El producto fue eliminado del carrito",
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el producto del carrito");
    }
  },

  // putProduct: async (req, res) => {
  //   try {
  //     const { productId } = req.params;
  //     const { query } = req.body;

  //     if (!query) {
  //       return res.status(400).json({ mensaje: "Debes enviar una query" });
  //     }

  //     const productoBuscado = await Cart.findByPk(productId);

  //     if (!productoBuscado) {
  //       return res
  //         .status(404)
  //         .json({ mensaje: "Producto no encontrado en el carrito" });
  //     }

  //     if (query === "add") {
  //       productoBuscado.amount = productoBuscado.amount + 1;
  //     } else if (query === "del") {
  //       productoBuscado.amount = productoBuscado.amount - 1;
  //     } else {
  //       return res.status(400).json({ mensaje: "Consulta no válida" });
  //     }

  //     await productoBuscado.save();

  //     return res.json({
  //       mensaje: `El producto ${productoBuscado.name} fue actualizado`,
  //       product: productoBuscado,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Error al actualizar el producto del carrito");
  //   }
  // },
};

module.exports = CartServices;
