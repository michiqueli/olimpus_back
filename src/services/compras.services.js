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
      attributes: ["id", "cartIds", "total", "date"],
      include: [
        {
          model: Cart,
          as: 'Carts',
          attributes: ["id", "products", "quantity", "amount"],
        },
      ],
    });

    return { carts: historial.Carts, total: historial.total, date: historial.date };
  },

  addCompraToHistorial: async (userId, cartId) => {
    const historial = await Compra.findOne({
      where: { usuarioId: userId },
    });
    const cart = await Cart.findByPk(cartId);
    
    await historial.addCart(cart);
    historial.total += cart.amount;
    
    await historial.save();
  },
};

module.exports = ComprasService;
