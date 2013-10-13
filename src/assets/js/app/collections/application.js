define([
    'backbone',
    '../models/application'
], function(B, Application) {
    var ApplicationCollection = B.Collection.extend({
        model: Application,
        url: 'application'
    });

    return ApplicationCollection;
});