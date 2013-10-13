define([
    'backbone',
    'underscore',
    'text!tpl/home.html',
    './create-app',
    '../collections/application',
    '../models/application',
    './application'
], function(B, _, tpl, CreateAppFormView, Apps, App, AppView) {
    var HomeView = B.View.extend({
        events: {
            'click .new-app-btn': 'showNewAppForm'
        },

        initialize: function() {
            this.apps = new Apps();

            this.listenTo(this.apps, 'add', this.addOne);
            this.listenTo(this.apps, 'reset', this.addAll);

            this.createAppFormView = new CreateAppFormView();

            this.createAppFormView.on('submit:success', function(data) {
                this.apps.add([data], {parse: true});

                this.createAppFormView.hide();
            }, this);

        },

        showNewAppForm: function() {
            this.createAppFormView.show();
        },

        render: function() {
            this.apps.fetch();

            this.$el.html(_.template(tpl, {
                user: this.user.toJSON()
            }));

            this.$('.page').append(this.createAppFormView.render().el);

            return this;
        },

        addOne: function(app) {
            var view = new AppView({model: app});

            this.$('#apps-list').prepend(view.render().el);
        },

        addAll: function() {
            this.apps.each(this.addOne, this);
        }
    });

    return HomeView;
});