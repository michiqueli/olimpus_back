const port = process.env.PORT || 3001;

const server = require('./src/server');
const { conn } = require('./src/db');

require('./src/db');

conn.sync({ force: false })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server raised in port: ` + port);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });