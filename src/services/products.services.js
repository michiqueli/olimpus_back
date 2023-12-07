const { Product } = require('../db/db'); 

const ProductService = {
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
};

module.exports = ProductService;
