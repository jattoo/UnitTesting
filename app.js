const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const bodyParser = require('body-Parser')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


//TODO: Get some information on connection
logger.blogInfo('Connecting to the database')


//TODO: connect 
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology : true })
.then(() => {
    logger.blogInfo('Connection Established with MongoDB')
})
.catch(error => {
    logger.blogError('error connecting to MongoDB: ', error.message)
})

//Middlewares
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unKnownEndPoint)
app.use(middleware.errorHandler)


module.exports = app
