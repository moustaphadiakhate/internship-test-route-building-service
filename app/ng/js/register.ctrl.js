angular.module('app')
.controller('RegisterCtrl', function ($scope, HeroSvc, $location) {
  $scope.register = function (username, password) {
    UserSvc.register(username, password)
    .then(function (hero) {
      $location.path('/')
    })
  }
})
