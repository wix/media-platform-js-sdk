var expect = require('expect.js');
var fauxJax = require('faux-jax');
var FileAPI = require('file-api');
var HTTPClient = require('../../../public/platform/http/browser-http-client');
var UploadJob = require('../../../public/platform/uploader/upload-job');
var FileUploader = require('../../../public/platform/uploader/browser-file-uploader');
var QueuedFileUploader = require('../../../public/platform/uploader/queued-file-uploader');

describe('queued file uploader', function () {

    this.timeout(50000);

    var configuration = {
        domain: 'www.domain.com',
        authenticationUrl: 'https://www.myapp.com/auth'
    };
    var browserHTTPClient = new HTTPClient(configuration.authenticationUrl);
    var fileUploader = new FileUploader(configuration, browserHTTPClient);
    var queuedFileUploader = new QueuedFileUploader(fileUploader);

    it('uploads a file and reports progress', function (done) {
        setResponse(fileUploadResponse);
        var progress = false;
        queuedFileUploader.queue.drain = function() {
            fauxJax.restore();
            expect(progress).to.be(true);
            done();
        };

        var file = new FileAPI.File('../../sources/image.jpg');
        var uploadJob = new UploadJob()
            .setPath('/fish/file.mp3')
            .setFile(file);
        uploadJob.on('upload-started', function (event) {
        });
        uploadJob.on('upload-progress', function (event) {
            progress = true;
        });
        uploadJob.on('upload-error', function (event) {
        });
        uploadJob.on('upload-success', function (event) {
        });

        queuedFileUploader.enqueue(uploadJob);
    });

    it('can only queue a job once', function (done) {
        setResponse(fileUploadResponse);
        queuedFileUploader.queue.drain = function() {
            fauxJax.restore();
            done();
        };

        var file = new FileAPI.File('../files/image.jpg');
        var uploadJob = new UploadJob().setFile(file);
        uploadJob.on('upload-error', function (event) {
        });
        uploadJob.on('upload-success', function (event) {
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
        });
        uploadJob.on('upload-success', function (event) {
        });

        queuedFileUploader.enqueue(uploadJob);
    });

    var fileUploadResponse = {
        "code": 0,
        "message": "OK",
        "payload":  [{
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
        }]
    };

    function setResponse(responseBody, responseStatus) {

        fauxJax.install();

        fauxJax.on('request', function (request) {

            //console.log(request.requestURL);

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
                        code: 0,
                        message: 'OK',
                        payload: {
                            uploadUrl: 'https://www.domain.com/_api/upload',
                            uploadToken: 'token'
                        }
                    }));
                return;
            }

            if (request.requestURL === 'https://www.domain.com/_api/upload') {
                request.respond(responseStatus || 200, {'Content-Type': 'application/json'}, JSON.stringify(responseBody));
            }
        })
    }
});
