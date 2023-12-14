// const { Type, Subtype, Product } = require("../db/db");
// const { Op } = require("sequelize");

// const FiltersServices = {
//   filterBySubtype: async (subtypeName) => {
//     try {
//       const filteredSubtypes = await Product.findAll({
//         where: {
//           "$Subtype.name$": subtypeName,
//         },
//         include: [
//           {
//             model: Subtype,
//             attributes: ["name", "metric"],
//           },
//         ],
//       });

//       return filteredSubtypes.map((product) => ({
//         type: product.Subtype.Type.name,
//         subType: product.Subtype.name,
//         metric: product.Subtype.metric,
//       }));
//     } catch (error) {
//       console.error(error);
//       throw new Error("Error filtering products by subtype name");
//     }
//   },

//   filterByType: async (typeName) => {
//     try {
//       const filteredTypes = await Product.findAll({
//         where: {
//           "$Type.name$": typeName,
//         },
//         include: [
//           {
//             model: Type,
//             attributes: ["name"],
//           },
//           {
//             model: Subtype,
//             attributes: ["name", "metric"],
//           },
//         ],
//       });

//       return filteredTypes.map((product) => ({
//         typeName: product.Type.name,
//         subtypes: product.Subtype.map((subtype) => ({
//           name: subtype.name,
//           metric: subtype.metric,
//         })),
//       }));
//     } catch (error) {
//       console.error(error);
//       throw new Error("Error filtering products by type name");
//     }
//   },
// };

// module.exports = FiltersServices;
