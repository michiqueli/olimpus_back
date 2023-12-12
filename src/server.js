const express = require("express");
const cookieParser = require("cookie-parser"); // agrego este middleware facilita el manejo de cookies en las solicitudes HTTP
const morgan = require("morgan"); // registro de eventos en solicitudes HTTP
const cors = require("cors"); // el cors de siempre, nada que aclarar, regula accesos a peticiones del servidor
const path = require('path');
const { BASE_URL, ACCESS_TOKEN } = process.env;

const server = express(); // cree la instancia de express para configurar las rutas y logica del server
const routes = require("./routes/router.js"); // importamos el archivo de rutas principal

require("./db/db.js");

server.use(cors()); // se habilita el cors
server.use(express.urlencoded({ extended: true, limit: "50mb" })); // esto configura el middleware para analizar las solicitudes con datos de formulario
server.use(express.json()); // analizo las solicitudes con datos JSON
server.use(cookieParser()); // lo mismo pero las cookies de las solicitudes
server.use(morgan("dev")); // imprime en consola los cambios en desarrollo
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
}); // aca no toquetié mucho la configuración de CORS, tengo que investigar mas si hace falta darle configuracion mas puntual.

server.use("/", routes); // ruta base va a ser '/' de lo que esté en routes

server.name = "API";

server.use((err, req, res, next) => {
  // este middleware captura los errores del servidor e imprime los detalles por consola, envia respuesta de error a cliente. es opcional.
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Olimpus Shop Docs',
            version: '1.0.0',  
        },
        servers: [
            {
                url: `${BASE_URL}`
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
};

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

module.exports = server;
