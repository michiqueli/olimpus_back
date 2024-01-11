const TypeServices = require("../services/types.services");

const TypeControllers = {
  getAllTypes: async (req, res) => {
    try {
      const types = await TypeServices.getAllTypes();
      res.json(types);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getSubTypes: async (req, res) => {
    try {
      const {typeId} = req.body
      const subTypes = await TypeServices.getSubTypes(typeId);
      res.json(subTypes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getMetrics: async (req, res) => {
    try {
      const {subType} = req.body
      const metrics = await TypeServices.getMetrics(subType);
      res.json(metrics);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = TypeControllers;
