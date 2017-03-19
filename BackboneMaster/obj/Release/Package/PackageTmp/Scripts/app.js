//$(function () {

//    var Apartment = Backbone.Model.extend({
//        url: function () {
//            var base = '/Data/GetApartments/';
//            if (this.isNew())
//                return base;
//            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
//        },
//        initialize: function () {
//            console.log('Apartment Constructor Triggered');
//        },
//        defaults: {
//            ApartmentId: 0,
//            Name: 'Unknown',
//            Description: 'Unknown'
//        }
//    });

//    var ApartmentCollection = Backbone.Collection.extend({
//        model: Apartment,
//        url: '/Data/GetApartments/'
//    });

//    // Apartment View - el returns the template enclosed within a tr
//    var ApartmentView = Backbone.View.extend({
//        template: _.template($('#Apartment-Template').html()),
//        tagName: "tr",
//        initialize: function () {
//            console.log('ApartmentView Constructor Triggered');
//            this.model.bind('change', this.render, this);
//            this.model.bind('remove', this.unrender, this);
//        },
//        render: function () {
//            console.log('Rendering...');
//            $(this.el).html(this.template(this.model.toJSON()));
//            return this;
//        },
//        unrender: function () {
//            console.log('Un-Rendering...');
//            $(this.el).remove();
//            return this;
//        },
//        events: {
//            "click .Edit": 'EditApartment',
//            "click .Delete": 'DeleteApartment'
//        },
//        EditApartment: function () {
//            this.model.set({ Description: 'Unknown' });
//            var self = this;
//            this.model.save(this.model, {
//                success: function () {
//                    $("input:button", $(self.el)).button();
//                }
//            });
//        },
//        DeleteApartment: function () {
//            this.model.destroy();
//        }
//    });

//    // Actual App view
//    var AppView = Backbone.View.extend({
//        initialize: function () {
//            this.collection.bind('add', this.AppendApartment, this);
//        },
//        el: '#Apartment_Container',
//        counter: 15,
//        events: {
//            "click #btnCreateNew": "AddNewApartment"
//        },
//        AddNewApartment: function () {
//            console.log('Add Apartment....');
//            this.counter++;
//            var newApartment = new Apartment({ Name: 'Unknown ' + this.counter, Description: 'Damn ' + this.counter });
//            this.collection.add(newApartment);
//            newApartment.save(newApartment, {
//                success: function () {
//                    $("input:button", "#Apartment_List").button();
//                }
//            });
//        },
//        AppendApartment: function (apartment) {
//            var apartmentView = new ApartmentView({ model: apartment });
//            $(this.el).find('table').append(apartmentView.render().el);
//        },
//        render: function () {
//            if (this.collection.length > 0) {
//                this.collection.each(this.AppendApartment, this);
//            }
//            $("input:button", "#Apartment_List").button();
//        }
//    });

//    var apartments = new ApartmentCollection();
//    var view = new AppView({ collection: apartments });

//    apartments.fetch({
//        success: function () {
//            view.render();
//        }
//    });
//});
