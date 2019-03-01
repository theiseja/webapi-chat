// Express router boilerplate

const express = require('express');

const Hubs = require('./hubs-model.js');

const router = express.Router();

// localhost:9090/api/hubs

router.get('/', async (req, res) => {
    try {
      const hub = await Hubs.findById(req.params.id);
  
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    }
  });
  
  router.post('/api/hubs', async (req, res) => {
    try {
      const hub = await Hubs.add(req.body);
      res.status(201).json(hub);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    }
  });
  
  router.delete('/api/hubs/:id', async (req, res) => {
    try {
      const count = await Hubs.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    }
  });
  
  router.put('/api/hubs/:id', async (req, res) => {
    try {
      const hub = await Hubs.update(req.params.id, req.body);
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    }
  });
  
  // add an endpoint that returns all the messages for a hub
  // add an endpoint for adding new message to a hub
  
 router.get('/:id/messages', async (req, res) => {
     const { id } = req.params;

     try {
         const hub = await Hubs.findById(id);

         if (hub) {
             const messages = await 
             Hubs.findHubMessages(id)
             res.json(messages);

         } else {
             res.status(400).json({err: 'Invalid hub id'});
         }
     } catch (e) {
         res.status(500).json({err: e});
     }
 });

 // add an endpoint for adding new message to a hub
 router.post('/:id/messages', async (req, res) => {
    const newMessage = { ...req.body, hub_id: req.params.id };
    console.log(req.body);
    console.log(req.params);
  
    try {
      const message = await Hubs.addMessage(newMessage);
      res.status(210).json(message);
    } catch (e) {
      // log error to database
      console.log(e);
      res.status(500).json({
        message: 'Error getting the messages for the hub',
      });
    }
  });

module.exports = router;