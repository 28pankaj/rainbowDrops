var myApp = angular.module('rainbowApp', ['ngAnimate', 'ui.bootstrap', 'ngRoute']);
myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    // set route for the home page
    .when('/', {
      controller: 'rainbowAppCtrl',
      templateUrl: 'templates/home.html'
    })
    .when('/viewAll/:id', {
      controller: 'rainbowAppCtrl',
      templateUrl: 'templates/viewAll.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

myApp.controller('rainbowAppCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$routeParams', function ($scope, $rootScope, $http, $timeout, $routeParams) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var currIndex = 0;
  $scope.slides = [{
      id: 1,
      image: 'images/slides/slide1.jpeg',
    },
    {
      image: 'images/slides/slide2.jpeg',
      text: 'Nice image',
      id: 2
    },
    {
      id: 3,
      image: 'images/slides/slide3.jpeg',
    },
    {
      id: 4,
      image: 'images/slides/slide4.png',
    },
    {
      id: 5,
      image: 'images/slides/slide5.jpeg',
    }
  ];

  $scope.products = [];
  $scope.selectedProduct = [];
  // console.log($routeParams.id);
  $http({
    method: 'GET',
    url: 'products.json'
  }).then(function (response) {
    $scope.products = response.data;
    $scope.selectedProduct = $scope.products[$routeParams.id];
  }, function (error) {
    console.log(status);
    console.log("Error occured")
  });
  $scope.selectedIndex = 0;
  $scope.getFilterData = function (data, i) {
    $scope.selectedIndex = i;
    $scope.selectedProduct = data;
  };

  $rootScope.invoice = {
    items: []
  };

  $scope.addItem = function (product) {
    $rootScope.invoice.items.push({
      id: product.id,
      qty: 1,
      name: product.name,
      image_url: product.image_url,
      description: product.description,
      mrp_price: product.mrp_price,
      disc_price: product.disc_price,
      reviews: product.reviews,
      no_orders: product.no_orders
    });
    // console.log($scope.invoice.items, product);
  };

  $scope.removeItem = function (index) {
    $rootScope.invoice.items.splice(index, 1);
  };

  $scope.total = function () {
    total = 0;
    angular.forEach($rootScope.invoice.items, function (item) {
      total += item.qty * item.disc_price;
    })
    return total;
  }
  $scope.gst = function () {
    gst = 0;
    gst = total * 18 / 100;
    return gst;
  };
  $scope.grandTotal = function () {
    grandTotal = 0;
    grandTotal = total + gst;
    return grandTotal;
  };
}]);