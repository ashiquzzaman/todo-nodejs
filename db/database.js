var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect("mongodb://testuser:asdf12345678@ds229909.mlab.com:29909/todoapp");

module.exports = { mongoose };