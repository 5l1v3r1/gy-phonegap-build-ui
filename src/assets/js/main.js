require.config({
    baseUrl: 'assets',
    paths: {
        tpl: '../templates',
        text: 'vendor/requirejs-text/text',
        jquery: 'vendor/jquery/jquery',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone',
        'backbone-validation': 'vendor/backbone-validation/dist/backbone-validation-amd'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'js/app/application': [
            'js/plugins',
            'backbone-validation'
        ]
    }
});

require(['js/app/application'], function(Application) {
    new Application();
});
