const { Product, Type, Subtype } = require("../db/db");
const { Op } = require("sequelize");

const TypeServices = {
  getAllTypes: async () => {
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
};
module.exports = TypeServices;
