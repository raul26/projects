var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mongoIDS;
  //create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    coffeShops: async.apply(createCoffeShops),
  }, function(err, results) {
    if (err) throw err;
    createReviews(results.reviewers, results.coffeShops, function(err) {
      console.log('> models created sucessfully');
    });
  });
  //create reviewers
  function createReviewers(cb) {
    mongoDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.Reviewer;
      Reviewer.create([
        {email: 'foo@bar.com', password: 'foobar'},
        {email: 'john@doe.com', password: 'johndoe'},
        {email: 'jane@doe.com', password: 'janedoe'}
      ], cb);
    });
  }
  //create coffee shops
  function createCoffeShops(cb) {
    mongoDs.automigrate('CoffeShop', function(err) {
      if (err) return cb(err);
      var CoffeShop = app.models.CoffeShop;
      CoffeShop.create([
        {name: 'Bel Cafe', city: 'Vancouver'},
        {name: 'Three Bees Coffee House', city: 'San Mateo'},
        {name: 'Caffe Artigiano', city: 'Vancouver'},
      ], cb);
    });
  }
  //create reviews
  function createReviews(reviewers, coffeShops, cb) {
    mongoDs.automigrate('Review', function(err) {
      if (err) return cb(err);
      var Review = app.models.Review;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Review.create([
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 4),
          rating: 5,
          comments: 'A very good coffee shop.',
          publisherId: reviewers[0].id,
          coffeShopId: coffeShops[0].id,
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 3),
          rating: 5,
          comments: 'Quite pleasant.',
          publisherId: reviewers[1].id,
          coffeShopId: coffeShops[0].id,
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 2),
          rating: 4,
          comments: 'It was ok.',
          publisherId: reviewers[1].id,
          coffeShopId: coffeShops[1].id,
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS),
          rating: 4,
          comments: 'I go here everyday.',
          publisherId: reviewers[2].id,
          coffeShopId: coffeShops[2].id,
        }
      ], cb);
    });
  }
};
