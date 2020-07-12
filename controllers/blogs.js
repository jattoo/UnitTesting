const blogRouter = require('express').Router()
const Blog = require('./../models/blog')


//TODO: retrieve all blogs
blogRouter.get('/', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => next(error))
  })
  
  //TODO: Get an individual resource
  blogRouter.get('/:id', (req, res, next) => {
    
    Blog
      .findById(req.params.id)
      .then(foundBlog => {
        res.json(foundBlog.toJSON())
      })
      .catch(error => next(error.message))
  })


  //TODO: add a new blog
  blogRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body)
  
    blog
      .save()
      .then(savedBlog => {
        res.json(savedBlog.toJSON())
      })
      //changed to 400 for validation in tests
      .catch(error => next(res.status(400)))
  })
  
  //TODO: update a blog
  blogRouter.put('/:id', (req,res, next) => {
    const blogToUpdate = {
      title : req.body.title,
      author: req.body.author,
      url: req.body.url,
      description: req.body.description,
      likes: req.body.likes
    }
  
    Blog
      .findByIdAndUpdate(req.params.id, blogToUpdate, { new: true})
      .then(upDatedBlog => {
        res.json(upDatedBlog.toJSON())
      })
      .catch(error => next(error))
  })
  
  
  //TODO: delete a blog
  blogRouter.delete('/:id', (req, res, next) => {
    Blog
      .findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).end()
      })
      .catch(error => next(error))
  })

  module.exports = blogRouter