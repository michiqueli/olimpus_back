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
        where: { usuarioId: userId, isActive: true },
      });

      const newCart = await Cart.create({
        usuarioId: userId,
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

  addProductsCart: async ({ id, products, quantity, amount, usuarioId }) => {
    try {
      const product = await Product.findByPk(products[0]);

      if (!product) {
        throw new Error("Este producto no se encuentra");
      }

      const inTheCart = await Cart.findOne({
        where: {
          products: {
            [Op.contains]: { products },
          },
        },
      });

      const notEmptyCart =
        id !== undefined && quantity !== undefined && amount !== undefined;

      if (notEmptyCart && !inTheCart) {
        const newProductInCart = await Cart.create({
          products,
          quantity,
          amount,
          inCart: true,
          usuarioId, // Establecer el usuarioId al crear el carrito
        });

        // Actualizar el estado del producto a "en el carrito", esto lo puse opcional modificando el modelo cart.
        await product.update({ inCart: true });

        return {
          mensaje: "El producto fue agregado al carrito",
          product: newProductInCart,
        };
      } else if (inTheCart) {
        throw new Error("El producto ya está en el carrito");
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        `Error al agregar productos al carrito: ${error.message}`
      );
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
