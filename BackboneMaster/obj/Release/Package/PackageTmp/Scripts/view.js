//var sampleView = Backbone.View.extend({
//    initialize: function () {
//        console.log('sampleView has been created');
//    }
//});


//var sampleView2 = Backbone.View.extend({
//    tagName: 'div',
//    id: 'sampleDiv'
//});


//var bookView = Backbone.View.extend({
//    tagName: "li",
//    model: Book,

//    initialize: function () {
//        // lets listen to model change and update ourselves
//        this.listenTo(this.model, "change", this.render);
//    },

//    render: function () {
//        this.$el.html(this.template(this.model.attributes));
//        //this.$el.html('<li>' + this.model.get("BookName") + '</li>');
//        return this;
//    }
//});

var bookListView = Backbone.View.extend({
    //model: BooksCollection,

    initialize: function () {
        // lets listen to model change and update ourselves
        this.listenTo(this.model, "add", this.modelUpdated);
    },

    modelUpdated: function () {
        this.render();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(); // lets render this view

        for (var i = 0; i < this.model.length; ++i) {
            // lets create a book view to render
            var m_bookView = new bookView({ model: this.model.at(i) });

            // lets add this book view to this list view
            this.$el.append(m_bookView.$el);
            m_bookView.render(); // lets render the book           
        }

        return this;
    }
});


var appView2 = Backbone.View.extend({

    model: Apartment,
    tagName: 'tr',
    template: '',

    events: {
        'click': "itemClicked"
    },

    itemClicked: function () {
        //alert('clicked: ' + this.model.get('Name'));
    },

    initialize: function () {
        this.template = _.template($('#rAppContainer').html());
    },


    render: function () {
        //this.$el.html(this.template(this.model.attributes));
        //        this.$el.html('<td><img src="../Images/' + this.model.get("Name") + ', ' + this.model.get("City") + '</td>');
        //<a ng-href="{{'#!/Details/' + e.ID}}"><img ng-src="{{'../Images/' + e.Name + '/' + e.ImageName}}" width="300" height="220" /></a>

        //if (this.model.get("ImageName") !== null)
        ////this.$el.html('<td><a href="#Details/' + this.model.get("ID") + '"><img src="../Images/' + this.model.get("Name") + '/' + this.model.get("ImageName") + '" width="300" height="220" /> </td><td>' + this.model.get("Name") + '</td>');
        //    //this.$el.html('<td><a href="Home/About/' + this.model.get("ID") + '"><img src="../Images/' + this.model.get("Name") + '/'
        //    //    + this.model.get("ImageName") + '" width="300" height="220" /> </td><td>' + this.model.get("Name") + '</td>');
        //    this.$el.html('<td><a href="/#Details/' + this.model.get("ID") + '"><img src="../Images/' + this.model.get("Name") + '/'
        //        + this.model.get("ImageName") + '" width="300" height="220" /> </td><td>' + this.model.get("Name") + '</td>');
        //else
        //    this.$el.html('<td>-</td><td>' + this.model.get("Name") + '</td>');



        if (this.model.get("ImageName") !== null)
            this.$el.html('<td><a href="/#Details/' + this.model.get("ID") + '"><img src="../Images/' + this.model.get("Name") + '/'
                + this.model.get("ImageName") + '" width="300" height="220" /> </td><td>' + this.model.get("Name") + '</td><td><a href="/#Details/' + + this.model.get("ID") + '">More details</a></td>');
        else
            this.$el.html('<td>-</td><td>' + this.model.get("Name") + '</td><td><a href="/#Details/' + +this.model.get("ID") + '">More details</a></td>');

        return this;
    }
});

var appListView2 = Backbone.View.extend({
    events: {
        "keyup #search": "search"
    },

    search: function (e) {
        var letters = $("#search").val();

        if (letters == '')
        {
            this.render(this.collection);
            return;
        }

        var ar = new ApartmentCollection(this.collection.search(letters));
        this.render(ar);
    },

    render: function (ar) {
        this.$el.html();
        $("#rAppContainer tr").remove();

        for (var i = 0; i < ar.length; ++i) {

            var m_appView = new appView2({ model: ar.at(i) });

            this.$el.append(m_appView.$el);
            m_appView.render();        
        }

        return this;
    },
});

//var appListView2 = Backbone.View.extend({
//    events: {
//        "keyup #search": "search"
//    },

//    search: function (e) {
//        var letters = $("#search").val();
//        this.collection = new ApartmentCollection(this.collection.search(letters));
//        this.render();
//    },

//    render: function () {
//        this.$el.html();
//        $("#rAppContainer tr").remove();

//        for (var i = 0; i < this.collection.length; ++i) {

//            var m_appView = new appView2({ model: this.collection.at(i) });

//            this.$el.append(m_appView.$el);
//            m_appView.render();
//        }

//        return this;
//    },
//});

//var appListView2 = Backbone.View.extend({
//    model: ApartmentCollection,


//    render: function () {
//        this.$el.html(); // lets render this view

//        for (var i = 0; i < this.model.length; ++i) {
//            // lets create a book view to render
//            var m_appView = new appView2({ model: this.model.at(i) });

//            this.$el.append(m_appView.$el);
//            m_appView.render(); // lets render the app           
//        }

//        return this;
//    },
//});


//var appDetails = Backbone.View.extend({

//    model: ApartmentDetails,
//    tagName: 'div',
//    template: '',

//    events: {
//        'click': "itemClicked"
//    },

//    itemClicked: function () {
//        //alert('clicked: ' + this.model.get('Name'));
//    },

//    initialize: function () {
//        this.template = _.template($('#appDetails').html());
//    },

//    render: function () {
//        this.$el.html(this.model.get('Address') );

//        return this;
//    }
//});



var View1 = Backbone.View.extend({

    initialize: function () {
        console.log('View1 has been created');
        this.render();
    },

    render: function () {
        this.$el.html(this.model.get('Message') + " from the View 1");
        return this;
    }
});

var View2 = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.model.get('Message') + " from the View 2");
        return this;
    }
});

var View3 = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.model.get('Message') + " from the View 3");
        return this;
    }
});

var ContainerView = Backbone.View.extend({
    myChildView: null,

    render: function () {
        //this.$el.html("Greeting Area</p>");

        //this.$el.append(this.myChildView.$el);
        return this;
    }
});



    var ApartmentView = Backbone.View.extend({
        //template: _.template($('#Apartment-Template').html()),
        tagName: "tr",
        initialize: function () {
            console.log('ApartmentView Constructor Triggered');
            this.model.bind('change', this.render, this);
            this.model.bind('remove', this.unrender, this);
        },
        render: function () {
            console.log('Rendering...');
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        unrender: function () {
            $(this.el).remove();
            return this;
        },
        events: {
            "click .Edit": 'EditApartment',
            "click .Delete": 'DeleteApartment'
        },
        EditApartment: function () {
            this.model.set({ Description: 'Unknown' });
            var self = this;
            this.model.save(this.model, {
                success: function () {
                    $("input:button", $(self.el)).button();
                }
            });
        },
        DeleteApartment: function () {
            this.model.destroy();
        }
    });


    var AppView = Backbone.View.extend({
        model: ApartmentCollection,

        initialize: function () {
            //this.collection.bind('add', this.AppendApartment, this);
        },
        el: '#rAppContainer',
        counter: 15,
        events: {
            "click #btnCreateNew": "AddNewApartment"
        },
        AddNewApartment: function () {
            console.log('Add Apartment....');
            this.counter++;
            var newApartment = new Apartment({ Name: 'Unknown ' + this.counter, Description: 'Damn ' + this.counter });
            this.collection.add(newApartment);
            newApartment.save(newApartment, {
                success: function () {
                    $("input:button", "#Apartment_List").button();
                }
            });
        },
        AppendApartment: function (apartment) {
            var apartmentView = new ApartmentView({ model: apartment });
            $(this.el).find('table').append(apartmentView.render().el);
        },
        render: function () {
            if (this.collection.length > 0) {
                this.collection.each(this.AppendApartment, this);
            }
            $("input:button", "#Apartment_List").button();
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

    var appImagesView = Backbone.View.extend({
        //model: ImagesCollection,

        //initialize: function () {
        //    this.model.on("change reset add remove", this.handleReset, this);
        //},



        initialize: function() { 
            //this.collection.bind("change reset add remove", this.render, this);

            //var self = this;
            //this.model.fetch().done(function () {
            //    self.render();
            //});


            //_.bindAll(this, 'beforeRender', 'render', 'afterRender'); 
            //var _this = this; 
            //this.render = _.wrap(this.render, function(render) { 
            //    _this.beforeRender(); 
            //    render(); 
            //    _this.afterRender(); 
            //    return _this; 
            //}); 
        }, 

        afterRender: function() { 
            $('div.navigation').css({ 'float': 'left' });
            $('div.content').css('display', 'block');

            var onMouseOutOpacity = 0.67;
            $('#thumbs ul.thumbs li').opacityrollover({
                mouseOutOpacity: onMouseOutOpacity,
                mouseOverOpacity: 1.0,
                fadeSpeed: 'fast',
                exemptionSelector: '.selected'
            });

            var gallery = $('#thumbs').galleriffic({
                delay: 4000,
                numThumbs: 15,
                preloadAhead: 10,
                enableTopPager: true,
                enableBottomPager: true,
                maxPagesToShow: 7,
                imageContainerSel: '#slideshow',
                controlsContainerSel: '#controls',
                captionContainerSel: '#caption',
                loadingContainerSel: '#loading',
                renderSSControls: true,
                renderNavControls: true,
                playLinkText: 'Play Slideshow',
                pauseLinkText: 'Pause Slideshow',
                prevLinkText: '&lsaquo; Previous Photo',
                nextLinkText: 'Next Photo &rsaquo;',
                nextPageLinkText: 'Next &rsaquo;',
                prevPageLinkText: '&lsaquo; Prev',
                enableHistory: false,
                autoStart: false,
                syncTransitions: true,
                defaultTransitionDuration: 900,
                onSlideChange: function (prevIndex, nextIndex) {

                    this.find('ul.thumbs').children()
                            .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
                            .eq(nextIndex).fadeTo('fast', 1.0);
                },
                onPageTransitionOut: function (callback) {
                    this.fadeTo('fast', 0.0, callback);
                },
                onPageTransitionIn: function () {
                    this.fadeTo('fast', 1.0);
                }
            });

        } ,





        handleReset: function () {
            this.render();
            //_.defer(galery());

            //_(function () { self.loadRemixedCollection(self.model); }).defer();
            //_(function () {



            //    $('div.navigation').css({ 'float': 'left' });
            //    $('div.content').css('display', 'block');

            //    var onMouseOutOpacity = 0.67;
            //    $('#thumbs ul.thumbs li').opacityrollover({
            //        mouseOutOpacity: onMouseOutOpacity,
            //        mouseOverOpacity: 1.0,
            //        fadeSpeed: 'fast',
            //        exemptionSelector: '.selected'
            //    });

            //    var gallery = $('#thumbs').galleriffic({
            //        delay: 4000,
            //        numThumbs: 15,
            //        preloadAhead: 10,
            //        enableTopPager: true,
            //        enableBottomPager: true,
            //        maxPagesToShow: 7,
            //        imageContainerSel: '#slideshow',
            //        controlsContainerSel: '#controls',
            //        captionContainerSel: '#caption',
            //        loadingContainerSel: '#loading',
            //        renderSSControls: true,
            //        renderNavControls: true,
            //        playLinkText: 'Play Slideshow',
            //        pauseLinkText: 'Pause Slideshow',
            //        prevLinkText: '&lsaquo; Previous Photo',
            //        nextLinkText: 'Next Photo &rsaquo;',
            //        nextPageLinkText: 'Next &rsaquo;',
            //        prevPageLinkText: '&lsaquo; Prev',
            //        enableHistory: false,
            //        autoStart: false,
            //        syncTransitions: true,
            //        defaultTransitionDuration: 900,
            //        onSlideChange: function (prevIndex, nextIndex) {

            //            this.find('ul.thumbs').children()
            //                    .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
            //                    .eq(nextIndex).fadeTo('fast', 1.0);
            //        },
            //        onPageTransitionOut: function (callback) {
            //            this.fadeTo('fast', 0.0, callback);
            //        },
            //        onPageTransitionIn: function () {
            //            this.fadeTo('fast', 1.0);
            //        }
            //    });

            //}
            //    ).defer();


            //galery();
        },

        loadReferralCollection: function (collection) {
            console.log("hello")
        },

        loadRemixedCollection: function (collection) {
            console.log("hello");
            //setTimeout(function(){ 
            $('div.navigation').css({ 'float': 'left' });
            $('div.content').css('display', 'block');

            var onMouseOutOpacity = 0.67;
            $('#thumbs ul.thumbs li').opacityrollover({
                mouseOutOpacity: onMouseOutOpacity,
                mouseOverOpacity: 1.0,
                fadeSpeed: 'fast',
                exemptionSelector: '.selected'
            });

            var gallery = $('#thumbs').galleriffic({
                delay: 4000,
                numThumbs: 15,
                preloadAhead: 10,
                enableTopPager: true,
                enableBottomPager: true,
                maxPagesToShow: 7,
                imageContainerSel: '#slideshow',
                controlsContainerSel: '#controls',
                captionContainerSel: '#caption',
                loadingContainerSel: '#loading',
                renderSSControls: true,
                renderNavControls: true,
                playLinkText: 'Play Slideshow',
                pauseLinkText: 'Pause Slideshow',
                prevLinkText: '&lsaquo; Previous Photo',
                nextLinkText: 'Next Photo &rsaquo;',
                nextPageLinkText: 'Next &rsaquo;',
                prevPageLinkText: '&lsaquo; Prev',
                enableHistory: false,
                autoStart: false,
                syncTransitions: true,
                defaultTransitionDuration: 900,
                onSlideChange: function (prevIndex, nextIndex) {

                    this.find('ul.thumbs').children()
                            .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
                            .eq(nextIndex).fadeTo('fast', 1.0);
                },
                onPageTransitionOut: function (callback) {
                    this.fadeTo('fast', 0.0, callback);
                },
                onPageTransitionIn: function () {
                    this.fadeTo('fast', 1.0);
                }
            });


        },

        render: function () {

            var template = $('#images').html();
            //console.log(this.model.toJSON());
            this.$el.html(_.template(template, { images: this.collection.toJSON() }));

            //var self = this;
            //_.defer(function () { self.loadRemixedCollection(self.model); })

           // galery();

            //$('div.navigation').css({ 'float': 'left' });
            //$('div.content').css('display', 'block');

            //var onMouseOutOpacity = 0.67;
            //$('#thumbs ul.thumbs li').opacityrollover({
            //    mouseOutOpacity: onMouseOutOpacity,
            //    mouseOverOpacity: 1.0,
            //    fadeSpeed: 'fast',
            //    exemptionSelector: '.selected'
            //});

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


            return this;

        },
    });