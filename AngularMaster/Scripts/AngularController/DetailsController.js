angular.module('app').controller('DetailsController', function ($scope, DetailsService, $routeParams) {

    $scope.Details = null;
    DetailsService.GetApartmentDetails($routeParams.id).then(function (d) {
        $scope.Details = d.data;
    }, function () {
        alert('Failed');
    })

})
.factory('DetailsService', function ($http) {

    var fac = {};
    fac.GetApartmentDetails = function (id) {
        return $http.get('http://localhost:8090/api/values' + '/' + id);
    }
    return fac;

})