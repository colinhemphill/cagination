/* Requirements */
var mongoose = require('mongoose');
var async = require('async');

/* Defaults */
var defaults = {
  perPage: 25
};

/* Exports */
module.exports = {

  /*
   * Find mongoose documents given a set of options
   * and return paginated results.
   *
   * @param  {Object} model
   * @param  {Object} options
   * @return {Object}
   */
  find: function(model, params, fn) {

    if (!params.currentPage) {
      return fn('caginate err: current page not provided.', null, null, null);
    }

    var perPage;
    if (params.perPage) {
      perPage = params.perPage;
    } else {
      perPage = defaults.perPage;
    }

    async.parallel({

      // find the paginated documents in parallel
      findDocuments: function(callback) {
        model.find(params.options)
          .select(params.select)
          .populate(params.populate)
          .sort(params.sort)
          .skip((params.currentPage - 1) * perPage)
          .limit(perPage)

        .exec(function(err, documents) {
          if (err) {
            return callback(err, null);
          }

          return callback(null, documents);
        });
      },

      // count the total documents in parallerl
      countDocuments: function(callback) {

        model.count(params.options, function(err, count) {

          var totalPages = Math.ceil(count / perPage);

          return callback(null, {
            count: count,
            totalPages: totalPages
          });
        });
      }

    }, function(err, results) {
      if (err) {
        return fn(err, null, null, null);
      }
      return fn(null, results.findDocuments, results.countDocuments.count, results.countDocuments.totalPages);
    });
  }
};
