var MediaPlatform = require('../../../src/index').MediaPlatform;

var apiKey = 'ggl-109789773458215503884';
var fileUploader = new MediaPlatform({
    domain: 'app.wixmp.com',
    apiKey: apiKey,
    sharedSecret: '6c736264899646d3b370a409bb6a840c'
}).fileUploader;

module.exports = function(app) {

    app.get('/upload/image', function(req, res) {

        fileUploader.uploadImage(apiKey, __dirname + '/../files/image.jpg', function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/audio', function(req, res) {

        fileUploader.uploadAudio(apiKey, __dirname + '/../files/audio.mp3', function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/video', function(req, res) {

        fileUploader.uploadVideo(apiKey, __dirname + '/../files/video.mp4', null, function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/upload/document', function(req, res) {

        fileUploader.uploadDocument(apiKey, __dirname + '/../files/document.xlsx', function (error, response) {

            if (error) {
                console.error(error);
                res.status(500).send(error.message);
                return;
            }
            
            res.send(response);
        });
    });
};