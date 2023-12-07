const { User } = require('../db/db');

const UserServices = {
  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching users');
    }
  },
  createUser: async (userData) => {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating user');
    }
  },  
};

module.exports = UserServices;
