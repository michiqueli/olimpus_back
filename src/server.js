const express = require('express')
const cookieParser = require('cookie-parser');
const server = express()
const routes = require('./routes/router.js')
const morgan = require('morgan')
const cors = require('cors')

require('./db/db.js')

server.use(cors())
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json())
server.use(cookieParser());
server.use(morgan('dev'))
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
  });


server.use('/', routes)

server.name = 'API'

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
  });

module.exports = server