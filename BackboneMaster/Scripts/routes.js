var myRouter = Backbone.Router.extend({

    greeting: null,
    container: null,
    details: null,
    view1: null,
    view2: null,
    view3: null,

    initialize: function () {
        this.greeting = new GreetModel({ Message: "Hello world" });
        this.container = new ContainerView({ el: $("#rAppContainer"), model: this.greeting });
    },

    routes: {
        "": "handleRoute1",
        "view1": "handleRoute1",
        "view2": "handleRoute2",
        "view3": "handleRoute3",
        "Details/:apartmentID": "detailRoute",

        "view/:viewid(/:msg)": "handleRouteAll"
    },

    handleRoute1: function () {
        if (this.view1 == null) {

                $('#rAppContainer').show();

                var apartments = new ApartmentCollection();
                var view1 = new appListView2({ collection: apartments, el: $('#rAppContainer')[0] });

                apartments.fetch({
                    success: function (data) {
                        view1.render(data);
                    }
                });
        }

        this.container.myChildView = this.view1;
        this.container.render();
    },

    handleRoute2: function () {
        if (this.view2 == null) {
            this.view2 = new View2({ model: this.greeting });
        }

        this.container.myChildView = this.view2;
        this.container.render();
    },

    handleRoute3: function () {
        if (this.view3 == null) {
            this.view3 = new View3({ model: this.greeting });
        }

        this.container.myChildView = this.view3;
        this.container.render();
    },

    detailRoute: function (apartmentID) {

        $('#appDetails').html("");
        $('#appImages').html("");
        $('#rAppContainer').hide();

        var details = new ApartmentDetails({ id: apartmentID });

        var view2 = new appDetails({ model: details, el: $('#appDetails')[0] });

        details.fetch({
            success: function () {
                view2.render();
            }
        });
        var images = new ImagesCollection([], { id: apartmentID });

        images.fetch({

            reset: function () {
                view1.render();
            },

            success: function () {
                var view1 = new appImagesView({ collection: images, el: $('#appImages')[0] });
                view1.render();

                $("#pikame").PikaChoose();
            }
        });

        this.container.myChildView = this.view2;
        this.container.render();

    },

    handleRouteAll: function (viewid, msg) {

        if (viewid == 1) {
            this.handleRoute1();
        }
        else if (viewid == 2) {
            this.handleRoute2();
        }
        else if (viewid == 3) {
            this.handleRoute3();
        }

        if (msg) {
            alert(msg);
        }
    }
});