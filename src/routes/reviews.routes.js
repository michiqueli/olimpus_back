const { Router } = require("express");
const router = Router();
const ReviewsControllers = require("../controllers/reviews.controllers");

router.get("/", ReviewsControllers.getAllReviews) //Trae Todas las Reviews (para AdminDashboard quiza)
router.post("/createReview", ReviewsControllers.createReview) //Crea una Review, se asocia al producto y al usuario
router.patch("/deleteReview/:id", ReviewsControllers.deleteReview) // desactiva una review pasa el estado isActive a False

/**
 * @swagger
 * components:
 *   schemas:
 *      getReviews:
 *          type: object
 *          propierties:
 *              id:
 *                  type: number
 *                  description: Id if the Review
 *              content:
 *                  type: text
 *                  description: Content of the description
 *              isActive:
 *                  type: boolean
 *                  description: indicates if the review is active or not
 *              rating:
 *                  type: number
 *                  description: Indicates the rating of the review in order of 1 to 5
 *              createdAt:
 *                  type: date
 *                  description: Date of creation of the review
 *              updatedAt:
 *                  type: date
 *                  description: Date of last update of the review
 *              userId:
 *                  type: string
 *                  description: Id of the user that make the review
 *              productId:
 *                  type: number
 *                  description: Id of the product of the review
 *          example:
 *              id: 1
 *              content: Pantalon super comodo, ideal para realizar ejercicio
 *              isActive: true
 *              rating: 4
 *              createdAt: 2023-12-26
 *              updateAt: 2023-12-26
 *              userId: bbtf87f4-sec6-4177-be68-9440ee3eb41b
 *              productId: 1
 *      postReview:
 *          type: object
 *          properties:
 *              content:
 *                  type: string
 *                  description: Content of the description
 *              rating:
 *                  type: number
 *                  description: Indicates the rating of the review in order of 1 to 5
 *              isActive:
 *                  type: boolean
 *                  description: indicates if the review is active or not 
 *              userId:
 *                  type: string
 *                  description: Id of the user that make the review
 *              productId:
 *                  type: number
 *                  description: Id of the product of the review   
 *          example:
 *              content: Pantalon super comodo, ideal para realizar ejercicio
 *              isActive: true
 *              rating: 4
 *              userId: bbtf87f4-sec6-4177-be68-9440ee3eb41b
 *              productId: 1
 *          required:
 *              - content
 *              - isActive
 *              - rating
 *              - userId
 *              - productId
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API para manejar Reviews
 * /reviews:
 *   get:
 *      summary: Get All Reviews from de DB
 *      tags: [Reviews]
 *      responses:
 *          '200':
 *              description: Successful response. Returns a list of Reviews.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getReviews'
 *          '500':
 *              description: Internal Server Error
 * /reviews/createReview:
 *   post:
 *      summary: Create a Review
 *      tags: [Reviews]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          content:
 *                              type: string
 *                          rating:
 *                              type: number
 *                          isActive:
 *                              type: boolean
 *                          userId:
 *                              type: string
 *                          productId:
 *                              type: number
 *      responses:
 *          '200':
 *              description: Successfull response. Return the created Review
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/postReview'
 *          '500':
 *              description: Internal server error
 * 
 */

module.exports = router;