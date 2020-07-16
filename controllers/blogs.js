const blogRouter = require('express').Router()
const Blog = require('./../models/blog')


//TODO: retrieve all blogs
blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }  
  
  })
  
  //TODO: Get an individual resource
  blogRouter.get('/:id', async (req, res, next) => {
    try {
      const blogs = await Blog.findById(req.params.id)
      if(blogs){
        res.json(blogs)
      } else {
        res.status(404).end()
      }
    } catch (exception) {
      next(exception)
    }
    
  })


  //TODO: add a new blog
  blogRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body)
    
    try {
      const blogToSave = await blog.save()
      res.json(blogToSave)
    } catch (exception) {
      next(res.status(400))
    }
    
  })
  
  //TODO: update a blog
  blogRouter.put('/:id', async (req,res, next) => {
    const body = req.body
    
    const blog = {
      title : body.title,
      author: body.author,
      url: body.url,
      description: body.description,
      likes: body.likes
    }
  
    try {
      const blogToUpdate = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
      res.json(blogToUpdate.toJSON())
    } catch (exception) {
      next(exception)
    }
    
  })
  
  
  //TODO: delete a blog
  blogRouter.delete('/:id', async (req, res, next) => {
    try {
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    } catch (exception) {
      next(exception)
    }
  })

  module.exports = blogRouter