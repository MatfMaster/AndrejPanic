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

    },

    model: Image,

    fetch : function() {

        var collection = this;
        $.ajax({
            type : 'GET',
            url: '/Data/GetApartmentImages/' + this.id,
            dataType : 'json',
            success : function(data) {
                collection.reset(data)
            }
        });
    }

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

    },
    render: function () {

        this.$el.html('<li class="imgdata"><a class="thumb" href="/Images/' + this.model.get("ApartmentName") + '/' + this.model.get("ImageName") +
            '"><img src="/Images/' + this.model.get("ApartmentName") + '/' + this.model.get("ImageName") + '" width="300" height="220" /> </a></li>');

       return this;
    }
});


