var should = require('chai').should();
var cagination = require('../cagination');
var test = cagination.test;

console.log('cagination');

describe('#test()', function() {
  it('adds a "!" to the input', function() {
    test('BombShelter').should.equal('BombShelter!');
  });
});
