Cagination
==========
A Mongoose plugin to simplify the pagination process.

Use Case
--------
    var currentPage = data.currentPage;
    var perPage = data.perPage;
    var options = {
        actorId: nicCage._id
    };

    Film.find(options).select('name actorId').populate({
        path: 'actorId',
        select: 'lastName'
    }).sort({
        name: -1
    }).skip((currentPage - 1) * perPage).limit(perPage).exec(function(err, stars) {
        Film.count(options).exec(function(err, count) {
            var totalPages = Math.ceil(count / perPage);
            // return stars and totalPages
        });
    });

    
NOT THE PAGES! NOT THE PAGES! AGWHGHAHGHAA THEY'RE CLOGGING MY CODE!
    
Of course this is quite a mess, and painful to rewrite for each query you need paginated. Although the .count() procedure is pretty quick, to make this really efficient, you would need to also utilize the async module and perform that operation in parallel with the find(). But then you have a real disaster on your hands for such a simple task.

The Cage Rage
-------------
Caginate aims to be robust but reproducible. Like your standard find() query, Caginate can accept the same options for select, populate, and sort. However, Caginate handles all of the bothersome math and manual skipping/limiting needed to get a paginated return. Additionally, it asynchronously grabs the total document count in order to provide you with the total number of pages.

    var currentPage = data.currentPage;
    var perPage = data.perPage;
    var options = {
        firstName: 'Nicolas'
    };

    caginate(Film, {
        options: options,
        select: 'name actorId',
        populate: {
            path: 'actorId',
            select: 'lastName'
        },
        sort: {
            name: -1
        },
        perPage: perPage,
        currentPage: currentPage
    }).exec(function(err, stars, count, totalPages) {
        // return stars and totalPages
    });

Setup and Options
-----------------
Make sure to add:

    require('caginate');
    
and you should be set.
