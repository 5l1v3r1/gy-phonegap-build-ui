define([
    './form',
    'text!tpl/register.html'
], function(FormView, tpl) {
    var RegisterView = FormView.extend({
        template: tpl,

        initialize: function() {
            this.on('register:fail', this.onSubmitFail, this);
        },

        submit: function() {
            var view = this;

            this.model.save({}, {
                error: function(model, xhr) {
                    view.trigger('register:fail', xhr.responseText);
                },
                success: function(model, response) {
                    view.trigger('register:success', response);
                }
            });
        },

        onSubmitFail: function(message) {
            this.$('.alert').html(message).removeClass('hide');
        }
    });

    return RegisterView;
});