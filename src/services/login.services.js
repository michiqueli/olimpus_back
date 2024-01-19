const { User } = require('../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require("dotenv").config();

const loginServices = {
    //!---------------Para implementar login de manera local-------------------------------------
     verifyLocalPassword: async (email, password) => {
         const user = await User.findOne({
           where: { email: email },
         });
         if (user.isActive === false) {
          throw new Error ('Tu Usuario a sido Baneado por favor contactate con un administrador')
         }
       
         if (!user) {
           throw new Error('Error de credenciales');
         }
       
         const isValidPassword = await bcrypt.compare(password, user.password);
         if (!isValidPassword) {
           throw new Error('Error de credenciales');
         }
       
         return user;
       },
 
     tokenLogin: async (user) => {
         const token = await jwt.sign({ user: user.id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION})
         return token
     },

     verifyTokenSession: async (token) => {
      try {
        return await jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        throw new Error('Token no válido');
      }
    },
    
     getUserByToken: async (token) => {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decodedToken.user);
        if (!user) {
          throw new Error('Usuario no encontrado');
        }
        return user;
      } catch (error) {
        throw new Error(`Error al verificar el token: ${error.message}`);
      }
    },
 //!---------------Para implementar login con Google-------------------------------------
     addGooglePass: async (email, googlePass) => {
       console.log(googlePass);
       try {
         const user = await User.findOne({
           where: {
             email: email,
           }
         });
         if (!user) {
           throw new Error('Usuario no autorizado');
         }
     
         if (googlePass && !user.googlePass) {
           const cryptGooglePass = await bcrypt.hash(googlePass, 10);
           user.googlePass = cryptGooglePass;
           await user.save();
         }
         console.log(user.dataValues);
         return user.dataValues;
       } catch (error) {
         throw new Error(error.message);
       }
     },
 //!---------------Para implementar que el usuario pueda ver su token dentro de las cookies-------------------------------------
   createCookie: (res, token) => {
     const cookieOptions = {
       httpOnly: true, // La cookie solo es accesible mediante el servidor
       expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), // Tiempo de expiración en milisegundos
       path: '/',
     };
 
     res.cookie('jwt', token, cookieOptions);
   },
 };
 
 module.exports = loginServices