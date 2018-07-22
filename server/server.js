require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const routes = require('./routes/routes')

var {mongoose} = require('./db/mongoose');
var {PrideEvent} = require('./models/events');
var {User} = require('./models/user');


const port = process.env.PORT || 3000;

const app = express();

app.use('/api', routes);

app.use('/', express.static(__dirname + './../docs'));

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

module.exports = app;
