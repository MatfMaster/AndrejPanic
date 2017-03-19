Apartments.IndexController = Ember.ArrayController.extend({
    searchTerm: '',
    actions: {
        filteredList: function () {
            var q = this.get('searchTerm');
            var self = this;

            Ember.$.getJSON("http://localhost:8090/api/values",
                function (data) {

                    var list = data.map(function(item) {
                        return {
                            ImageUrl: "#/details/" + item.ID,
                            ImageSrc: "../Images/" + item.Name + "/" + item.ImageName,
                            ID: item.ID,
                            Name: item.Name,
                            ImageName: item.ImageName
                        };
                    });

                     list = list.filter(function (item) {
                        return item.Name.indexOf(q) !== -1;
                    });
                    self.set("model", list);
                });
        }
    }

});