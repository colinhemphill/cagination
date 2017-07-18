[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url]

# Cagination

A Mongoose helper to simplify pagination on the back-end.

## Installation

Install via NPM:

```
npm install cagination --save
```

## Setup

Require the module:

```
var caginate = require('cagination');
```

If you want to set some global defaults, you can configure as follows:

```
caginate.configure({
  maxTime: 500 // defaults to `null`
});
```

All queries made with the module will follow this configuration.

## The Cage Rage Way

You can use Cagination as a nearly identical replacement for a Mongoose `find()` operation.

```
var currentPage = data.currentPage;
var perPage = data.perPage;
var options = {
    firstName: 'Nicolas'
};

caginate.find(Film, {
    options: options,
    select: 'name actorId',
    populate: {
        path: 'actorId',
        select: 'lastName'
    },
    sort: {
        name: -1
    },
    maxTime: 500,
    perPage: perPage,
    currentPage: currentPage
}).exec(function(err, films, count, totalPages) {
    // return films and totalPages
});
```

## Version History

- **1.0.0:** Module rewritten from scratch for better performance and configurability. Allows and defaults to a more efficient pagination method for larger data sets (using the document ids without a `skip` operation).
- **0.1.10:** Add `maxTime` option
- **0.1.9:** currentPage parse fix.
- **0.1.8:** Syntax bugfix.
- **0.1.7:** Dependency updates. Parse integers for limits and skips.
- **0.1.6:** Dependency updates
- **0.1.5:** Supports additional options on `find`, in a new field called `meta`
- **0.1.4:** Remove mongoose dependency. Update modules.
- **0.1.3:** Module updates and tests
- **0.1.2::** Added `lean` option
- **0.1.1:** Documentation
- **0.1.0:** Initial release

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/hemphillcc/cagination/blob/master/LICENSE
[npm-downloads-image]: http://img.shields.io/npm/dm/cagination.svg?style=flat-square
[npm-url]: https://npmjs.org/package/cagination
[npm-version-image]: http://img.shields.io/npm/v/cagination.svg?style=flat-square
[travis-image]: http://img.shields.io/travis/hemphillcc/cagination.svg?style=flat-square
[travis-url]: http://travis-ci.org/hemphillcc/cagination
