define([
    'backbone',
    'underscore',
    './models/user',
    './models/session',
    './views/home',
    './views/login',
    './views/register'
], function(B, _, User, Session, HomeView, LoginView, RegisterView) {
    var Application = B.Router.extend({
        routes: {
            '': 'home',
            login: 'login',
            register: 'register'
        },

        initialize: function() {
            this._configureBackboneValidation();
            this._setBaseUrlForAjaxRequests();
            this._autoRedirectLoginRouteIfForbidden();

            this.user = new User();

            this.views = {
                home: new HomeView(),
                login: new LoginView(),
                register: new RegisterView()
            };

            this.views.home.user = this.user;

            this.views.login.on('login:success', this._onLoginSuccess, this);

            B.history.start();
        },

        _configureBackboneValidation: function() {
            _.extend(B.Model.prototype, B.Validation.mixin);

            _.extend(B.Validation.messages, {
                required: '{0} alanı zorunludur',
                equalTo: '{0} ve {1} alanları aynı olmalıdır',
                pattern: '{0} alanı {1} formatına uygun olmalıdır'
            });

            _.extend(B.Validation.labelFormatters, {
                placeholder: function(attrName) {
                    return B.$('[name="'+attrName+'"]').attr('placeholder');
                }
            });

            B.Validation.configure({
                labelFormatter: 'placeholder'
            });
        },

        _setBaseUrlForAjaxRequests: function() {
            B.$.ajaxPrefilter(function(options) {
                options.url = 'http://162.13.112.150:8080/' + options.url;
                options.xhrFields = {
                    withCredentials: true
                }
            });
        },

        _autoRedirectLoginRouteIfForbidden: function() {
            var me = this;

            B.$(document).ajaxError(function(e, xhr) {
                if (xhr.status === 403) {
                    me.navigate('login', {trigger: true});
                }
            });
        },

        _onLoginSuccess: function(data) {
            this.user.set(data);

            this.navigate('', {trigger: true});
        },

        _render: function(view) {
            B.$('#page-wrapper').html(this.views[view].render().el);
        },

        home: function() {
            this.user.fetch({
                success: _.bind(this._render, this, 'home')
            });
        },

        login: function() {
            this.views.login.model = new Session();

            this._render('login');
        },

        register: function() {
            this.views.register.model = this.user;

            this._render('register');
        }
    });

    return Application;
});