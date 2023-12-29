const { Cart, Compra } = require("../db/db");

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
      attributes: ["cartIds", "total", "date"],
    });

    const carts = await Cart.findAll({
      where: { id: historial.cartIds },
      attributes: ["id", "products", "quantity", "amount"],
    });

    return { carts, total: historial.total, date: historial.date };
  },

  addCompraToHistorial: async (userId, cartId) => {
    const historial = await Compra.findOne({
      where: { usuarioId: userId },
      attributes: ["cartIds", "total", "date"],
    });

    console.log(cartId);

    historial.cartIds.push(cartId);

    const cart = await Cart.findByPk(cartId);
    historial.total += cart.amount;

    // await historial.save();
  },
};

module.exports = ComprasService;
