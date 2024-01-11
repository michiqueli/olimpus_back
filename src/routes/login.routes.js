const { Router } = require("express");
const router = Router();
const loginControllers = require("../controllers/login.controller");

router.post("/", loginControllers.loginFunction);
router.get("/token/:token?", loginControllers.getUserByToken);

/**
 * @swagger
 * components:
 *   schemas:
 *      getUserWithId:
 *          type: object
 *          properties:
 *              usuario:
 *                  type: string
 *                  description: User Name and LastName
 *              email:
 *                  type: string
 *                  description: Email of the User
 *              id:
 *                  type: string
 *                  description: Id of the user in DataBase
 *          example:
 *              usuario: Nicolas Mennichelli
 *              email: michiqueli@gmail.com
 *              id: bb7f87f4-5ec6-4177-be68-9440ee3eb41b
 *      getUserWithToken:
 *          type: object
 *          properties:
 *              usuario:
 *                  type: string
 *                  description: User Name and LastName
 *              email:
 *                  type: string
 *                  description: Email of the User
 *              token:
 *                  type: string
 *                  description: Token of the user in DataBase
 *          example:
 *              usuario: Nicolas Mennichelli
 *              email: michiqueli@gmail.com
 *              token: bb7f87f4-5ec6-4177-be68-9440ee3eb41b
 */

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: API para manejar Logueos
 * 
 * /login:
 *   post:
 *      summary: Login function to access
 *      tags: [Login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          googlePass:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Successfull response. Return the User
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/getUserWithToken'
 *          '401':
 *              description: 'Credenciales Inválidas'
 * /login/token/{token}:
 *   get:
 *      summary: Get the searched user in the DB
 *      tags: [Login]
 *      parameters:
 *          -in: path
 *          name: token
 *          required: true
 *          schema:
 *              type: string
 *              description: token of the User
 *      responses:
 *          '200':
 *              description: Successfull response. Return de User with ID
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              $ref: '#/components/schemas/getUserWithId'
 *          '500':
 *              description: Internal server Error
 */

module.exports = router;
