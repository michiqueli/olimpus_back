const loginServices = require('../services/login.services');
const { User } = require('../db/db')
require("dotenv").config();



const loginControllers = {
  loginFunction: async (req, res) => {
    const { email, password, googlePass } = req.body;
  
    try {
      let user;

      if (googlePass) {
        // Si es un inicio de sesión con Google
        user = await loginServices.addGooglePass(email, googlePass);
        if (!user) {
          throw new Error('Credenciales inválidas');
        }
      } else {
        // Si es un inicio de sesión local
        user = await loginServices.verifyLocalPassword(email, password);
      }

      // Generar token de sesión
      const token = await loginServices.tokenLogin(user);
      // Llama a la función para crear la cookie
      await loginServices.createCookie(res, token);

      res.status(200).json({ user:{ name: user.name, email: user.email, token: token }});

    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
    // Agrega una función para verificar el token de sesión
  verifyToken: async (req, res) => {
    const token = req.cookies.jwt;

    try {
      const decodedToken = loginServices.verifyTokenSession(token);
      res.status(200).json({ userId: decodedToken.userId, email: decodedToken.email });
    } catch (error) {
      res.status(401).json({ error: 'Token no válido' });
    }
  },
  getUserByToken: async (req, res) => {
    const token = req.params.token || req.query.token;
  
    try {
      if (!token) {
        throw new Error('Token no proporcionado');
      }
  
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decodedToken.userId);
  
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
  
      res.status(200).json({ usuario: user.name, email: user.email, id: user.id });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = loginControllers
