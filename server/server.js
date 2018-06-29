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

app.get('/prideEvent', (req, res) => {
  PrideEvent.find().then((prideEvents) => {
    console.log(res);
    res.send({prideEvents})
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

module.exports = {app};
