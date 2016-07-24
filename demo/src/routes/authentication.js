var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;

var userId = 'userId';

module.exports = function(app) {
    
    app.get('/media-platform/auth-header', function (req, res, next) {

        mediaPlatform.getAuthenticationHeader(userId, function (error, header) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(header);
        });
    });
};