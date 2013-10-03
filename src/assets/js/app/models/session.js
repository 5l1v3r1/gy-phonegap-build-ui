define(['backbone'], function(B) {
    var Session = B.Model.extend({
        url: 'login',

        validation: {
            username: {
                required: true,
                msg: 'Lütfen kullanıcı adınızı girin'
            },
            password: {
                required: true,
                msg: 'Lütfen şifrenizi girin'
            }
        }
    });

    return Session;
});