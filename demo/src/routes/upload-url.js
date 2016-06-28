var MediaPlatform = require('../../../src/index').MediaPlatform;

var apiKey = 'ggl-109789773458215503884';
var mediaPlatform = new MediaPlatform({
    domain: 'app.wixmp.com',
    apiKey: apiKey,
    sharedSecret: '6c736264899646d3b370a409bb6a840c'
});

module.exports = function(app) {

    app.get('/upload/:mediaType/credentials', function(req, res, next) {

        var mediaType = req.params.mediaType;
        
        mediaPlatform.fileUploader.getUploadUrl(apiKey, mediaType, function (error, uploadCredentials) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(uploadCredentials);
        });
    });
};