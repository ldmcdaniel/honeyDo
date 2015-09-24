var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  username: String,
  password: String,
  todo: [{group: String, task: String}]
});
