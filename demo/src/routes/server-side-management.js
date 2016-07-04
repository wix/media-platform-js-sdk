var MediaPlatform = require('../../../src/index').MediaPlatform;

var fileManager = new MediaPlatform({
    domain: 'app.wixmp.com',
    apiKey: 'ggl-109789773458215503884',
    sharedSecret: '6c736264899646d3b370a409bb6a840c'
}).fileManager;

module.exports = function(app) {

    app.get('/files', function(req, res) {
        fileManager.listFiles(null, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/file/:id', function(req, res) {
        fileManager.getFile(req.params.id, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/file/:id', function(req, res) {
        
        fileManager.updateFile(req.params.id, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });
};
