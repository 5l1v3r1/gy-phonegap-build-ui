define([
    'backbone',
    './form',
    'text!tpl/forms/create-app.html'
], function(B, FormView, tpl) {
    var CreateAppView = FormView.extend({

        template: tpl,

        initialize: function() {
            this.model = new (B.Model.extend({
                validation: {
                    repo_uri: {
                        required: true,
                        pattern: 'url'
                    }
                }
            }));

            this.on('submit:fail', this._onSubmitFailed, this);
        },

        _onSubmitFailed: function(message) {
            this.$('.alert').html(message).removeClass('hide');
        },

        show: function() {
            this.$('.modal').modal('show');
        },

        hide: function() {
            this.$('.modal').modal('hide');
        },

        submit: function() {
            var view = this;

            this.model.url = 'application?sourceUri=' + this.model.get('repo_uri');

            this.model.save({}, {
                error: function(model, xhr) {
                    view.trigger('submit:fail', xhr.responseText);
                },
                success: function(model, response) {
                    view.trigger('submit:success', response);
                }
            });
        }
    });

    return CreateAppView;
});