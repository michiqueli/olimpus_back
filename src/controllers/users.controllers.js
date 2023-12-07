const UserService = require('../services/users.services.js');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = req.body; // esto esta sujeto a cambiarlo, no hay destructuring de nada, trae todo
      const newUser = await UserService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = UserController;
