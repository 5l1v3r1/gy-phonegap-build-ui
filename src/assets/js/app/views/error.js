define([
    'backbone',
    'text!tpl/error.html'
], function(B, tpl) {
    var ErrorView = B.View.extend({
        events: {
            'click .js-reload': 'reload'
        },

        el: tpl,

        initialize: function() {
            var me = this;

            B.$('body').append(me.el);

            B.$(document).ajaxError(function(e, xhr) {
                if (xhr.status === 404) {
                    me.$el.modal('show');
                }
            });
        },

        reload: function() {
            window.location.reload();
        }
    });

    return ErrorView;
});