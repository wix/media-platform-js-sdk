var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;
var ListFilesRequest = require('../../../src/index').file.ListFilesRequest;
var ImportFileRequest = require('../../../src/index').file.ImportFileRequest;
var Destination = require('../../../src/index').file.Destination;

var fileManager = mediaPlatform.fileManager;

module.exports = function(app) {

    app.get('/media-platform/file/upload/url', function(req, res) {
        fileManager.getUploadUrl(null, function (error, uploadCredentials) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(uploadCredentials);
        });
    });

    app.get('/media-platform/file/upload', function(req, res) {
        var rand = Math.floor((Math.random() * 100000) + 1);
        fileManager.uploadFile('/demo/' + rand + '.image.jpg', __dirname + '/../files/image.jpg', null, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });

    });

    app.get('/media-platform/files', function(req, res) {
        var listFilesRequest = new ListFilesRequest().setPageSize(3);
        fileManager.listFiles('/demo', listFilesRequest, function (error, listFilesResponse) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(listFilesResponse);
        });
    });

    app.get('/media-platform/file/:id/metadata', function(req, res) {
        fileManager.getFileMetadataById(req.params.id, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/media-platform/file/download/url', function(req, res) {
        var url = mediaPlatform.getDownloadUrl(req.query.path, null);

        res.send(url);
    });

    app.get('/media-platform/file/import', function(req, res) {
        var rand = Math.floor((Math.random() * 100000) + 1);
        var importFileRequest = new ImportFileRequest()
            .setSourceUrl('https://static.wixstatic.com/media/f31d7d0cfc554aacb1d737757c8d3f1b.jpg')
            .setDestination(new Destination()
                .setPath('/demo/import/' + rand + '.image.jpg')
                .setAcl('public'));

        fileManager.importFile(importFileRequest, function (error, response) {
            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });
};
