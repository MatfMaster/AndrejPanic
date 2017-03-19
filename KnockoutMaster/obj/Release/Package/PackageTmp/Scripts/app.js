var apartmentVM;

function Apartment(id, Name, ImageName) {
    var self = this;

    self.Id = ko.observable(id);
    self.Name = ko.observable(Name);
    self.ImageName = ko.observable(ImageName);

    self.src = ko.observable("../Images/" + Name + "/" + ImageName);
    self.url = ko.observable("#/" + id),

    self.addApartment = function () {
        var dataObject = ko.toJSON(this);

        $.ajax({
            url: 'http://localhost:8090/api/values',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                apartmentRegisterViewModel.apartmentListViewModel.apartments.push(new Apartment(data.ID, data.Name));
                self.Id(null);
                self.Name('');
            }
        });
    };
}

function Image(id, ApartmentName, ImageName) {
    var self = this;

    self.ApartmentName = ko.observable(ApartmentName);
    self.ImageName = ko.observable(ImageName);

    self.imageSrc = ko.observable("../Images/" + ApartmentName + "/" + ImageName);
    self.imageUrl = ko.observable("../Images/" + ApartmentName + "/" + ImageName);
}

function ApartmentList() {

    var self = this;
    self.apartments = ko.observableArray([]);
    self.images = ko.observableArray([]);

    self.getApartments = function () {
        self.apartments.removeAll();

        $.getJSON('http://localhost:8090/api/values', function (data) {
            $.each(data, function (key, value) {
                self.apartments.push(new Apartment(value.ID, value.Name, value.ImageName));
            });

            ko.applyBindings(apartmentRegisterViewModel, $("#divBindingContainer").get(0));
        });

    };

    self.Query = ko.observable('');

    self.searchResults = ko.computed(function () {

        var q = self.Query();

        return ko.utils.arrayFilter(self.apartments(), function (item) {
            return item.Name().toLowerCase().indexOf(q) >= 0;
        });

    });

    // remove student. current data context object is passed to function automatically.
    //self.removeStudent = function (student) {
    //    $.ajax({
    //        url: '/api/student/' + student.Id(),
    //        type: 'delete',
    //        contentType: 'application/json',
    //        success: function () {
    //            self.students.remove(student);
    //        }
    //    });
    //};

    self.chosenApartmentData = ko.observable();
    self.chosenApartmentImageData = ko.observable();
    self.showSearch = ko.observable(true);
    self.showApartments = ko.observable(true);

    self.goToApartment = function (apartment) { location.hash = '/' + apartment.Id() };

    $(document).ready(function () {

        Sammy(function () {
            this.debug = true;
            this.get("#:apartment", function () {

                self.chosenApartmentData(null);
                self.chosenApartmentImageData(null);
                self.showSearch(true);
                self.showApartments(true);
                $('.pika-stage').remove();
                
            });

            this.get('#/:Id', function () {

                            self.showSearch(false);
                            self.showApartments(false);

                            $.get('http://localhost:8090/api/values/', { id: this.params.Id }, self.chosenApartmentData);

                            self.images.removeAll();

                            $.get('http://localhost:8090/api/images/' + this.params.Id, function (data) {

                                $.each(data, function (key, value) {
                                    self.images.push(new Image(value.ID, value.ApartmentName, value.ImageName));
                                });

                                $("#pikame").PikaChoose();




                                //// We only want these styles applied when javascript is enabled
                                //$('div.navigation').css({ 'float': 'left' });
                                //$('div.content').css('display', 'block');

                                //// Initially set opacity on thumbs and add
                                //// additional styling for hover effect on thumbs
                                //var onMouseOutOpacity = 0.67;
                                //$('#thumbs ul.thumbs li').opacityrollover({
                                //    mouseOutOpacity: onMouseOutOpacity,
                                //    mouseOverOpacity: 1.0,
                                //    fadeSpeed: 'fast',
                                //    exemptionSelector: '.selected'
                                //});

                                //// Initialize Advanced Galleriffic Gallery
                                //var gallery = $('#thumbs').galleriffic({
                                //    delay: 4000,
                                //    numThumbs: 15,
                                //    preloadAhead: 10,
                                //    enableTopPager: true,
                                //    enableBottomPager: true,
                                //    maxPagesToShow: 7,
                                //    imageContainerSel: '#slideshow',
                                //    controlsContainerSel: '#controls',
                                //    captionContainerSel: '#caption',
                                //    loadingContainerSel: '#loading',
                                //    renderSSControls: true,
                                //    renderNavControls: true,
                                //    playLinkText: 'Play Slideshow',
                                //    pauseLinkText: 'Pause Slideshow',
                                //    prevLinkText: '&lsaquo; Previous Photo',
                                //    nextLinkText: 'Next Photo &rsaquo;',
                                //    nextPageLinkText: 'Next &rsaquo;',
                                //    prevPageLinkText: '&lsaquo; Prev',
                                //    enableHistory: false,
                                //    autoStart: false,
                                //    syncTransitions: true,
                                //    defaultTransitionDuration: 900,
                                //    onSlideChange: function (prevIndex, nextIndex) {
                                //        // 'this' refers to the gallery, which is an extension of $('#thumbs')
                                //        this.find('ul.thumbs').children()
                                //                .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
                                //                .eq(nextIndex).fadeTo('fast', 1.0);
                                //    },
                                //    onPageTransitionOut: function (callback) {
                                //        this.fadeTo('fast', 0.0, callback);
                                //    },
                                //    onPageTransitionIn: function () {
                                //        this.fadeTo('fast', 1.0);
                                //    }
                                //});


                            });

                });

                //ova ruta mora poslednja da ide, da ne bi prvo u nju ulazili kada gadja #/:Id
                this.get("", function () {
                    this.app.runRoute('get', '#Home');
                });

            }).run();

        });


}

apartmentRegisterViewModel = {
    addApartmentViewModel: new Apartment(), apartmentListViewModel: new ApartmentList()

};

$(document).ready(function () {

    apartmentRegisterViewModel.apartmentListViewModel.getApartments();

});


//function ApartmentDetails() {

//    var self = this;
//    //self.Id = ko.observable(id);
//    self.Name = ko.observable(Name);
//    self.City = ko.observable(City);
//    self.Address = ko.observable(Address);

//    self.getDetails = function (apartment) {
//        //TODO http://learn.knockoutjs.com/#/?tutorial=webmail
//        //$.getJSON('/Data/GetApartmentDetails/' + apartment.Id(), function (data) {

//        //    self.Name = ko.observable(data.Name);
//        //    self.City = ko.observable(data.City);
//        //    self.Address = ko.observable(data.Address);

//        //    ko.applyBindings(new ApartmentDetails());
//        //});
//            $.ajax({
//                url: '/Data/GetApartmentDetails/' + apartment.Id(),
//                type: 'post',
//                contentType: 'application/json',
//                success: function () {
//                        self.Name = ko.observable(data.Name);
//                        self.City = ko.observable(data.City);
//                        self.Address = ko.observable(data.Address);

//                        ko.applyBindings(new ApartmentDetails());
//                }
//            });
//    };


//}

//var testviewModel = {
//    message: ko.observable("initial page"),
//    page2Url: "#/Page2",
//    page3Url: "#/Page3"
//};

//Sammy(function () {
//    this.get("#/Page1", function () {
//        testviewModel.message("You are on page 1");
//    });

//    this.get("#/Page2", function () {
//        testviewModel.message("You are on page 2");
//    });

//    this.get("#/Page3", function () {
//        testviewModel.message("You are on page 3");
//    });

//}).run();

//ko.applyBindings(testviewModel);






//function viewModel() {
//    var self = this;
//    self.currentView = ko.observable();
//    self.views = ko.observableArray(["Home", "About", "Contact"]);
//}

//var vm = new viewModel();

//ko.applyBindings(vm);


//Sammy(function () {
//    /*
//    **"#:view" means that sammy takes whatever is after the hash tag 
//    **and applies it to the value of "this.params.view"
//    */
//    this.get('#:view', function () {
//        //Set currentView on your view model
//        vm.currentView(this.params.view);
//    });
//}).run('#Home');