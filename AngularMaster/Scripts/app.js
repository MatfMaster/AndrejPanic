//(function () {

    var app = angular.module('app', ['ngRoute']).config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                redirectTo: function () {
                    return '/Home';
                }
            })
            .when('/Home', {

                templateUrl: '/Templates/Home.html',
                controller: 'HomeController'
            })
            .when('/Details/:id', {
                templateUrl: '/Templates/Details.html',
                controller: 'DetailsController'
            })
            .otherwise({
                templateUrl: '/Template/Error.html',
                controller: 'ErrorController'
            })

        $locationProvider.html5Mode(false).hashPrefix('!');
    });
//})