const { User } = require('../db/db');
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
// jwt y SK pueden ir en el .env mas adelante. 
const jwt = require('jsonwebtoken')
const secretKey =  'olimpus'
require('dotenv').config()

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
  getUserById: async (id) => {
    try {
      const response = await User.findByPk(id)

      if (!response) {
        return 'Cannot find the User ID'
      }
      return response
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching users')
    }
  },
  getUserByToken: async (token) => {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (!decodedToken.user) {
        throw new Error('Invalid token');
      }

      const user = await User.findByPk(decodedToken.user.id);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching user by token');
    }
  },
  getUserByEmail: async (email) => {
    try {
      const response = await User.findAll({
        where: {
          email: {
            [Op.iLike]: `%${email}%`
          }
        }
      })
      if(!response) {
        throw new Error ('User email not Found')
      }
      return response
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching user email')
    }
  },
  updateUser: async (id, updateData) => {
    try {
      const user = await User.findByPk(id)

      if(!user) {
        throw new Error (`Cannot update User with id: ${id} `)
      }

      const updatedUser = await user.update(updateData)

      return updatedUser
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching user')
    }
  },
  deleteUser: async(id) =>{
    try {
      const response = await User.findByPk(id)
      if (!response) {
        throw new Error ('User not found')
      }
      await response.update({ isActive: false })

      return 'User offline mode'

    } catch (error) {
      console.error(error)
      throw new Error('Error fetching user')
    }
  },
  register: async (name, email, password, street, zipCode, roleid) => {
    try {
      let passCript
      if(password.length >= 6) {
        passCript = bcrypt.hashSync(password, 10)
      } else {
        passCript = password
      }

      const user = await User.create({
        name,
        email,
        street,
        zipCode,
        roleid,
        password: passCript
      })

      if (user) {
        let token = jwt.sign({ user: user}, secretKey, {
          expiresIn: '24h'
        })
        return{
          user: user,
          token: token,
        }
      }

    } catch (error) {
      console.error(error);
      throw new Error('Error at creating user');
    }
  },
};

module.exports = UserServices;
