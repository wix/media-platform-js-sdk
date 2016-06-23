var MediaPlatform = require('../../../src/index').MediaPlatform;

var apiKey = 'ggl-109789773458215503884';
var mediaPlatform = new MediaPlatform({
    domain: 'app.wixmp.com',
    apiKey: apiKey,
    sharedSecret: '6c736264899646d3b370a409bb6a840c'
});

module.exports = function(app) {

    app.get('/upload/url', function(req, res, next) {

        mediaPlatform.fileUploader.getUploadUrl(apiKey, function (error, uploadUrl) {

            if (error) {
                console.error(error);
                res.status(500).send(error);
                return;
            }

            res.send(uploadUrl.uploadUrl);
        });
    });
};