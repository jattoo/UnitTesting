const Blog = require('../models/blog')

//dummy testdb iniitializer
const initialBlogs = [
    {
        title: 'Dummy Blog one',
        author: 'admin',
        url: 'example.com',
        likes: 0,
        description: 'Dummy text for api testing'
    },
    {
        title: 'Dummy Blog api',
        author: 'admin',
        url: 'www.example.com',
        likes: 0,
        description: 'Dummy text for api testing with supertest'
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(allBlogs => allBlogs.toJSON())
}

module.exports={ initialBlogs, blogsInDb}