const ComprasService = require('../services/compras.services');

const ComprasController = {
  createEmptyHistorial: async (userId) => {

    try {
      await ComprasService.createEmptyHistorial(userId);
      return { message: 'Historial creado correctamente.' };
    } catch (error) {
      console.error(error);
      throw new Error(`Error en createEmptyHistorial: ${error.message}`);
    }
  },

  getUserHistorial: async (req, res) => {
    const { userId } = req.params;

    try {
      const historial = await ComprasService.getUserHistorial(userId);
      res.status(200).json(historial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el historial.' });
    }
  },

  // Agregar una nueva compra al historial de un usuario
  addCompraToHistorial: async (req, res) => {
    const { userId, cartId } = req.params;

    try {
      await ComprasService.addCompraToHistorial(userId, cartId);
      res.status(201).json({ message: 'Compra agregada al historial correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar la compra al historial.' });
    }
  },
};

module.exports = ComprasController;
