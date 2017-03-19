//angular.module('app') 
//.controller('HomeController', function ($scope, ContactService) { //inject ContactService
//    $scope.Apartments = null;
//    ContactService.GetApartments().then(function (d) {
//        $scope.Apartments = d.data; // Success
//    }, function () {
//        alert('Failed'); // Failed
//    });


//    $scope.getImgUrl=function()
//    {
//        $scope.myImgUrl = $scope.Apartments.name; //get your img url whatever it is...

//        // You can also set widget.showInitImage variable here as well...
//        };


//})
//.factory('ContactService', function ($http) { // here I have created a factory which is a populer way to create and configure services
//    var fac = {};
//    fac.GetApartments = function () {
//        return $http.get('/Data/GetApartments');
//    }
//    return fac;
//});



angular.module('app', ['ngRoute']) //extending from previously created angularjs module in part1
// here ['ngRoute'] is not required, I have just added to make you understand in a single place
.config(function ($routeProvider, $locationProvider) {
    //here we will write code for implement routing 
    $routeProvider
    .when('/', { // This is for reditect to another route
        redirectTo: function () {
            return '/Home';
        }
    })
    .when('/Home', {
        templateUrl: '/Templates/Home.html',
        controller: 'HomeController'
    })
    .when('/Login', {
        templateUrl: '/Templates/Login.html',
        controller: 'LoginController'
    })
    .when('/Details/:id', {
        templateUrl: '/Templates/Details.html',
        controller: 'DetailsController'
    })
    .otherwise({   // This is when any route not matched
        templateUrl: '/Templates/Error.html',
        controller: 'ErrorController'
    })

    $locationProvider.html5Mode(false).hashPrefix('!'); // This is for Hashbang Mode
})
.controller('HomeController', function ($scope, ContactService) { //inject ContactService
    $scope.Apartments = null;
    ContactService.GetApartments().then(function (d) {
        $scope.Apartments = d.data; // Success
    }, function () {
        alert('Failed'); // Failed
    })
})
    .factory('ContactService', function ($http) { // here I have created a factory which is a populer way to create and configure services
        var fac = {};
        fac.GetApartments = function () {
            return $http.get('/Data/GetApartments');
        }
        return fac;
    })


.controller('AboutController', function ($scope) {
    $scope.Message = "This is ABOUT page";
})

    .controller('LoginController', function ($scope, LoginService) {
        $scope.IsLogedIn = false;
        $scope.Message = '';
        $scope.Submitted = false;
        $scope.IsFormValid = false;

        $scope.LoginData = {
            Username: '',
            Password: ''
        };

        //Check is Form Valid or Not // Here f1 is our form Name
        $scope.$watch('f1.$valid', function (newVal) {
            $scope.IsFormValid = newVal;
        });

        $scope.Login = function () {
            $scope.Submitted = true;
            if ($scope.IsFormValid) {
                LoginService.GetUser($scope.LoginData).then(function (d) {
                    if (d.data.Username != null) {
                        $scope.IsLogedIn = true;
                        $scope.Message = "Successfully login done. Welcome " + d.data.FullName;

                    }
                    else {
                        alert('Invalid Credential!');
                    }
                });
            }
        };

    })
.factory('LoginService', function ($http) {
    var fac = {};
    fac.GetUser = function (d) {
        return $http({
            url: '/Data/UserLogin',
            method: 'POST',
            data: JSON.stringify(d),
            headers: { 'content-type': 'application/json' }
        });
    };
    return fac;
})

    .controller('DetailsController', function ($scope, DetailsService, $routeParams) { //inject ContactService
        $scope.Details = null;
        DetailsService.GetApartmentDetails($routeParams.id).then(function (d) {
            $scope.Details = d.data; // Success
        }, function () {
            alert('Failed'); // Failed
        })
    })
    .factory('DetailsService', function ($http) { // here I have created a factory which is a populer way to create and configure services
        var fac = {};
        fac.GetApartmentDetails = function (id) {
            return $http.get('/Data/GetApartmentDetails' + '/' + id);
        }
        return fac;
    })

.controller('ErrorController', function ($scope) {
    $scope.Message = "404 Not Found!";
});
