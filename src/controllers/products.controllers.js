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
      const id = req.params.id
      const product = await ProductServices.getOneProduct(id)
      res.status(201).json(product)
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  getProductByName: async (req, res) => {
    const { name } = req.query
    try {
      const product = await ProductServices.getProductByName(name)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params
    const updateData = req.body
    try {
      const product = await ProductServices.updateProduct(id, updateData)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ message: error.message})
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params
    try {
      const product = await ProductServices.deleteProduct(id)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
};

module.exports = ProductControllers;
