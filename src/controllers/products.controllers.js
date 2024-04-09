const ProductServices = require("../services/products.services");
const FiltersServices = require("../services/filters.services");

const ProductControllers = {
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductServices.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  createProduct: async (req, res) => {
    try {
      const productData = req.body;
      const newProduct = await ProductServices.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await ProductServices.getOneProduct(id);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getProductByName: async (req, res) => {
    const { name } = req.query;
    try {
      const product = await ProductServices.getProductByName(name);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  getProductWithDiscount: async (req, res) => {
    try {
      console.log("entrando a cotroller");
      const products = await ProductServices.getProductWithDiscount();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  orderByPrice: async (req, res) => {
    try {
      const { ascending } = req.params;
      const products = await ProductServices.orderByPrice(ascending === "true");

      res.status(200).json(products);
    } catch (error) {
      console.error("Error sorting by price:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const product = await ProductServices.updateProduct(id, updateData);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    
    const { id } = req.params;
    try {
      const product = await ProductServices.deleteProduct(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  filterByType: async (req, res) => {
    try {
      const { typeName } = req.params;
      const products = await ProductServices.getAllProducts();
      const filteredProducts = products.filter(
        (product) => product.Type.name.toLowerCase() === typeName.toLowerCase()
      );

      res.status(200).json(filteredProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al filtrar productos por tipo." });
    }
  },

  filterBySubType: async (req, res) => {
    try {
      const { subtypeName } = req.params;
      const subproducts = await ProductServices.getAllProducts();
      const filteredSubProducts = subproducts.filter(
        (subproduct) =>
          subproduct.Subtype.name.toLowerCase() === subtypeName.toLowerCase()
      );

      res.status(200).json(filteredSubProducts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al filtrar productos por subtipo." });
    }
  },

  filterByMetric: async (req, res) => {
    try {
      const { metric } = req.params;
      const products = await ProductServices.filterByMetric(metric);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al filtrar porductos por metric." });
    }
  },
};

module.exports = ProductControllers;
