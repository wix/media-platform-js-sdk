var MediaPlatform = require('../../../src/index').MediaPlatform;
var EncodingOptions = require('../../../src/index').EncodingOptions;
var MetadataDTO = require('../../../src/index').MetadataDTO;

var apiKey = 'ggl-109789773458215503884';
var fileUploader = new MediaPlatform({
    domain: 'app.wixmp.com',
    apiKey: apiKey,
    sharedSecret: '6c736264899646d3b370a409bb6a840c'
}).fileUploader;

module.exports = function(app) {

    app.get('/upload/image', function(req, res) {

        var metadata = new MetadataDTO().addTags('cat', 'fish');
        fileUploader.uploadImage(apiKey, __dirname + '/../files/image.jpg', metadata, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });

    });

    app.get('/upload/audio', function(req, res) {

        fileUploader.uploadAudio(apiKey, __dirname + '/../files/audio.mp3', null, function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/video', function(req, res) {

        var encodingOptions = new EncodingOptions()
            .videoFormats(['mp4', 'webm', 'ogv'])
            .audioFormat('m4a');

        fileUploader.uploadVideo(apiKey, __dirname + '/../files/video.mp4', encodingOptions, null, function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/document', function(req, res) {

        fileUploader.uploadDocument(apiKey, __dirname + '/../files/document.xlsx', null, function (error, response) {

            if (error) {
                console.error(error.message);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/error', function(req, res) {

        fileUploader.uploadDocument(apiKey, 'fish', null, function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });
};
