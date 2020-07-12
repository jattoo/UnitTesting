const mongoose = require('mongoose')
//handle deprecation
mongoose.set('useFindAndModify', false)



const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        required: true
    },
    author: {
        type: String,
        minlength: 4,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minlength: 15,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    }
  })
  
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)