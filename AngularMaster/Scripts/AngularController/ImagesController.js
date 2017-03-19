angular.module('app').controller('ImagesController', function ($scope, ImagesService, $routeParams) {

    $scope.Images = null;
    ImagesService.GetApartmentImages($routeParams.id).then(function (d) {
        $scope.Images = d.data; 
    }, function () {
        alert('Failed'); 
    })

})
.directive('onFinishRender', function ($timeout) {

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
.factory('ImagesService', function ($http) {

    var fac = {};
    fac.GetApartmentImages = function (id) {
        return $http.get('http://localhost:8090/api/images' + '/' + id);
    }
    return fac;

})