angular.module('app')
.config(function ($routeProvider) {
  $routeProvider
  .when('/',    { controller: 'LoginCtrl', templateUrl: '/ng/templates/login.html' })
  .when('/bus',         { controller: 'BusCtrl', templateUrl: '/ng/templates/bus.html' })
  .when('/register', { controller: 'RegisterCtrl', templateUrl: '/ng/templates/register.html' })
})
