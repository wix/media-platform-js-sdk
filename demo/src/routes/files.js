var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;

var fileManager = mediaPlatform.fileManager;

module.exports = function(app) {

    app.get('/media-platform/files', function(req, res) {
        fileManager.listFiles('/demo', null, function (error, listFilesResponse) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(listFilesResponse);
        });
    });

    app.get('/media-platform/file', function(req, res) {
        fileManager.getFile(req.params.path, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/media-platform/file/upload', function(req, res) {
        var rand = Math.floor((Math.random() * 100000) + 1);
        fileManager.uploadFile('/demo/' + rand + '.image.jpg', __dirname + '/../files/image.jpg', null, function (error, response) {
            console.log(arguments);
            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });

    });

    app.get('/media-platform/file/upload/url', function(req, res) {
        fileManager.getUploadUrl(null, function (error, uploadCredentials) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(uploadCredentials);
        });
    });

};
