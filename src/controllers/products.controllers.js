const ProductServices = require('../services/products.services');

const ProductControllers = {
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductServices.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  createProduct: async (req, res) => {
    try {
      const productData = req.body;
      const newProduct = await ProductServices.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getProductById: async (req, res) => {
    try {
      console.log("entrando")
      const id = req.params.id
      console.log(id)
      const product = await ProductServices.getOneProduct(id)
      res.status(201).json(product)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
};

module.exports = ProductControllers;
