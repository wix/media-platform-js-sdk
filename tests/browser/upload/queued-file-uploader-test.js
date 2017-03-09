var expect = require('expect.js');
var fauxJax = require('faux-jax');
var FileAPI = require('file-api');
var MP = require('../../../public/index');
var UploadJob = require('../../../public/platform/uploader/upload-job');

describe('queued file uploader', function () {

    this.timeout(50000);

    function setResponse(responseBody, responseStatus) {

        fauxJax.install();

        fauxJax.on('request', function (request) {

            console.log(request.requestURL);

            if (request.requestURL === 'https://www.myapp.com/auth') {
                request.respond(200, {'Content-Type': 'application/json'},
                    JSON.stringify({
                        Authorization: 'auth'
                    })
                );
                return;
            }

            if (request.requestURL.indexOf('https://www.domain.com/_api/upload/url') == 0) {
                request.respond(200, {'Content-Type': 'application/json'},
                    JSON.stringify({
                        uploadUrl: 'https://www.domain.com/_api/upload'
                    }));
                return;
            }

            if (request.requestURL === 'https://www.domain.com/_api/upload') {
                request.respond(responseStatus || 200, {'Content-Type': 'application/json'}, JSON.stringify(responseBody));
            }
        })
    }

    var mediaPlatform = new MP.MediaPlatform({
        domain: 'www.domain.com',
        authenticationUrl: 'https://www.myapp.com/auth'
    });
    var queuedFileUploader = mediaPlatform.queuedFileUploader;

    it('uploads a file and reports progress', function (done) {
        setResponse(fileDescriptorResponse);
        var progress = false;
        queuedFileUploader.queue.drain = function() {
            fauxJax.restore();
            expect(progress).to.be(true);
            done();
        };

        var file = new FileAPI.File('../../sources/image.jpg');
        var uploadJob = new UploadJob().setFile(file);
        uploadJob.on('upload-started', function (event) {
            console.log(event.target);
        });
        uploadJob.on('upload-progress', function (event) {
            // console.log(JSON.stringify(event, null, 2));
            progress = true;
        });
        uploadJob.on('upload-error', function (event) {
            // console.log(JSON.stringify(event, null, 2));
        });
        uploadJob.on('upload-success', function (event) {
            // console.log(JSON.stringify(event, null, 2));
        });

        queuedFileUploader.enqueue(uploadJob);
    });

    it('can only queue a job once', function (done) {
        setResponse(fileDescriptorResponse);
        queuedFileUploader.queue.drain = function() {
            fauxJax.restore();
            done();
        };

        var file = new FileAPI.File('../files/image.jpg');
        var uploadJob = new UploadJob().setFile(file);
        uploadJob.on('upload-error', function (event) {
            // console.log(event);
        });
        uploadJob.on('upload-success', function (event) {
            // console.log('done');
        });

        queuedFileUploader.enqueue(uploadJob);
        queuedFileUploader.enqueue(uploadJob);
        expect(queuedFileUploader.length()).to.be(1);
    });

    it('handles errors', function (done) {
        setResponse({error: 'fish'}, 500);
        queuedFileUploader.queue.drain = function() {
            fauxJax.restore();
            done();
        };

        var file = new FileAPI.File('../files/file.json');
        var uploadJob = new UploadJob().setFile(file);
        uploadJob.on('upload-error', function (event) {
            console.log(event);
        });
        uploadJob.on('upload-success', function (event) {
            console.log(event);
        });

        queuedFileUploader.enqueue(uploadJob);
    });

    var fileDescriptorResponse = {
        "code": 0,
        "message": "OK",
        "payload":  {
            "mimeType": "text/plain",
            "hash": "d41d8cd98f00b204e9800998ecf8427e",
            "parent": "/",
            "dateCreated": "2017-02-20T14:23:42Z",
            "path": "/place-holder.txt",
            "id": "d0e18fd468cd4e53bc2bbec3ca4a8676",
            "size": 0,
            "ancestors": ["/"],
            "acl": "public",
            "dateUpdated": "2017-02-20T14:23:42Z",
            "type": "-"
        }
    };
});
