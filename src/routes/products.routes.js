const { Router } = require('express');
const router = Router();
const ProductControllers = require('../controllers/products.controllers');

router.get('/', ProductControllers.getAllProducts);
router.get('/name', ProductControllers.getProductByName)
router.get('/:id', ProductControllers.getProductById);
router.post('/', ProductControllers.createProduct);
router.patch('/update/:id', ProductControllers.updateProduct)
router.delete('/delete/:id', ProductControllers.deleteProduct)

/**
 * @swagger 
 * components:
 *   schemas:
 *      getProducts:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Name of the Product
 *              price: 
 *                  type: number
 *                  description: Price of the Product
 *              stock:
 *                  type: integer
 *                  description: Quantity in Stock
 *              description:
 *                  type: string
 *                  description: Description of the Product
 *              image:
 *                  type: string
 *                  description: Image URL of the Product
 *              discount:
 *                  type: number
 *                  description: Number of the discount to the price of the product
 *              isActive:
 *                  type: boolean
 *                  description: Indicates if the Product is Active or Not
 *              TypeId:
 *                  type: string
 *                  description: Category of the Product
 *              SubtypeId:
 *                  type: object
 *                  description: Sub-Category of the product
 *          example:
 *              name: Remera Adidas Dama
 *              price: 12540.57
 *              stock: 10
 *              description: Description for example
 *              image: example.jpg
 *              discount: 10
 *              isActive: true
 *              TypeId: Indumentaria
 *              SubtypeId: {
 *                  name: Short,
 *                  metric: S         
 *                  }
 *      postProducts:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Name of the Product
 *              price: 
 *                  type: number
 *                  description: Price of the Product
 *              stock:
 *                  type: integer
 *                  description: Quantity in Stock
 *              description:
 *                  type: string
 *                  description: Description of the Product
 *              image:
 *                  type: string
 *                  description: Image URL of the Product
 *              discount:
 *                  type: number
 *                  description: Number of the discount to the price of the product
 *              isActive:
 *                  type: boolean
 *                  description: Indicates if the Product is Active or Not
 *              TypeId:
 *                  type: number
 *                  description: ID of Category
 *              SubtypeId:
 *                  type: number
 *                  description: ID of Sub-Category
 *          required:
 *              - name
 *              - price
 *              - stock
 *              - description
 *              - image
 *              - discount
 *              - isActive
 *              - TypeId
 *              - SubtypeId
 *          example:
 *              name: Remera Adidas Dama
 *              price: 12540.57
 *              stock: 10
 *              description: Description for example
 *              image: example.jpg
 *              discount: 10
 *              isActive: true
 *              TypeId: 3
 *              SubtypeId: 14
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para manejar productos
 *
 * /products:
 *   get:
 *      summary: Get All Products from the DB
 *      tags: [Products]
 *      responses:
 *          '200':
 *              description: Successful response. Returns a list of products.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array,
 *                          items:
 *                              $ref: '#/components/schemas/getProducts'
 *          '500':
 *              description: Internal Server Error
 */

module.exports = router;
