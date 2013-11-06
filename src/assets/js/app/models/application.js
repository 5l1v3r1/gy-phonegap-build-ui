define([
    'backbone',
    'underscore'
], function(B, _) {
    var Application = B.Model.extend({
        parse: function(raw) {
            var data = {
                id: raw.application.id,
                created: new Date(raw.application.created),
                repository_uri: raw.application.repositoryURI,
                package_name: raw.application.applicationConfig.applicationPackage,
                version: raw.application.applicationConfig.applicationVersion,
                phonegap_version: raw.application.applicationConfig.phoneGapversion,
                name: raw.application.applicationConfig.applicationName,
                icon_url: raw.application.iconURL,
                built_targets: raw.builtTargets,
                qr_code_url: raw.application.qrCodeURL
            };

            return data;
        },

        buildDone: function() {
            var statuses = _.pluck(this.get('built_targets'), 'status');

            return _.intersection(statuses, ['STARTED', 'WAITING']).length === 0;
        }
    });

    return Application;
});