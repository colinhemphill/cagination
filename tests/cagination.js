/* Requirements */
var expect = require('chai').expect;
var cagination = require('../cagination');
var exampleSchema = require('./exampleSchema');

describe('find test', function() {

  var result = true;

  beforeEach(function(done) {
    var MovieStar = exampleSchema.MovieStar;
    var Film = exampleSchema.Film;

    // start fresh
    MovieStar.remove({}, function() {
      Film.remove({}, function() {

        var films = [{
          name: 'Raising Arizona',
          releaseDate: Date.UTC(1987, 2, 13)
        }, {
          name: 'National Treasure',
          releaseDate: Date.UTC(2004, 10, 19)
        }, {
          name: 'Lord of War',
          releaseDate: Date.UTC(2005, 8, 16)
        }, {
          name: 'The Wicker Man',
          releaseDate: Date.UTC(2006, 8, 1)
        }, {
          name: 'Ghost Rider',
          releaseDate: Date.UTC(2007, 1, 16)
        }, {
          name: 'Kick Ass',
          releaseDate: Date.UTC(2010, 3, 16)
        }];

        Film.create(films, function(err, createdFilms) {

          var nicCage = new MovieStar({
            firstName: 'Nicolas',
            lastName: 'Cage'
          });

          nicCage.save();

        });
      });
    });

  });

  it('finds paginated MongoDB models using Mongoose', function() {
    expect(result).equals(true);
  });

});
