var GreetModel = Backbone.Model.extend({
    defaults: {
        Message: ""
    }
});

    var Apartment = Backbone.Model.extend({
        url: function () {
            var base = 'http://localhost:8090/api/values/';
            if (this.isNew())
               return base;
          return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
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


   var ApartmentCollection = Backbone.Collection.extend({
        model: Apartment,
        url: 'http://localhost:8090/api/values/',
        search: function (letters) {

            if (letters == "") return this;
            //var pattern = new RegExp(letters);

            return this.filter(function (data) {

                var res = false;

                if (data.get("Name").toLowerCase().indexOf(letters.toLowerCase()) !== -1)
                    res = true;

                return res;
                //return pattern.test(data.get("Name"));
            });

        }
   });

   var ApartmentDetails = Backbone.Model.extend({
       url: function () {
           var base = 'http://localhost:8090/api/values/' + this.id;
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

   var Image = Backbone.Model.extend({
       url: function () {
           var base = 'http://localhost:8090/api/images/' + this.id;
           if (this.isNew())
               return base;
           return base;
       },
       initialize: function () {
       }
   });

   var ImagesCollection = Backbone.Collection.extend({
       url: function () {
           var base = 'http://localhost:8090/api/images/' + this.id;
           return base;
       },
       initialize: function (models, options) {
           this.id = options.id;
       },
       model: Image
   });
