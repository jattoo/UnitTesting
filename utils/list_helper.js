const dummy = (blogs) => {
    return typeof(blogs) === 'object' ? 1 : 0
}

const totalLikes = (blogs) => {
    const likes = (sum, item )=> {
        return sum + item
    }
  
    if(blogs.length < 1){
        return 0
    } else if(blogs.length === 1){
        return Number(blogs.map(blog => blog.likes))
    } else {
        const allLikes = blogs.map(blog => blog.likes)

        return allLikes.reduce(likes, 0)
    }
}

const findFavouriteBlog = (blogs) => {
    let amount = 0
    let favoriteBlog 
    blogs.map(blog => {
        if(blog.likes > amount){
            favoriteBlog = blog
            amount = blog.likes
            if(blog.likes > amount){
                favoriteBlog = blog
                
            } else {
                favoriteBlog
            }
        }
    })
    const newBlog = {
        'title': favoriteBlog.title,
        'author': favoriteBlog.author,
        'likes' : favoriteBlog.likes
    }
    return newBlog
}

const mostBlogs = (blogs) => {
    let mchan = 0
    let edsger = 0
    let rc  = 0


    blogs.map(blog => {
        if(blog.author === 'Michael Chan'){
            mchan += 1
        } else if (blog.author === 'Edsger W. Dijkstra'){
            edsger += 1
        } else if (blog.author === 'Robert C. Martin') {
            rc += 1
        }
    
    })
    let favouriteAuthor
    if((mchan > edsger) && (mchan > rc)){
        favouriteAuthor = {
            'author': 'Micheal Chan',
            'blogs': mchan
        }
    } else if((edsger > mchan) && (edsger > rc)){
        favouriteAuthor = {
            'author': 'Edsger W. Dijkstra',
            'blogs': edsger
        }
    } else{
        favouriteAuthor = {
            'author': 'Robert C. Martin',
            'blogs': rc
        }
    }

    return favouriteAuthor
}

const mostLikes = (blogs) => {
    let mchan = 0
    let edsger = 0
    let rc  = 0


    blogs.map(blog => {
        if(blog.author === 'Michael Chan'){
            mchan += blog.likes
        } else if (blog.author === 'Edsger W. Dijkstra'){
            edsger += blog.likes
        } else if (blog.author === 'Robert C. Martin') {
            rc += blog.likes
        }
    
    })
    let favouriteLikedAuthor
    if((mchan > edsger) && (mchan > rc)){
        favouriteLikedAuthor = {
            'author': 'Micheal Chan',
            'likes': mchan
        }
    } else if((edsger > mchan) && (edsger > rc)){
        favouriteLikedAuthor = {
            'author': 'Edsger W. Dijkstra',
            'likes': edsger
        }
    } else{
        favouriteLikedAuthor = {
            'author': 'Robert C. Martin',
            'likes': rc
        }
    }

    return favouriteLikedAuthor
}

module.exports = { dummy, totalLikes, findFavouriteBlog, mostBlogs, mostLikes }