const { Product, Type, Subtype } = require("../db/db");
const { Op } = require("sequelize");
const Types = require("../models/Types");

const TypeServices = {
  getAllTypesInStock: async () => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Type,
            attributes: ["name"],
          },
          {
            model: Subtype,
            attributes: ["name", "metric"],
          },
        ],
      });
      let types = []
      products.map((product)=>{
        types.push({type: product.Type.name, subType: product.Subtype.name, metric: product.Subtype.metric})
      });
      return types
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching products");
    }
  },
  getAllTypes: async () => {
    try {
      const types = await Subtype.findAll({
        include: [
          {
            model: Type,
            attributes: ["name"],
          },
        ],
      });
      return types
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching products");
    }
  },
};
module.exports = TypeServices;
