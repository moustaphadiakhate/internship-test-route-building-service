angular.module('app')
.controller('BusCtrl', function ($scope, BusSvc) {
  $scope.addBus = function () {
    var body = {
          nom: $scope.nom,
          ligne : $scope.ligne,
          depart: $scope.depart,
          points : $scope.points,
          terminus: $scope.terminus
          }
      BusSvc.create(
        body
      )
      .then(function () {
        $scope.nom = null
        $scope.ligne = null
        $scope.depart = null
        $scope.points = null
        $scope.terminus = null
      })
  }

  BusSvc.fetch()
  .then(function (bus) {
    $scope.posts = bus
  })
})
