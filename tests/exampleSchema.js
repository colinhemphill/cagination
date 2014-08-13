var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/cagination_test_db');
var db = mongoose.connection;

exports.MovieStar = mongoose.model('MovieStar', new Schema({
  updatedAt: {
    type: Date,
    default: Date.now
  },
  firstName: String,
  lastName: String,
  films: [{
    type: Schema.ObjectId,
    ref: 'Film'
  }]
}));

exports.Film = mongoose.model('Film', new Schema({
  updatedAt: {
    type: Date,
    default: Date.now
  },
  name: String,
  releaseDate: Date
}));
