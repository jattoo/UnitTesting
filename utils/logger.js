const blogInfo = (...params) => {
    if(process.env.NODE_ENV !== 'test'){
        console.log(...params)
    }
}
const blogError = (...params) => {
    console.log(...params)
}

module.exports = {
    blogInfo, blogError
}