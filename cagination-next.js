/* LIB */

const underscore = require('underscore');

/* CONSTRUCTOR */

(function () {

  var Cagination = {};

  /* PRIVATE VARIABLES */

  /* PUBLIC FUNCTIONS */

  Cagination.plugin = function (schema, options) {
    underscore.defaults(options, {
      currentPage: 1,
      perPage: 50
    });

    schema.methods.caginate = (conditions, projection, findOptions) => {
      const query = schema.find(conditions, projection, findOptions).limit(options.perPage);
    };
  };

  /* NPM EXPORT */

  if (typeof module === 'object' && module.exports) {
    module.exports = Cagination.plugin;
  } else {
    throw new Error('This module only works with NPM in NodeJS environments.');
  }

}());
