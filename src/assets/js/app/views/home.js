define([
    'backbone',
    'underscore',
    'text!tpl/home.html'
], function(B, _, tpl) {
    var HomeView = B.View.extend({
        render: function() {
            this.$el.html(_.template(tpl, this.model.toJSON()));

            return this;
        }
    });

    return HomeView;
});