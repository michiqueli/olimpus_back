require('dotenv').config()

const PORT = process.env.PORT || 3001

const server = require('./server');
const { conn } = require('./db/db');

require('./db/db');

conn.sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server raised in port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
