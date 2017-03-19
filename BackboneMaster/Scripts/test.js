//var V = Backbone.View.extend({
//    el: 'body',
//    render: function () {
//        var data = { lat: -21, lon: 124 };
//        var template = $('#latitude').html();
//        this.$el.html(_.template(template, data));

//        return this;
//    }
//});

//var v = new V();
//v.render();

var ApartmentDetails = Backbone.Model.extend({
    url: function () {
        var base = '/Data/GetApartmentDetails/' + this.id;
        if (this.isNew())
            return base;
        return base;
    },
    initialize: function () {
    },
    defaults: {
        id: 0,
        Name: 'Unknown',
        City: 'Unknown',
        Address: 'Unknown'
    }
});

var appDetails = Backbone.View.extend({
    model: ApartmentDetails,

    initialize: function () {
        //this.template = _.template($('#appDetails').html());
    },

    render: function () {
        var template = $('#latitude').html();
        this.$el.html(_.template(template, this.model.toJSON()));

        return this;
    }
});


var Image = Backbone.Model.extend({
    url: function () {
        var base = '/Data/GetApartmentImages/' + this.id;
        if (this.isNew())
            return base;
        return base;
    },
    initialize: function () {
    }
});

var ImagesCollection = Backbone.Collection.extend({

    initialize: function (models, options) {
        this.id = options.id;
    },
    model: Image,
    //url: '/Data/GetApartmentImages/' + this.id, 
    fetch: function () {
        var collection = this;
        $.ajax({
            type: 'GET',
            url: '/Data/GetApartmentImages/' + this.id,
            dataType: 'json',
            success: function (data) {
                collection.reset(data);
            }
        });
    }

});

var appImagesView = Backbone.View.extend({
    model: ImagesCollection,

    initialize: function () {
        this.model.on("change reset add remove", this.handleReset, this);
    },

    handleReset: function () {
        this.render();
    },

    render: function () {

        var template = $('#images').html();
        //console.log(this.model.toJSON());
        this.$el.html(_.template(template, {images: this.model.toJSON()}));

        return this;

    },
});
