require('dotenv').config()

const PORT = process.env.PORT || 3001

const server = require('./src/server');
const { conn } = require('./src/db/db');

require('./src/db/db');

conn.sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server raised in port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
