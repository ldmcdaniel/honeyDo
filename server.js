// set up ========================
var express         = require('express'),
    app             = express(),
    morgan          = require('morgan'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    database        = require('./lib/mongodb');

// database configuration ========

app
  .use(morgan('dev'))
  .use(bodyParser.urlencoded({'extended':'true'}))
  .use(bodyParser.json())
  .use(bodyParser.json({ type: 'application/vnd.api+json' }))
  .use(methodOverride());

mongoose.connect(database.url);
require('./routes/routes')(app);

  app.listen(process.env.PORT || 8080);

