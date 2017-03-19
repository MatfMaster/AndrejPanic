(function () {

    var app = angular.module('app', ['ngRoute']);

    angular.module('app', ['ngRoute']) 

.config(function ($routeProvider, $locationProvider) {

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
    .when('/about', {
        templateUrl: '/Template/About.html',
        controller: 'AboutController'
    })
    .when('/Login', {
        templateUrl: '/Templates/Login.html',
        controller: 'LoginController'
    })
    .when('/Details/:id', {
        templateUrl: '/Templates/Details.html',
        controller: 'DetailsController'
    })
    .when('/UploadImages/:id', {
        templateUrl: '/Templates/UploadImages.html',
        controller: 'UploadController'
    })
    .otherwise({ 
        templateUrl: '/Template/Error.html',
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
            return $http.get('http://localhost:8090/api/values');
        }
        return fac;
})

.controller('AboutController', function ($scope) {
    $scope.Message = "This is ABOUT page";
})
.controller('OrderController', function ($scope, $routeParams) {
    $scope.Message = "This is ORDER Page with query string id value " + $routeParams.id;
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
                                $scope.Message = "Successfully login done. Welcome " + d.data.Username;

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
            return $http.get('http://localhost:8090/api/values' + '/' + id);
        }
        return fac;
    })

                    .controller('ImagesController', function ($scope, ImagesService, $routeParams) { //inject ContactService
                        $scope.Images = null;
                        ImagesService.GetApartmentImages($routeParams.id).then(function (d) {
                            $scope.Images = d.data; // Success
                        }, function () {
                            alert('Failed'); // Failed
                        })


                        $scope.test = function () {
                            console.log('test');
                        }

                    })

            .directive('onFinishRender', function ($timeout) {

                //var counter = 0;
                //var url = window.location.href;

                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {



                            $timeout(function () {

                                if (scope.$last) {

                                    scope.$evalAsync(attrs.onFinishRender);

                                jQuery('div.navigation').css({ 'float': 'left' });
                                jQuery('div.content').css('display', 'block');

                                var onMouseOutOpacity = 0.67;
                                jQuery('#thumbs ul.thumbs li').opacityrollover({
                                    mouseOutOpacity: onMouseOutOpacity,
                                    mouseOverOpacity: 1.0,
                                    fadeSpeed: 'fast',
                                    exemptionSelector: '.selected'
                                });

                                var gallery = jQuery('#thumbs').galleriffic({
                                    delay: 4000,
                                    numThumbs: 15,
                                    preloadAhead: 10,
                                    enableTopPager: true,
                                    enableBottomPager: true,
                                    maxPagesToShow: 7,
                                    imageContainerSel: '#slideshow',
                                    controlsContainerSel: '#controls',
                                    captionContainerSel: '#caption',
                                    loadingContainerSel: '#loading',
                                    renderSSControls: true,
                                    renderNavControls: true,
                                    playLinkText: 'Play Slideshow',
                                    pauseLinkText: 'Pause Slideshow',
                                    prevLinkText: '&lsaquo; Previous Photo',
                                    nextLinkText: 'Next Photo &rsaquo;',
                                    nextPageLinkText: 'Next &rsaquo;',
                                    prevPageLinkText: '&lsaquo; Prev',
                                    enableHistory: false,
                                    autoStart: false,
                                    syncTransitions: true,
                                    defaultTransitionDuration: 900,
                                    onSlideChange: function (prevIndex, nextIndex) {
                                        // 'this' refers to the gallery, which is an extension of $('#thumbs')
                                        this.find('ul.thumbs').children()
                                                .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
                                                .eq(nextIndex).fadeTo('fast', 1.0);
                                    },
                                    onPageTransitionOut: function (callback) {
                                        this.fadeTo('fast', 0.0, callback);
                                    },
                                    onPageTransitionIn: function () {
                                        this.fadeTo('fast', 1.0);
                                    }
                                });



                            }

                        });
                                       

                    }
                };
            })

    .factory('ImagesService', function ($http) { // here I have created a factory which is a populer way to create and configure services
        var fac = {};
        fac.GetApartmentImages = function (id) {
            return $http.get('http://localhost:8090/api/images' + '/' + id);
        }
        return fac;
    })



                    .controller('UploadController', function ($scope, FileUploadService, $routeParams) {

                        // Variables
                        $scope.Message = "";
                        $scope.FileInvalidMessage = "";
                        $scope.SelectedFileForUpload = null;
                        $scope.FileDescription = "";
                        $scope.IsFormSubmitted = false;
                        $scope.IsFileValid = false;
                        $scope.IsFormValid = false;

                        //Form Validation
                        $scope.$watch("f1.$valid", function (isValid) {
                            $scope.IsFormValid = isValid;
                        });


                        // THIS IS REQUIRED AS File Control is not supported 2 way binding features of Angular
                        // ------------------------------------------------------------------------------------
                        //File Validation
                        $scope.ChechFileValid = function (file) {
                            var isValid = false;
                            if ($scope.SelectedFileForUpload != null) {
                                if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') && file.size <= (512 * 1024)) {
                                    $scope.FileInvalidMessage = "";
                                    isValid = true;
                                }
                                else {
                                    $scope.FileInvalidMessage = "Selected file is Invalid. (only file type png, jpeg and gif and 512 kb size allowed)";
                                }
                            }
                            else {
                                $scope.FileInvalidMessage = "Image required!";
                            }
                            $scope.IsFileValid = isValid;
                        };

                        //File Select event 
                        $scope.selectFileforUpload = function (file) {
                            $scope.SelectedFileForUpload = file[0];
                        }
                        //----------------------------------------------------------------------------------------

                        //Save File
                        $scope.SaveFile = function () {
                            $scope.IsFormSubmitted = true;
                            $scope.Message = "";
                            $scope.ChechFileValid($scope.SelectedFileForUpload);
                            if ($scope.IsFormValid && $scope.IsFileValid) {
                                FileUploadService.UploadFile($scope.SelectedFileForUpload, $scope.FileDescription, $routeParams.id).then(function (d) {
                                    alert(d.Message);
                                    ClearForm();
                                }, function (e) {
                                    alert(e);
                                });
                            }
                            else {
                                $scope.Message = "All the fields are required.";
                            }
                        };
                        //Clear form 
                        function ClearForm() {
                            $scope.FileDescription = "";
                            //as 2 way binding not support for File input Type so we have to clear in this way
                            //you can select based on your requirement
                            angular.forEach(angular.element("input[type='file']"), function (inputElem) {
                                angular.element(inputElem).val(null);
                            });

                            $scope.f1.$setPristine();
                            $scope.IsFormSubmitted = false;
                        }



                    })
    .factory('FileUploadService', function ($http, $q) { // here I have created a factory which is a populer way to create and configure services
        var fac = {};
        fac.UploadFile = function (file, description, id) {
            var formData = new FormData();
            formData.append("file", file);
            //We can send more data to server using append         
            formData.append("description", description);
            formData.append("id", id);

            var defer = $q.defer();
            $http.post("/Data/SaveFiles", formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                })
            .success(function (d) {
                defer.resolve(d);
            })
            .error(function () {
                defer.reject("File Upload Failed!");
            });

            return defer.promise;

        }
        return fac;
    })

.controller('ErrorController', function ($scope) {
    $scope.Message = "404 Not Found!";
});


    function MyCtrl($scope, myHttpResponse) {

        $scope.Details = d.data;
    }

    MyCtrl.resolve = {
        myHttpResponse: function ($http) {
            var fac = {};
            fac.GetApartmentDetails = function (id) {
                return $http.get('http://localhost:8090/api/values' + '/' + id);
            }
            return fac;
        }
    }

})();

