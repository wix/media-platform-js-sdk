var fs = require('fs');
var UploadRequest = require('../../../src/index').file.UploadRequest;
var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;

var fileUploader = mediaPlatform.fileUploader;
var userId = 'userId';

module.exports = function(app) {

    app.get('/upload/image', function(req, res) {

        var uploadRequest = new UploadRequest().addTags('cat', 'fish');
        fileUploader.uploadImage(userId, __dirname + '/../files/image.jpg', uploadRequest, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });

    });

    app.get('/upload/image/buffer', function(req, res) {

        var uploadRequest = new UploadRequest()
            .addTags('cat', 'fish');
        var buf = fs.readFileSync(__dirname + '/../files/image.jpg');
        fileUploader.uploadImage(userId, buf, uploadRequest, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });

    });

    app.get('/upload/image/stream', function(req, res) {

        var uploadRequest = new UploadRequest()
            .addTags('cat', 'fish');
        var stream = fs.createReadStream(__dirname + '/../files/image.jpg');
        fileUploader.uploadImage(userId, stream, uploadRequest, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });

    });

    app.get('/upload/audio', function(req, res) {

        fileUploader.uploadAudio(userId, __dirname + '/../files/audio.mp3', null, function (error, response) {

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
            .setVideoFormats(['mp4']);

        fileUploader.uploadVideo(userId, __dirname + '/../files/video.mp4', encodingOptions, null, function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/video/buffer', function(req, res) {

        var encodingOptions = new EncodingOptions()
            .setVideoFormats(['mp4']);
            // .setAudioFormat('m4a');
        var uploadRequest = new UploadRequest()
            .setFileName('buf-video.mp4')
            .setContentType('video/mp4');

        var buf = fs.readFileSync(__dirname + '/../files/video.mp4');
        fileUploader.uploadVideo(userId, buf, encodingOptions, uploadRequest, function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/video/stream', function(req, res) {

        var encodingOptions = new EncodingOptions()
            .setVideoFormats(['mp4']);
        // .setAudioFormat('m4a');
        var uploadRequest = new UploadRequest()
            .setFileName('str-video.mp4')
            .setContentType('video/mp4');

        var str = fs.createReadStream(__dirname + '/../files/video.mp4');
        fileUploader.uploadVideo(userId, str, encodingOptions, uploadRequest, function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/document', function(req, res) {

        fileUploader.uploadDocument(userId, __dirname + '/../files/document.xlsx', null, function (error, response) {

            if (error) {
                console.error(error.message);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/error', function(req, res) {

        fileUploader.uploadDocument(userId, 'fish', null, function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });
};
