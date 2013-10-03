define([
    './form',
    'text!tpl/register.html'
], function(FormView, tpl) {
    var RegisterView = FormView.extend({
        template: tpl,

        submit: function() {
            this.model.save({}, {
                error: function() {
                    console.log('error', arguments);
                },
                success: function() {
                    console.log('success', arguments);
                }
            });
        }
    });

    return RegisterView;
});