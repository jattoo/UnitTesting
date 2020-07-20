const blogRouter = require('express').Router()
const Blog = require('./../models/blog')


//TODO: retrieve all blogs
blogRouter.get('/', async (req, res ) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
  })
  
  //TODO: Get an individual resource
  blogRouter.get('/:id', async (req, res ) => {
      const blogs = await Blog.findById(req.params.id)
      if(blogs){
        res.json(blogs)
      } else {
        res.status(404).end()
      }
  })


  //TODO: add a new blog
  blogRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body)
      const blogToSave = await blog.save()
      .catch(error =>  next(res.status(400)))
      res.json(blogToSave)
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
    const blogToUpdate = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.json(blogToUpdate.toJSON())
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
  