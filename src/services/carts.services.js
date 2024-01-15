const { Cart } = require("../db/db");

const CartServices = {
  
  createEmptyCart: async (userId) => {
    try {
      // Desactiva cualquier carrito activo previo
      await Cart.update({ isActive: false }, {
        where: { usuarioId: userId, isActive: true },
      });
      
      const newCart = await Cart.create({
        usuarioId: userId,
        items: [],
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

  getAllCarts: async () => {
    try {
      const allCarts = await Cart.findAll();
      if (allCarts.length > 0) {
        return allCarts;
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

      cart.items = cartDetails.items;
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
};

module.exports = CartServices;
