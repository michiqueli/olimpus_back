const UserServices = require('../services/users.services.js');

const UserControllers = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserServices.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = req.body; // esto esta sujeto a cambiarlo, no hay destructuring de nada, trae todo
      const newUser = await UserServices.register(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = UserControllers;
