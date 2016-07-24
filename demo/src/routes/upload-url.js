var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;

var fileUploader = mediaPlatform.fileUploader;
var userId = 'userId';

module.exports = function(app) {

    app.get('/upload/:mediaType/credentials', function(req, res) {

        var mediaType = req.params.mediaType;
        
        fileUploader.getUploadUrl(userId, mediaType, function (error, uploadCredentials) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(uploadCredentials);
        });
    });
};