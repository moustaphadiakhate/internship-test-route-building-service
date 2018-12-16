angular.module('app')
.service('BusSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/bus')
    .then(function (response) {
      return response.data
    })
  }
  this.create = function (bus) {
    return $http.post('/api/bus', bus)
  }
})
