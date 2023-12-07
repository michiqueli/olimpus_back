const UserModel = require('../models/Users');

const UserService = {
  getAllUsers: async () => {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching users');
    }
  },
  createUser: async (userData) => {
    try {
      const newUser = await UserModel.create(userData);
      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating user');
    }
  },  
};

module.exports = UserService;
