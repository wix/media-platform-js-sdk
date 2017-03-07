var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;

var fileUploader = mediaPlatform.fileUploader;
var userId = 'userId';

module.exports = function(app) {

    app.get('/upload/urlAndToken', function(req, res) {
        fileUploader.getUploadUrl(userId, mediaType, function (error, uploadCredentials) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(uploadCredentials);
        });
    });
};