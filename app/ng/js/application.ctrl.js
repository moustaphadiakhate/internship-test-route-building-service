angular.module('app')
.controller('ApplicationCtrl', function ($scope) {
  $scope.$on('login', function (_, hero) {
    $scope.SessionHero = hero
  })
})
