define(['backbone'], function(B) {
    var User = B.Model.extend({
        url: 'user',

        validation: {
            name: {
                required: true
            },
            surname: {
                required: true
            },
            email: {
                required: true,
                pattern: 'email'
            },
            username: {
                required: true
            },
            password: {
                required: true
            }
        }
    });

    return User;
});