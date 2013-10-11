define([
    './form',
    'text!tpl/login.html'
], function(FormView, tpl) {
    var LoginView = FormView.extend({
        template: tpl,

        initialize: function() {
            this.on('login:fail', this.onSubmitFail, this);
        },

        submit: function() {
            var view = this;

            this.model.save({}, {
                error: function(model, xhr) {
                    view.trigger('login:fail', xhr.responseText);
                },
                success: function(model, response) {
                    view.trigger('login:success', response);
                }
            });
        },

        onSubmitFail: function(message) {
            this.$('.alert').html(message).removeClass('hide');
        }
    });

    return LoginView;
});