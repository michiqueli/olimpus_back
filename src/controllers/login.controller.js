const loginServices = require('../services/login.services');

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
      const token = loginServices.tokenLogin(user);

      // Llama a la función para crear la cookie
      loginServices.createCookie(res, token);

      res.status(200).json({ usuario: user.name, email: user.email, token: token });

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
  }
}

module.exports = loginControllers