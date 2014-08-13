/* Requirements */
require('mongoose');

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
  find: function(model, options) {
    console.log(model, options);
    return true;
  }
};
