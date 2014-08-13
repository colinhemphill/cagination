var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/cagination_test_db');
var db = mongoose.connection;

exports.Actor = mongoose.model('Actor', new Schema({
  updatedAt: {
    type: Date,
    default: Date.now
  },
  firstName: String,
  lastName: String
}));

exports.Film = mongoose.model('Film', new Schema({
  updatedAt: {
    type: Date,
    default: Date.now
  },
  actorId: {
    type: Schema.ObjectId,
    ref: 'Actor'
  },
  name: String,
  releaseDate: Date
}));
