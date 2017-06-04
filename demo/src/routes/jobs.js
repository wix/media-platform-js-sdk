var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;
var SearchJobsRequest = require('../../../src/index').job.SearchJobsRequest;

var jobManager = mediaPlatform.jobManager;

module.exports = function(app) {

    app.get('/media-platform/job/:id', function(req, res) {
        jobManager.getJob(req.params.id, function (error, job) {

            if (error) {
                res.status(500).send(error.message);
                return;
            }

            res.send(job);
        });
    });
};
