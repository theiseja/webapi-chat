const express = require('express');

const HubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json()); // comes before router
server.use('/api/hubs', HubsRouter); // has to be after express.json

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});





module.exports = server;