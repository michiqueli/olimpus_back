const { Router } = require('express');
const router = Router();
const UserControllers = require('../controllers/users.controllers');

// Endpoint para obtener todos los usuarios
router.post('/register', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/email', UserControllers.getUserByEmail);
router.get('/:id', UserControllers.getUserById);
router.get('/token/:token', UserControllers.getUserByToken);
router.delete('/delete/:id', UserControllers.deleteUser);
router.patch('/activate/:id', UserControllers.activateUser);
router.patch('/update/:id', UserControllers.updateUser);

/**
 * @swagger
 * components:
 *   schemas:
 *      getUser:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: Id of the User
 *              name:
 *                  type: string
 *                  description: Name of the User
 *              email:
 *                  type: string
 *                  description: Email of the User
 *              password:
 *                  type: string
 *                  description: password of the User
 *              street:
 *                  type: string
 *                  description: Street of the User
 *              zipCode:
 *                  type: string
 *                  description: Zip Code of the User
 *              roleid:
 *                  type: number
 *                  description: Rol of the user 1-superadmin 2-admin 3-buyer
 *              isActive:
 *                  type: boolean
 *                  description: Indicates if the User is Active or Not
 *              googlePass:
 *                  type: string
 *                  description: GooglePass of the User
 *          example:
 *              id: asdasdasdasdasdasd
 *              name: Ricardo Rojas
 *              email: ejemplo@mail.com
 *              password: passwordexample1234
 *              street: Mi calle 1234
 *              zipCode: 3400
 *              roleid: 3
 *              isActive: true
 *              googlePass: asdasdasdasdads891238749132sadasdasdasd
 *      postUser:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Name of the User
 *              email:
 *                  type: string
 *                  description: Email of the User
 *              password:
 *                  type: string
 *                  description: password of the User
 *              street:
 *                  type: string
 *                  description: Street of the User
 *              zipCode:
 *                  type: string
 *                  description: Zip Code of the User
 *          example:
 *              name: Ricardo Rojas
 *              email: ejemplo@mail.com
 *              password: passwordexample1234
 *              street: Mi calle 1234
 *              zipCode: 3400
 *              roleid: 3
 *              isActive: true
 *              googlePass: asdasdasdasdads891238749132sadasdasdasd
 *          required:
 *              - name
 *              - email
 *              - password
 *              - street
 *              - zipCode
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para manejar Usuarios
 *
 * /users:
 *   get:
 *      summary: Get All Users from the DB
 *      tags: [Users]
 *      responses:
 *          '200':
 *              description: Successful response. Return a list of users.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getUser'
 *          '500':
 *              description: Internal Server Error
 *
 *   
 * /users/register:
 *   post:
 *      summary: Create an User
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          street:
 *                              type: string
 *                          zipCode:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Successful response. Returns the created User
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getUser'
 *          '500':
 *              description: Internal Server Error
 * /users/email?email={userEmail}:
 *   get:
 *      summary: Get User By Email from the DB
 *      tags: [Users]
 *      parameters:
 *         - in: path
 *           name: userEmail
 *           required: true
 *           schema:
 *              type: string
 *           description: Email to Search in the emails of the users of DB
 *      responses:
 *          '200':
 *              description: Successful response. Returns a list of users white the params in theirs emails.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getUser'
 *          '500':
 *              description: Internal Server Error
 * 
 * /users/{userId}:
 *   get:
 *      summary: Get User By ID from the DB
 *      tags: [Users]
 *      parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *              type: string
 *           description: ID to Search in the ID of the users of DB
 *      responses:
 *          '200':
 *              description: Successful response. Returns a User with that ID.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getUser'
 *          '500':
 *              description: Internal Server Error
 * 
 * /users/token/{userToken}:
 *   get:
 *      summary: Get User By Token from the DB
 *      tags: [Users]
 *      parameters:
 *         - in: path
 *           name: userToken
 *           required: true
 *           schema:
 *              type: string
 *           description: Token to Search in the Tokens of the users of DB
 *      responses:
 *          '200':
 *              description: Successful response. Returns a User with that Token.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getUser'
 *          '500':
 *              description: Internal Server Error
 * 
 * /users/delete/{userId}:
 *   delete:
 *      summary: Desactive One User from the DB
 *      tags: [Users]
 *      parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *              type: string
 *           description: ID of the User you want to Desactive
 *      responses:
 *          '200':
 *              description: Successful response. "El Usuario esta ahora deshabilitado".
 *          '500':
 *              description: Internal Server Error
 * 
 * /users/update/{userId}:
 *   patch:
 *      summary: Update an User
 *      tags: [Users]
 *      parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *              type: string
 *           description: Id of the User to update
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          street:
 *                              type: string
 *                          zipCode:
 *                              type: string
 *                          isActive:
 *                              type: boolean
 *      responses:
 *          '200':
 *              description: Successful response. Returns the Updated User
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getUser'
 *          '500':
 *              description: Internal Server Error
 */

module.exports = router;
