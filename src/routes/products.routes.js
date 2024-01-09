const { Router } = require("express");
const router = Router();
const ProductControllers = require("../controllers/products.controllers");

router.get("/", ProductControllers.getAllProducts);
router.get("/orderByPrice/:ascending", ProductControllers.orderByPrice);
router.get("/name", ProductControllers.getProductByName);
router.get("/withDiscount", ProductControllers.getProductWithDiscount);
router.get("/:id", ProductControllers.getProductById);
router.post("/", ProductControllers.createProduct);
router.patch("/update/:id", ProductControllers.updateProduct);
router.delete("/delete/:id", ProductControllers.deleteProduct);

// FILTRO POR TIPO
router.get("/filterByType/:typeName", ProductControllers.filterByType);

// FILTRO POR SUBTIPO
router.get("/filterBySubType/:subtypeName", ProductControllers.filterBySubType);
//FILTRO POR  MEDIDA

router.get("/filterByMetric/:metric", ProductControllers.filterByMetric);

/**
 * @swagger
 * components:
 *   schemas:
 *      getProducts:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  description: Id of the Product
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
 *                  description: Category ID of the Product
 *              SubtypeId:
 *                  type: number
 *                  description: Sub-Category ID of the product
 *              Type:
 *                  type: object
 *                  description: Category of the Product
 *                  properties:
 *                      name: string
 *              Subtype:
 *                  type: object
 *                  description: Sub-Category of the product
 *                  properties:
 *                      name:
 *                          type: string
 *                          description: Name of the Sub-Category
 *                      metric:
 *                          type: string
 *                          description: Metric of the Sub-Category
 *              Reviews:
 *                  type: array
 *                  description: Reviews of the product
 *                  properties:
 *                      reviewId:
 *                          type: number
 *                          description: Ids reviews of the product
 *          example:
 *              id: 1
 *              name: Remera Adidas Dama
 *              price: 12540.57
 *              stock: 10
 *              description: Description for example
 *              image: example.jpg
 *              discount: 10
 *              isActive: true
 *              TypeId: 3
 *              SubTypeId: 23
 *              Type:
 *                  name: Indumentaria
 *              Subtype:
 *                  name: Short
 *                  metric: S
 *              Reviews: [1, 2, 3]
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
 *                  type: string
 *                  description: Category of the Product
 *              SubtypeId:
 *                  type: object
 *                  description: Sub-Category of the product
 *                  properties:
 *                      name:
 *                          type: number
 *                          description: Id of the Sub-Category
 *                      metric:
 *                          type: number
 *                          description: Id of the Sub-Category
 *          example:
 *              name: Remera Adidas Dama
 *              price: 12540.57
 *              stock: 10
 *              description: Description for example
 *              image: example.jpg
 *              discount: 10
 *              isActive: true
 *              TypeId: 3
 *              SubtypeId: 23
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
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para manejar Productos
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
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getProducts'
 *          '500':
 *              description: Internal Server Error
 *
 *   post:
 *      summary: Create a Product
 *      tags: [Products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          price:
 *                              type: number
 *                          stock:
 *                              type: number
 *                          description:
 *                              type: string
 *                          image:
 *                              type: string
 *                          discount:
 *                              type: number
 *                          isActive:
 *                              type: boolean
 *                          TypeId:
 *                              type: number
 *                          SubtypeId:
 *                              type: number
 *      responses:
 *          '200':
 *              description: Successful response. Returns the created Product
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/postProducts'
 *          '500':
 *              description: Internal Server Error
 * /products/{productId}:
 *   get:
 *      summary: Get One Product from the DB
 *      tags: [Products]
 *      parameters:
 *         - in: path
 *           name: productId
 *           required: true
 *           schema:
 *              type: integer
 *           description: Id of the requested product info
 *      responses:
 *          '200':
 *              description: Successful response. Returns the product.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getProducts'
 *          '500':
 *              description: Internal Server Error
 * /products/name?name={productName}:
 *   get:
 *      summary: Get Products By Name from the DB
 *      tags: [Products]
 *      parameters:
 *         - in: path
 *           name: productName
 *           required: true
 *           schema:
 *              type: string
 *           description: Name to Search in the names of the products of DB
 *      responses:
 *          '200':
 *              description: Successful response. Returns a list of products white the params in theirs names.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getProducts'
 *          '500':
 *              description: Internal Server Error
 * /products/withDiscount:
 *   get:
 *      summary: Get All Products Whit Discount from the DB
 *      tags: [Products]
 *      responses:
 *          '200':
 *              description: Successful response. Returns a list of products ehit Discounts.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getProducts'
 *          '500':
 *              description: Internal Server Error
 * /products/update/{productId}:
 *   patch:
 *      summary: Update a Product (You can Update one, two, three .... or all properties)
 *      tags: [Products]
 *      parameters:
 *         - in: path
 *           name: productId
 *           required: true
 *           schema:
 *              type: integer
 *           description: Id of the product to update
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          price:
 *                              type: number
 *                          stock:
 *                              type: number
 *                          description:
 *                              type: string
 *                          image:
 *                              type: string
 *                          discount:
 *                              type: number
 *                          isActive:
 *                              type: boolean
 *                          TypeId:
 *                              type: number
 *                          SubtypeId:
 *                              type: number
 *      responses:
 *          '200':
 *              description: Successful response. Returns the Updated Product
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getProducts'
 *          '500':
 *              description: Internal Server Error
 * /products/delete/{productId}:
 *    delete:
 *      summary: Delete One Product from the DB
 *      tags: [Products]
 *      parameters:
 *         - in: path
 *           name: productId
 *           required: true
 *           schema:
 *              type: integer
 *           description: ID of the product you want to delete
 *      responses:
 *          '200':
 *              description: Successful response. "El producto a Sido eliminado con exito".
 *          '500':
 *              description: Internal Server Error
 * /products/filterByType/{typeName}:
 *    get:
 *      summary: Get Products filtered By Category from the DB
 *      tags: [Products]
 *      parameters:
 *         - in: path
 *           name: typeName
 *           required: true
 *           schema:
 *              type: string
 *           description: type of the requested filtered products
 *      responses:
 *          '200':
 *              description: Successful response. Returns the products.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getProducts'
 *          '500':
 *              description: Internal Server Error
 * /products/filterBySubType/{subTypeName}:
 *    get:
 *      summary: Get Products filtered By Category from the DB
 *      tags: [Products]
 *      parameters:
 *         - in: path
 *           name: subTypeName
 *           required: true
 *           schema:
 *              type: string
 *           description: SubType of the requested filtered products
 *      responses:
 *          '200':
 *              description: Successful response. Returns the products.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getProducts'
 *          '500':
 *              description: Internal Server Error
 * /products/filterByMetric/{metricName}:
 *    get:
 *      summary: Get Products filtered By Metrics from the DB
 *      tags: [Products]
 *      parameters:
 *         - in: path
 *           name: metricName
 *           required: true
 *           schema:
 *              type: string
 *           description: Metric of the requested filtered products
 *      responses:
 *          '200':
 *              description: Successful response. Returns the products.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getProducts'
 *          '500':
 *              description: Internal Server Error
 */

module.exports = router;
