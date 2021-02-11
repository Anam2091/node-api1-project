// BUILD YOUR SERVER HERE

const express = require('express')
const port = 3000;

const server = express()
// middleware
server.use(express.json());
server.use(express.urlencoded());

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
