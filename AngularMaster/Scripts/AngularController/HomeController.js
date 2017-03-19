angular.module('app').controller('HomeController', function ($scope, ContactService) {

    $scope.Apartments = null;
    ContactService.GetApartments().then(function (d) {
        $scope.Apartments = d.data; 
    }, function () {
        alert('Failed'); 
    })

})
.factory('ContactService', function ($http) {
    var fac = {};
    fac.GetApartments = function () {
        return $http.get('http://localhost:8090/api/values');
    }
    return fac;
})