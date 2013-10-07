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

            this.user = new User();

            this.views = {
                home: new HomeView(),
                login: new LoginView(),
                register: new RegisterView()
            };

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

        _onLoginSuccess: function(data) {
            this.user.set(data);

            this.navigate('', {trigger: true});
        },

        render: function(view) {
            B.$('#page-wrapper').html(this.views[view].render().el);
        },

        home: function() {
            var me = this;

            this.user.fetch({
                error: function() {
                    me.navigate('login', {trigger: true});
                },
                success: function() {
                    me.views.home.model = me.user;

                    me.render('home');
                }
            });
        },

        login: function() {
            this.views.login.model = new Session();

            this.render('login');
        },

        register: function() {
            this.views.register.model = this.user;

            this.render('register');
        }
    });

    return Application;
});