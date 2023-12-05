const express = require('express')
const server = express()
const routes = require('./routes/router.js')
const morgan = require('morgan')
const cors = require('cors')

server.use(express.json())
server.use(morgan('dev'))
server.use(cors())


server.use('/', routes)

server.name = 'API'

module.exports = server