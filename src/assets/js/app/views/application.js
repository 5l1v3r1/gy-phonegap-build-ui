define([
    'backbone',
    'underscore',
    'text!tpl/app-box.html',
    'js/config'
], function(B, _, tpl, config) {
    var AppView = B.View.extend({
        template: _.template(tpl),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);

            if (!this.model.buildDone()) {
                this.listenTo(this.model, 'change', this.isBuildCompleted);

                this.setModelSyncTimer();
            }

        },

        render: function() {
            this.$el.html(this.template({
                base_url: config.service_url,
                app: this.model.toJSON()
            }));

            return this;
        },

        setModelSyncTimer: function() {
            var model = this.model;

            setTimeout(function() {
                model.fetch();
            }, 5000);
        },

        isBuildCompleted: function() {
            var model = this.model;

            if (!model.buildDone()) {
                this.setModelSyncTimer();
            } else {
                this.stopListening(model, 'sync', this.isBuildCompleted);
            }
        }
    });

    return AppView;
});