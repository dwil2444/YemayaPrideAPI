require('./config/config.js');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {PrideEvent} = require('./models/events');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.get('/PrideEvent', (req, res) => {
  PrideEvent.find().then((prideEvent) => {
    res.send({prideEvent})
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/PrideEvent', (req, res) =>{
  var event = new PrideEvent({
    name: req.body.name
  });
  event.save().then((doc) => {
    res.status(200).send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

module.exports = {app};
