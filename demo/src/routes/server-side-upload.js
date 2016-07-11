var fs = require('fs');
var MediaPlatform = require('../../../src/index').MediaPlatform;
var EncodingOptions = require('../../../src/index').video.EncodingOptions;
var UploadRequest = require('../../../src/index').file.UploadRequest;

var fileUploader = new MediaPlatform({
    domain: 'app.wixmp.com',
    apiKey: 'ggl-109789773458215503884',
    sharedSecret: '6c736264899646d3b370a409bb6a840c'
}).fileUploader;

module.exports = function(app) {

    app.get('/upload/image', function(req, res) {

        var uploadRequest = new UploadRequest().addTags('cat', 'fish');
        fileUploader.uploadImage(__dirname + '/../files/image.jpg', uploadRequest, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });

    });

    app.get('/upload/image/buffer', function(req, res) {

        var uploadRequest = new UploadRequest()
            .setFileName('buf-image.jpg')
            .addTags('cat', 'fish');
        var buf = fs.readFileSync(__dirname + '/../files/image.jpg');
        fileUploader.uploadImage(buf, uploadRequest, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });

    });

    app.get('/upload/image/stream', function(req, res) {

        var uploadRequest = new UploadRequest()
            .setFileName('str-image.jpg')
            .setContentType('image/jpeg')
            .addTags('cat', 'fish');
        var stream = fs.createReadStream(__dirname + '/../files/image.jpg');
        fileUploader.uploadImage(stream, uploadRequest, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });

    });

    app.get('/upload/audio', function(req, res) {

        fileUploader.uploadAudio(__dirname + '/../files/audio.mp3', null, function (error, response) {

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

        fileUploader.uploadVideo(__dirname + '/../files/video.mp4', encodingOptions, null, function (error, response) {

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
        fileUploader.uploadVideo(buf, encodingOptions, uploadRequest, function (error, response) {

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
        fileUploader.uploadVideo(str, encodingOptions, uploadRequest, function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/document', function(req, res) {

        fileUploader.uploadDocument(__dirname + '/../files/document.xlsx', null, function (error, response) {

            if (error) {
                console.error(error.message);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/error', function(req, res) {

        fileUploader.uploadDocument('fish', null, function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });
};
