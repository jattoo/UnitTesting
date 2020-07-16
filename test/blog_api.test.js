const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')





beforeEach(async () => {
    /*await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    blogObject.save()*/

    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})
describe('testing our api', () => {
    test('all blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            //verify the format of the blogs returned
            .expect('Content-Type', /application\/json/)
    
        //verify the amount of blogs that are returned
        const allBlogs = await api.get('/api/blogs')
        expect(allBlogs.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('unique identifier exists', async () => {
        const blogObjects = await api.get('/api/blogs')
        //use map in the expect clause to find that id 
        //id fields are defined for all blogs 
        expect(blogObjects.body.map(ids => ids)).toBeDefined()
    })
    test('creating a new blog', async () => {
        const newBlog = {
            title: 'test for creating new blog',
            author: 'tester joe',
            url: 'example.com/test',
            likes: 100,
            description: 'Integration testing is just so amazing'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
        
        const currentBlogCount = await Blog.find({})
        expect(currentBlogCount).toHaveLength(helper.initialBlogs.length+1)
    })
    test('if no like field, then default to zero', async () => {
        const newBlog = {
            title: 'no like then take default',
            author: 'tester joe',
            url: 'example.com/like',
            description: 'Is there some likes'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const latestAddition = await Blog.find({title: 'no like then take default'})
        const totalikes = latestAddition.map(l => l.likes)
        expect(Number(totalikes)).toBe(0)
    })

    test('if title and url absent we get 400', async()=> {
        const newBlog = {
            likes: 0,
            author: 'tester joe',
            description: 'Is there some likes'
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe.only('functionality', () => {
    test('can delete a resource', async () => {
        const newBlog = {
            title: 'can you delete me?',
            author: 'tester joe',
            url: 'example.com/test',
            likes: 100,
            description: 'Integration testing is just so amazing'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const lastAddedBlog = await Blog.find({title: 'can you delete me?'})
        const id = lastAddedBlog.map(blog => blog.id)
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)
        
        const currentBlogs = await helper.blogsInDb()
        expect(currentBlogs).not.toContain(lastAddedBlog)
            
    })
    
})


afterAll(() => {
    mongoose.connection.close()
})