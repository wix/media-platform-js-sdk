var MediaPlatform = require('../../../src/index').MediaPlatform;

var mediaPlatform = new MediaPlatform({
    domain: 'app.wixmp.com',
    apiKey: 'ggl-109789773458215503884',
    sharedSecret: '6c736264899646d3b370a409bb6a840c'
});

var fileUploader = mediaPlatform.fileUploader;

module.exports = function(app) {

    app.get('/upload/:mediaType/credentials', function(req, res) {

        var mediaType = req.params.mediaType;
        
        fileUploader.getUploadUrl(mediaType, function (error, uploadCredentials) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(uploadCredentials);
        });
    });
};