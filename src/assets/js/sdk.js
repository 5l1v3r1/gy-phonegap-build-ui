define(['jquery'], function($) {
    var Builder = function() {
        this.URI = 'http://162.13.112.150:8080';
    };

    Builder.prototype.getEndPoint = function(path) {
        return this.URI + path;
    };

    Builder.prototype.isLoggedIn = function() {
        return false;
    };

    Builder.prototype.request = function(path, method, params, callback) {
        $.ajax({
            url: this.getEndPoint(path),
            type: method,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(params),
            xhrFields: {
                withCredentials: true
            }
        })
        .done(callback)
        .fail(callback);
    };

    Builder.prototype.login = function(username, password, callback) {
        this.request('/login', 'post', {
            username: username,
            password: password
        }, callback);
    };

    return new Builder();
});