const logger = require('./logger')
const blogRouter = require('../controllers/blogs')

const requestLogger = (req, res, next) => {
    logger.blogInfo('Method: ',req.method)
    logger.blogInfo('Path: ', req.path)
    logger.blogInfo('Body: ', req.body)
    logger.blogInfo('-----------------')
    next()
}

const unKnownEndPoint = (req, res) => {
    res.status(404).send({ error: 'This is an unknown Endpoint/Url'})
}


//error handler middleware
const errorHandler = (error, req, res, next) => {
    if(error.name === 'CastError'){
      return res.status(400).send({ error: "the id is malformatted"})
    }
    next(error)
  }
  
  
  //error handler into use here
  module.exports= { requestLogger, unKnownEndPoint, errorHandler }