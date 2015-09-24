    // set up ========================
    var express         = require('express'),
        app             = express(),
        mongoose        = require('mongoose'),
        morgan          = require('morgan'),
        bodyParser      = require('body-parser'),
        methodOverride  = require('method-override'),
        database        = require('./lib/mongodb');

    // configuration =================

    mongoose.connect(database.url);

    app
      .use(morgan('dev'))
      .use(bodyParser.urlencoded({'extended':'true'}))
      .use(bodyParser.json())
      .use(bodyParser.json({ type: 'application/vnd.api+json' }))
      .use(methodOverride());

    var User = mongoose.model('User', {
      username: String,
      password: String,
      todo: [{group: String, task: String}]
    });

    app
      .get('/api/todos', function(req, res) {
        User.find(function(err, todos) {
          if (err) throw err
          res.json(todos);
        });
      })

      .post('/api/todos', function(req, res) {
        console.log(req.body.todo);
        User.create({
          todo: req.body.todo
        }, function(err, todo) {
            if (err) throw err
          User.find(function(err, todos) {
            if (err) throw err
            res.json(todos);
          });
        });
      })

      .delete('/api/todos/:todo_id', function(req, res) {
        User.remove({
          _id : req.params.todo_id
        }, function(err, todo) {
          if (err) throw err
          User.find(function(err, todos) {
            if (err) throw err
            res.json(todos);
          });
        });
      })

      .listen(8080);

