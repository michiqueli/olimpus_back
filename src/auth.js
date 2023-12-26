const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./db')

passport.use(new GoogleStrategy({
  clientID: '779460091956-dto2lti4gg62pd91juk9ck1lrs9khok2.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3001/google/callback',
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Buscar si el usuario ya existe en la base de datos por su correo electrónico
    const existingUser = await User.findOne({ where: { email: profile.emails[0].value } });

    if (existingUser) {
      // Si el usuario ya existe, simplemente llama a done con el usuario existente
      return done(null, existingUser);
    }

    // Si el usuario no existe, crea un nuevo usuario en la base de datos
    const newUser = await User.create({
      usuario: profile.displayName,
      email: profile.emails[0].value,
    });

    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return done(new Error('Usuario no encontrado'));
    }

    done(null, user);
    
  } catch (error) {
    done(error);
  }
});
  
