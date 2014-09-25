/* Requirements */
var expect = require('chai').expect;
var cagination = require('../cagination');
var exampleSchema = require('./exampleSchema');
var clc = require('cli-color');

var error = clc.red;

describe('find test', function() {

  var Actor = exampleSchema.Actor;
  var Film = exampleSchema.Film;

  var nicCage = new Actor({
    firstName: 'Nicolas',
    lastName: 'Cage'
  });

  var options = {
    actorId: nicCage._id
  };
  var selectOptions = 'name actorId';
  var populateOptions = {
    path: 'actorId',
    select: 'lastName'
  };
  var sortOptions = {
    name: 1
  };

  // start with fresh database
  before(function(done) {
    Actor.remove({}, function() {
      Film.remove({}, function() {
        nicCage.save(function(err) {
          var films = getFilms(nicCage._id);
          Film.create(films, function(err, createdFilms) {
            done();
          });
        });
      });
    });
  });

  // test 1st page
  it('Get page 1 of results given 2 per page', function() {
    var result = false;

    cagination.find(Film, {
      options: options,
      select: selectOptions,
      populate: populateOptions,
      sort: sortOptions,
      perPage: 2,
      lean: true,
      currentPage: 1
    }, function(err, films, count, totalPages) {
      console.log(films, count, totalPages);
      if (err) {
        console.log(error(err.toString()));
        result = false;
      } else if (films && count && totalPages) {
        result = true;
      }
      expect(result).equals(true);
    });
  });

  // test 2nd page
  it('Get page 2 of results given 2 per page', function() {
    var result = false;

    cagination.find(Film, {
      options: options,
      select: selectOptions,
      populate: populateOptions,
      sort: sortOptions,
      perPage: 2,
      currentPage: 2
    }, function(err, films, count, totalPages) {
      console.log(films, count, totalPages);
      if (err) {
        console.log(error(err.toString()));
        result = false;
      } else if (films && count && totalPages) {
        result = true;
      }
      expect(result).equals(true);
    });
  });

  // test 3rd page
  it('Get page 3 of results given 2 per page', function() {
    var result = false;

    cagination.find(Film, {
      options: options,
      select: selectOptions,
      populate: populateOptions,
      sort: sortOptions,
      perPage: 2,
      currentPage: 3
    }, function(err, films, count, totalPages) {
      console.log(films, count, totalPages);
      if (err) {
        console.log(error(err.toString()));
        result = false;
      } else if (films && count && totalPages) {
        result = true;
      }
      expect(result).equals(true);
    });
  });

  // test 4th page
  it('Get page 4 of results given 2 per page', function() {
    var result = false;

    cagination.find(Film, {
      options: options,
      select: selectOptions,
      populate: populateOptions,
      sort: sortOptions,
      perPage: 2,
      currentPage: 4
    }, function(err, films, count, totalPages) {
      console.log(films, count, totalPages);
      if (err) {
        console.log(error(err.toString()));
        result = false;
      } else if (films && count && totalPages) {
        result = true;
      }
      expect(result).equals(true);
    });
  });

});


function getFilms(actorId) {
  var films = [{
    name: 'Raising Arizona',
    releaseDate: Date.UTC(1987, 2, 13),
    actorId: actorId
  }, {
    name: 'National Treasure',
    releaseDate: Date.UTC(2004, 10, 19),
    actorId: actorId
  }, {
    name: 'Lord of War',
    releaseDate: Date.UTC(2005, 8, 16),
    actorId: actorId
  }, {
    name: 'The Wicker Man',
    releaseDate: Date.UTC(2006, 8, 1),
    actorId: actorId
  }, {
    name: 'Ghost Rider',
    releaseDate: Date.UTC(2007, 1, 16),
    actorId: actorId
  }, {
    name: 'Kick Ass',
    releaseDate: Date.UTC(2010, 3, 16),
    actorId: actorId
  }];
  return films;
}
