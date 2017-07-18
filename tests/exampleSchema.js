const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/cagination_test_db', function (err) {
  if (err) throw err;
});

const cagination = require('../cagination');

mongoose.plugin(cagination);

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
