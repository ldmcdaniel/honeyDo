var User = require('../models/todo');

module.exports = function (app) {

    app.get('/api/todos', function(req, res) {
      User.find(function(err, todos) {
        if (err) throw err
        res.json(todos);
      });
    });

    app.post('/api/todos', function(req, res) {
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

    app.delete('/api/todos/:todo_id', function(req, res) {
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
}
