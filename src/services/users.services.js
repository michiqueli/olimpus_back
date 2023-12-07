const { User } = require('../db/db');

const UserServices = {
  
  getAllUsers: async () => {
    try {
      const users = await User.findAll();

      if (users.length === 0 ) {
        return 'There are not users in the Data Base'
      }
      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching users');
    }
  },
  getUserById: async () => {
    try {
      
    } catch (error) {
      
    }
  },
  register: async (userData) => {
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
