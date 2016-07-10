var MediaPlatform = require('../../../src/index').MediaPlatform;

var mediaPlatform = new MediaPlatform({
    domain: 'app.wixmp.com',
    apiKey: 'ggl-109789773458215503884',
    sharedSecret: '6c736264899646d3b370a409bb6a840c'
});

module.exports = function(app) {
    
    app.get('/media-platform/auth-header', function (req, res, next) {

        mediaPlatform.getAuthenticationHeader(function (error, header) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(header);
        });
    });
};