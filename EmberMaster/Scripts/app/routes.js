Apartments.Router.map(function () {
    this.resource("details", { path: "/details/:id" });
});

Apartments.IndexRoute = Ember.Route.extend({
        model: function() {
        return Ember.$.getJSON("http://localhost:8090/api/values").then(function(json) {
            return json.map(function(item) {
                return {
                    ImageUrl: "#/details/" + item.ID, ImageSrc: "../Images/" + item.Name + "/" + item.ImageName,
                    ID: item.ID, Name: item.Name, ImageName: item.ImageName
                };
            });
        });
    }
});

Apartments.DetailsRoute = Ember.Route.extend({

    model: function (params) {
        return Ember.$.getJSON("http://localhost:8090/api/values/" + params.id);
    },
    afterModel: function (params) {
        var self = this;

        return Ember.$.getJSON("http://localhost:8090/api/images/" + params.ID).then(function (result) {
            self.set('images', result);
        });
    },
    setupController: function (controller, model) {
        this._super(controller, model);
        controller.set('images', this.get('images'));
    }
});

