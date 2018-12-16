angular.module('app')
.controller('LoginCtrl', function ($scope, HeroSvc, $location) {
  $scope.login = function (username, password) {
    UserSvc.login(username, password)
    .then(function (hero) {
      $location.path('/')
    })
  }
})
