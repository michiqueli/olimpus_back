const { Cart, Compra, User } = require("../db/db");

const ComprasService = {
  createEmptyHistorial: async (userId) => {
    await Compra.findOrCreate({
      where: { usuarioId: userId },
      defaults: { cartIds: [], total: 0 },
    });
  },

  getUserHistorial: async (userId) => {
    const historial = await Compra.findOne({
      where: { usuarioId: userId },
      attributes: ["id", "total", "date"],
      include: [
        {
          model: Cart,
          as: "Carts",
          attributes: ["id", "items", "amount"],
        },
        {
          model: User,
          attributes: ["email"]
        }
      ],
    });

    return {
      historialId: historial.id,
      buyer: historial.User.email,
      date: historial.date,
      carts: historial.Carts,
      total: historial.total,
    };
  },

  addCompraToHistorial: async (userId, cartId) => {
    const historial = await Compra.findOne({
      where: { usuarioId: userId },
    });

    const cart = await Cart.findByPk(cartId);

    await historial.addCarts([cart]);

    historial.total += cart.amount;

    await historial.save();
  },
};

module.exports = ComprasService;
