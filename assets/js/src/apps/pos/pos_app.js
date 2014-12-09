POS.module('POSApp', function(POSApp, POS, Backbone, Marionette, $, _) {

    POSApp.startWithParent = false;

    POSApp.channel = Backbone.Radio.channel('pos');

    // API
    var API = {
        init: function(){
            // check registry for products controller
            _(POS._registry).any( function( controller ){
                if ( controller instanceof POSApp.Products.Controller ){
                    return controller;
                };
            });

            return new POSApp.Products.Controller();
        },
        cart: function(id) {

            // the products controller has the two column layout
            var productsController = this.init();
            var region = productsController.columnsLayout.rightRegion;

            // init cart
            var controller = new POSApp.Cart.Controller({ id: id, region: region });

            //
            POSApp.channel.trigger('init:cart', controller);
        },
        checkout: function() {
            this.init();
            new POSApp.Checkout.Controller();
        },
        receipt: function() {
            this.init();
            new POSApp.Receipt.Controller();
        }
    };

    // add routes
    POS.addInitializer( function(){
        new Marionette.AppRouter({
            controller: API,
            appRoutes: {
                '' : 'cart',
                'cart' : 'cart',
                'cart/:id' : 'cart',
                'checkout' : 'checkout',
                'checkout/:id' : 'checkout',
                'receipt/:id' : 'receipt'
            }
        });
    });

    // radio API
    POSApp.channel.comply( 'show:cart', function(id) {
        id ? POS.navigate('cart/' + id) : POS.navigate('') ;
        API.cart(id);
    });

    POSApp.channel.comply( 'show:checkout', function(id) {
        id ? POS.navigate('checkout/' + id) : POS.navigate('checkout') ;
        API.checkout(id);
    });

    POSApp.channel.comply( 'show:receipt', function(id) {
        id ? POS.navigate('receipt/' + id) : POS.navigate('receipt') ;
        API.receipt(id);
    });

});