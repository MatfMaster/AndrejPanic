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
    tagName: 'div',

    events: {
        'click': "itemClicked"
    },

    itemClicked: function () {
    },

    initialize: function () {
        //this.template = _.template($('#appDetails').html());
    },

    render: function () {
       // this.$el.html(this.model.get('Address') );
        //$(this.el).html(this.template(this.model.toJSON()));
        //this.template = _.template(this.model.toJSON());
        this.$el.html(this.model.get('Address'));
        //$('#appDetails').append(this.$el);

        return this;
    }
});


var ContainerView = Backbone.View.extend({
    myChildView: null,

    render: function () {
        return this;
    }
});



    //var ApartmentView = Backbone.View.extend({
    //   // template: _.template($('#Apartment-Template').html()),
    //    tagName: "tr",
    //    initialize: function () {
    //        console.log('ApartmentView Constructor Triggered');
    //        this.model.bind('change', this.render, this);
    //        this.model.bind('remove', this.unrender, this);
    //    },
    //    render: function () {
    //        console.log('Rendering...');
    //        $(this.el).html(this.template(this.model.toJSON()));
    //        return this;
    //    },
    //    unrender: function () {
    //        $(this.el).remove();
    //        return this;
    //    },
    //    events: {
    //        "click .Edit": 'EditApartment',
    //        "click .Delete": 'DeleteApartment'
    //    },
    //    EditApartment: function () {
    //        this.model.set({ Description: 'Unknown' });
    //        var self = this;
    //        this.model.save(this.model, {
    //            success: function () {
    //                $("input:button", $(self.el)).button();
    //            }
    //        });
    //    },
    //    DeleteApartment: function () {
    //        this.model.destroy();
    //    }
    //});


    //var AppView = Backbone.View.extend({
    //    //model: ApartmentCollection,

    //    initialize: function () {
    //        //this.collection.bind('add', this.AppendApartment, this);
    //    },
    //    el: '#rAppContainer',
    //    counter: 15,
    //    events: {
    //        "click #btnCreateNew": "AddNewApartment"
    //    },
    //    AddNewApartment: function () {
    //        console.log('Add Apartment....');
    //        this.counter++;
    //        var newApartment = new Apartment({ Name: 'Unknown ' + this.counter, Description: 'Damn ' + this.counter });
    //        this.collection.add(newApartment);
    //        newApartment.save(newApartment, {
    //            success: function () {
    //                $("input:button", "#Apartment_List").button();
    //            }
    //        });
    //    },
    //    AppendApartment: function (apartment) {
    //        var apartmentView = new ApartmentView({ model: apartment });
    //        $(this.el).find('table').append(apartmentView.render().el);
    //    },
    //    render: function () {
    //        if (this.collection.length > 0) {
    //            this.collection.each(this.AppendApartment, this);
    //        }
    //        $("input:button", "#Apartment_List").button();
    //    }
//});


var Image = Backbone.Model.extend({
    url: function () {
        var base = '/Data/GetApartmentImages/' + this.id;
        if (this.isNew())
            return base;
        return base;
    },
    initialize: function () {
    },
    defaults: {
        ApartmentId: 0,
        Name: 'Unknown',
        City: 'Unknown',
        Description: 'Unknown'
    }
});


var ImagesCollection = Backbone.Collection.extend({

    initialize: function (models, options) {
        this.id = options.id;


        //$.ajax({
        //    type: "GET",
        //    url: '/Data/GetApartmentImages/' + this.id,
        //    dataType: "json",
        //    success: function (data) {
        //        this.loadPhotos(data);
        //    },
        //    error: function (jqXHR, textStatus, errorThrown) {
        //        console.log("FETCH FAILED: " + errorThrown);
        //    }
        //});



    },
    //url: function () {
    //    var base = '/Data/GetApartmentImages/' + this.id;
    //    if (this.isNew())
    //        return base;
    //    return base;
    //}
    //url: '/Data/GetApartmentImages/' + 2,
    model: Image,


    fetch : function() {
        // store reference for this collection
        var collection = this;
        $.ajax({
            type : 'GET',
            url: '/Data/GetApartmentImages/' + this.id,
            dataType : 'json',
            success : function(data) {
                //console.log(data);
                // set collection data (assuming you have retrieved a json object)
                collection.reset(data)
              //  return Backbone.Collection.prototype.fetch.call(this, data);
            }
        });

        //return Backbone.Collection.prototype.fetch.call(this);
    }

    //loadPhotos: function (filenames) {
    //    for (var i = 0; i < filenames.length; i++) {

    //        var photo = new Photo({ fileurl: filenames[i] });
    //        var photoView = new PhotoView({ model: photo });
    //        this.add(photo);

    //    }


    //}

});

var appImagesView = Backbone.View.extend({
    model: ImagesCollection,

    initialize: function () {
        this.collection.bind('add', this.handleReset, this);
    },

    handleReset: function () {
        this.render();
    },

    render: function () {
        this.$el.html();

        for (var i = 0; i < this.model.length; ++i) {
            var m_appView = new imageView({ model: this.model.at(i) });

            this.$el.append(m_appView.$el);
            m_appView.render();
        }

        return this;
    },
});

var imageView = Backbone.View.extend({

    model: Image,
    tagName: 'span',
    template: '',

    initialize: function () {
       // this.template = _.template($('#appImages').html());
    },
    render: function () {

        this.$el.html('<li class="imgdata"><a class="thumb" href="/Images/' + this.model.get("ApartmentName") + '/' + this.model.get("ImageName") +
            '"><img src="/Images/' + this.model.get("ApartmentName") + '/' + this.model.get("ImageName") + '" width="300" height="220" /> </a></li>');

       return this;
    }
});


