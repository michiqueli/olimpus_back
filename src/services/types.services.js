const { Type, Subtype } = require("../db/db");
const { Op, where } = require("sequelize");
const Types = require("../models/Types");

const TypeServices = {
  getAllTypes: async () => {
    try {
      const allTypes = await Type.findAll();
      return allTypes;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Types");
    }
  },
  getSubTypes: async (typeId) => {
    try {
      const subTypes = await Subtype.findAll({
        where: { TypeId: typeId },
      });
      return subTypes;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching SubTypes");
    }
  },
  getMetrics: async (subType) => {
    try {
      const metrics = await Subtype.findAll({
        where: {
          name: {
            [Op.iLike]: `%${subType}%`,
          },
        },
        attributes: ["id", "metric"],
      });
      return metrics;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Metrics");
    }
  },
};
module.exports = TypeServices;
