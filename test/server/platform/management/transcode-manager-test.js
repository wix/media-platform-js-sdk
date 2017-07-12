var fs = require('fs');
var nock = require('nock');
var expect = require('expect.js');
var TranscodeManager = require('../../../../src/platform/management/transcode-manager');
var TranscodeRequest = require('../../../../src/platform/management/requests/transcode-request');
var Configuration = require('../../../../src/platform/configuration/configuration');
var Authenticator = require('../../../../src/platform/authentication/authenticator');
var HTTPClient = require('../../../../src/platform/http/http-client');
var Destination = require('../../../../src/platform/management/job/destination');
var Source = require('../../../../src/platform/management/job/source');
var TranscodeSpecification = require('../../../../src/platform/management/job/transcode-specification');
var QualityRange = require('../../../../src/platform/management/job/quality-range');

var repliesDir = __dirname + '/replies/';
var sourcesDir = __dirname + '/../../../sources/';

describe('transcode manager', function() {

    var configuration = new Configuration('manager.com', 'secret', 'appId');
    var authenticator = new Authenticator(configuration);
    var httpClient = new HTTPClient(authenticator);
    var transcodeManager = new TranscodeManager(configuration, httpClient);

    var apiServer = nock('https://manager.com/').defaultReplyHeaders({
        'Content-Type': 'application/json'
    });

    afterEach(function() {
        nock.cleanAll();
    });

    it('transcodeVideo - default', function (done) {
        apiServer.post('/_api/av/transcode')
            .once()
            .replyWithFile(200, repliesDir + 'transcode-response-delete.json');

        var source = new Source();
        source.path = "/test/file.mp4";

        var transcodeSpecification = new TranscodeSpecification();
        transcodeSpecification.destination = new Destination()
                .setDirectory("/test/output1.mp4")
                .setAcl("public");
        transcodeSpecification.qualityRange = new QualityRange({minimum: "240p", maximum: "1440p"});

        var transcodeRequest = new TranscodeRequest()
            .addSource(source)
            .addSpecification(transcodeSpecification);

        transcodeManager.transcodeVideo(transcodeRequest, function(error, data) {
            expect(data.groupId).to.be("fb79405a16434aab87ccbd1384563033");
            done();
        });
    });
});

