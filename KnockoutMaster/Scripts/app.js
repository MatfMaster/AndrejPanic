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
                self.images.removeAll();
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
                            });

                });

                this.get("", function () {
					self.images.removeAll();
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
