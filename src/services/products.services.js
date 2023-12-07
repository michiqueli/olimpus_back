const { Product, Review } = require('../db/db');

const ProductServices = {
  getAllProducts: async () => {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching products');
    }
  },

  createProduct: async (productData) => {
    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating product');
    }
  },
  getOneProduct: async (id) => {
    try {
      const product = await Product.findOne({
        include: [{
            model: Review,
        }],
        where: { id: id }
    })
    return product
    } catch (error) {
      console.error(error.message)
    }
  }
};

module.exports = ProductServices;
