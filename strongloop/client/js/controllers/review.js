angular
  .module('app')
  .controller('AllReviewsController', ['$scope', 'Review', function($scope,
      Review) {
    $scope.reviews = Review.find({
      filter: {
        include: [
          'coffeShop',
          'reviewer'
        ]
      }
    });
  }])
  .controller('AddReviewController', ['$scope', 'CoffeShop', 'Review',
      '$state', function($scope, CoffeShop, Review, $state) {
    $scope.action = 'Add';
    $scope.coffeShops = [];
    $scope.selectedShop;
    $scope.review = {};
    $scope.isDisabled = false;

    CoffeShop
      .find()
      .$promise
      .then(function(coffeShops) {
        $scope.coffeShops = coffeShops;
        $scope.selectedShop = $scope.selectedShop || coffeShops[0];
      });

    $scope.submitForm = function() {
      Review
        .create({
          rating: $scope.review.rating,
          comments: $scope.review.comments,
          coffeShopId: $scope.selectedShop.id
        })
        .$promise
        .then(function() {
          $state.go('all-reviews');
        });
    };
  }])
  .controller('DeleteReviewController', ['$scope', 'Review', '$state',
      '$stateParams', function($scope, Review, $state, $stateParams) {
    Review
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('my-reviews');
      });
  }])
  .controller('EditReviewController', ['$scope', '$q', 'CoffeShop', 'Review',
      '$stateParams', '$state', function($scope, $q, CoffeShop, Review,
      $stateParams, $state) {
    $scope.action = 'Edit';
    $scope.coffeShops = [];
    $scope.selectedShop;
    $scope.review = {};
    $scope.isDisabled = true;

    $q
      .all([
        CoffeShop.find().$promise,
        Review.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {
        var coffeShops = $scope.coffeShops = data[0];
        $scope.review = data[1];
        $scope.selectedShop;

        var selectedShopIndex = coffeShops
          .map(function(coffeShop) {
            return coffeShop.id;
          })
          .indexOf($scope.review.coffeShopId);
        $scope.selectedShop = coffeShops[selectedShopIndex];
      });

    $scope.submitForm = function() {
      $scope.review.coffeShopId = $scope.selectedShop.id;
      $scope.review
        .$save()
        .then(function(review) {
          $state.go('all-reviews');
        });
    };
  }])
  .controller('MyReviewsController', ['$scope', 'Review', '$rootScope',
      function($scope, Review, $rootScope) {
    $scope.reviews = Review.find({
      filter: {
        where: {
          publisherId: $rootScope.currentUser.id
        },
        include: [
          'coffeShop',
          'reviewer'
        ]
      }
    });
  }]);
