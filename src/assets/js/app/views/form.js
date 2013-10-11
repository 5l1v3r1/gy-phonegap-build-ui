define([
    'backbone',
    'underscore'
], function(B, _) {
    var FormView = B.View.extend({
        events: {
            'blur form input': 'onBlur',
            'submit form': 'beforeSubmit'
        },

        template: '',

        render: function() {
            this.$el.html(this.template);

            return this;
        },

        onBlur: function(e) {
            var el = B.$(e.currentTarget);

            var errorMessage = this.model.preValidate(el.attr('name'), el.val());
            var hasError = !!errorMessage;

            el.closest('.form-group')
                .toggleClass('has-error', hasError)
                .toggleClass('has-success', !hasError)
              .find('.help-block:first')
                .html(errorMessage);
        },

        beforeSubmit: function(e) {
            e.preventDefault();

            var form = B.$(e.currentTarget);
            var data = form.serializeObject();

            this.model.set(data);

            var errorMessages = this.model.validate();

            if (errorMessages) {
                _.each(errorMessages, function(error, attrName) {
                    var el = B.$('[name="'+attrName+'"]');

                    el.closest('.form-group')
                        .addClass('has-error')
                      .find('.help-block:first')
                        .html(error);
                });
            } else {
                this.submit();
            }
        },

        submit: function() {
            throw new Error('needs to be implemented');
        }
    });

    return FormView;
});