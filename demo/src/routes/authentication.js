var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;

module.exports = function(app) {

    /**
     * Your own authentication mechanism comes here
     */
    app.get('/media-platform/auth-header', function (req, res, next) {
        /**
         * @description by default, the header authenticates the application
         * @type {{Authorization}}
         */
        var header = mediaPlatform.getAuthorizationHeader();

        res.send(header);
    });
};