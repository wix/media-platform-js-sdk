var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;

module.exports = function(app) {
    
    app.get('/media-platform/auth-header', function (req, res, next) {
        var header = mediaPlatform.getAuthorizationHeader();

        res.send(header);
    });
};