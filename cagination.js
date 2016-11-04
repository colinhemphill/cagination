/* Requirements */
var mongoose = require('mongoose');
var async = require('async');
var clc = require('cli-color');

var warn = clc.yellow;

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
      return fn('Caginate: you didn\'t provide the currentPage. I don\'t know where it went. I\'m confused!', null, null, null);
    }

    if (!params.populate) {
      params.populate = '';
    }

    var perPage, currentPage;
    if (params.perPage) {
      perPage = params.perPage;
    } else {
      perPage = defaults.perPage;
      console.log(warn('\nCaginate defaulting to 25 documents per page.\n'));
    }

    perPage = parseInt(perPage);
    currentPage = parseInt(params.currentPage);

    var lean = params.lean ? params.lean : false;

    async.parallel({

      // find the paginated documents in parallel
      findDocuments: function(callback) {
        model.find(params.options, params.meta)
          .select(params.select)
          .populate(params.populate)
          .sort(params.sort)
          .lean(lean)
          .skip((currentPage - 1) * perPage)
          .limit(perPage)

        .exec(function(err, documents) {
          if (err) {
            return callback(err, null);
          } else if (!documents) {
            return callback('Error finding paginated documents.', null);
          }

          return callback(null, documents);
        });
      },

      // count the total documents in parallel
      countDocuments: function(callback) {
        model.count(params.options, function(err, count) {
          if (err) {
            return callback(err, null);
          } else if (count == null || count == undefined) {
            return callback('Error counting total documents.', null);
          }

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