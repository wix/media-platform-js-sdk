var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;

var fileManager = mediaPlatform.fileManager;
var userId = 'userId';

module.exports = function(app) {

    app.get('/files', function(req, res) {
        fileManager.listFiles(userId, null, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

    app.get('/file/:id', function(req, res) {
        fileManager.getFile(userId, req.params.id, function (error, response) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(response);
        });
    });

};
