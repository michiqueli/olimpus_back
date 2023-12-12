const TypeServices = require("../services/types.services");

const TypeControllers = {
  getAllTypesInStock: async (req, res) => {
    try {
      const types = await TypeServices.getAllTypesInStock();
      res.json(types);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getAllTypes: async (req, res) => {
    try {
      const types = await TypeServices.getAllTypes();
      res.json(types);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getTypesWithSubtypes: async (req, res) => {
    try {
      const typesWithSubtypes = await TypeServices.getTypesWithSubtypes();
      res.json(typesWithSubtypes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = TypeControllers;
