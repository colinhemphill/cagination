/* Requirements */
require('mongoose');
require('async');

/* Defaults */
var currentPage = 1;
var perPage = 25;

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

    model.find(params.options)
      .select(params.select)
      .populate(params.populate)
      .sort(params.sort)

    .exec(function(err, documents) {
      if (err) {
        return fn(err, null, null, null);
      }

      return fn(null, documents, 0, 0);
    });

    return true;
  }
};
