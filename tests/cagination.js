/* Requirements */
var expect = require('chai').expect;
var cagination = require('../cagination');
var exampleSchema = require('./exampleSchema');

describe('find test', function() {

  var result = false;

  beforeEach(function(done) {
    var Actor = exampleSchema.Actor;
    var Film = exampleSchema.Film;

    // start fresh
    Actor.remove({}, function() {
      Film.remove({}, function() {

        var nicCage = new Actor({
          firstName: 'Nicolas',
          lastName: 'Cage'
        });

        nicCage.save(function(err) {
          var films = getFilms(nicCage._id);
          Film.create(films, function(err, createdFilms) {
            cagination.find(Film, {
              options: {
                actorId: nicCage._id
              },
              select: 'name actorId',
              populate: {
                path: 'actorId',
                select: 'lastName'
              },
              sort: {
                name: 1
              },
              currentPage: 1
            }, function(err, films, count, totalPages) {
              if (err) {
                result = false;
              } else if (films && count && totalPages) {
                result = true;
              }
              done();
            });
          });
        });
      });
    });
  });

  it('finds paginated MongoDB models using Mongoose', function() {
    expect(result).equals(true);
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
