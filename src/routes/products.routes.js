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
 *      Products:
 *          type: object
 *          properties:
 *              name:
 *                  type: string,
 *                  description: Name of the Product
 *              price: 
 *                  type: float
 *                  description: Price of the Product
 *              stock:
 *                  type: number
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
 *              isActve:
 *                  type: boolean
 *                  description: Say if the Product is Active or Not
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
 *              description: descriptio for example
 *              image: example.jpg
 *              discount: 10
 *              isActive: true
 *              TypeId: 3
 *              SubtypeId: 14
 */
/**
 * @swagger
 * /products:
 *      get:
 *          summary: Get All Products from de DB
 *          tags: [products]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Products'
 *          response:
 *              200:
 *                  description: All Products
 */

module.exports = router;
