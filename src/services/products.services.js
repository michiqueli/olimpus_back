const { Product, Review, Type, Subtype } = require("../db/db");
const { Op } = require("sequelize");

const ProductServices = {
  getAllProducts: async () => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Review,
          },
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
      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching products");
    }
  },

  createProduct: async (productData) => {
    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating product");
    }
  },
  getOneProduct: async (id) => {
    try {
      const product = await Product.findOne({
        include: [
          {
            model: Review,
          },
          {
            model: Type,
            attributes: ["name"],
          },
          {
            model: Subtype,
            attributes: ["name", "metric"],
          },
        ],
        where: { id: id },
      });
      if (!product) {
        return "No existe producto con ese ID";
      } else {
        return product;
      }
    } catch (error) {
      console.error(error.message);
    }
  },

  getProductByName: async (name) => {
    try {
      const response = await Product.findAll({
        include: [
          {
            model: Review,
          },
          {
            model: Type,
            attributes: ["name"],
          },
          {
            model: Subtype,
            attributes: ["name", "metric"],
          },
        ],
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      if (!response) {
        throw new Error("Product not Found");
      }
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Product");
    }
  },

  getProductWithDiscount: async (name) => {
    try {
      console.log("entrando al service");
      const response = await Product.findAll({
        include: [
          {
            model: Review,
          },
          {
            model: Type,
            attributes: ["name"],
          },
          {
            model: Subtype,
            attributes: ["name", "metric"],
          },
        ],
        where: {
          discount: {
            [Op.gt]: 0,
          },
        },
      });
      if (!response) {
        throw new Error("No have product with discount");
      }
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Product");
    }
  },

  updateProduct: async (id, updateData) => {
    try {
      const product = await Product.findByPk(id);

      if (!product) {
        throw new Error(`Cannot update Product with id: ${id} `);
      }

      const updatedProduct = await product.update(updateData);

      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Product");
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await Product.findByPk(id);
      if (!response) {
        throw new Error("Product not found");
      }
      await response.destroy();

      return "Producto Eliminated";
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Product");
    }
  },

  orderByPrice: async (ascending = true) => {
    try {
      const orderDirection = ascending ? "ASC" : "DESC";

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
        order: [["price", orderDirection]],
      });

      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching products");
    }
  },

  filterByMetric: async (metric, subtype) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Subtype,
            attributes: ["name", "metric"],
            where: {
              metric: metric,
              name: {
                [Op.iLike]: `%${subtype}%`,
              },
            },
          },
        ],
      });
      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Error al filtrar por metric");
    }
  },
};

module.exports = ProductServices;
