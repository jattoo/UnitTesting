const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')



//create our server to serve our files
const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})