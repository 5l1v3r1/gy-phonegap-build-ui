require.config({
    baseUrl: 'assets',
    paths: {
        config: '../config.json',
        tpl: '../templates',
        text: 'vendor/requirejs-text/text',
        jquery: 'vendor/jquery/jquery',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone',
        'backbone-validation': 'vendor/backbone-validation/dist/backbone-validation-amd',
        bootstrap: 'vendor/bootstrap/dist/js/bootstrap'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        bootstrap: ['jquery']
    }
});

require([
    'js/app/application',
    'js/plugins',
    'bootstrap',
    'backbone-validation'
], function(Application) {
    new Application();
});
