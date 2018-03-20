var nock = require('nock');
var expect = require('expect.js');
var TranscodeManager = require('../../../../src/platform/management/transcode-manager');
var TranscodeRequest = require('../../../../src/platform/management/requests/transcode-request');
var ExtractPosterRequest = require('../../../../src/platform/management/requests/extract-poster-request');
var ExtractStoryboardRequest = require('../../../../src/platform/management/requests/extract-storyboard-request');
var Configuration = require('../../../../src/platform/configuration/configuration');
var Authenticator = require('../../../../src/platform/authentication/authenticator');
var HTTPClient = require('../../../../src/platform/http/http-client');
var Destination = require('../../../../src/platform/management/job/destination');
var Source = require('../../../../src/platform/management/job/source');
var TranscodeSpecification = require('../../../../src/platform/management/job/transcode-specification');
var ExtractPosterSpecification = require('../../../../src/platform/management/job/extract-poster-specification');
var ExtractStoryboardSpecification = require('../../../../src/platform/management/job/extract-storyboard-specification');
var QualityRange = require('../../../../src/platform/management/job/quality-range');

var repliesDir = __dirname + '/replies/';

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
            .replyWithFile(200, repliesDir + 'transcode-response.json');

        var source = new Source();
        source.path = "/test/file.mp4";

        var transcodeSpecification = new TranscodeSpecification();
        transcodeSpecification.destination = new Destination()
                .setDirectory("/test/output/")
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


    it('extractPoster - default', function (done) {
        apiServer.post('/_api/av/poster')
            .once()
            .replyWithFile(200, repliesDir + 'extract-poster-response.json');

        var source = new Source();
        source.path = "/test/file.mp4";

        var extractPosterSpecification = new ExtractPosterSpecification();
        extractPosterSpecification.destination = new Destination()
                .setDirectory("/test/output/")
                .setAcl("public");
        extractPosterSpecification.setFormat("jpg");
        extractPosterSpecification.setSecond(5);

        var extractPosterRequest = new ExtractPosterRequest()
            .addSource(source)
            .addSpecification(extractPosterSpecification);

        transcodeManager.extractPoster(extractPosterRequest, function(error, data) {
            expect(data.groupId).to.be("31325609b28541e6afea56d0dd7649ba");
            done();
        });
    });

    it('extractStoryboard - default', function (done) {
        apiServer.post('/_api/av/storyboard')
            .once()
            .replyWithFile(200, repliesDir + 'extract-storyboard-response.json');

        var source = new Source();
        source.path = "/test/file.mp4";

        var extractStoryboardSpecification = new ExtractStoryboardSpecification();
        extractStoryboardSpecification.destination = new Destination()
                .setDirectory("/test/output/")
                .setAcl("public");
        extractStoryboardSpecification.setFormat("jpg");
        extractStoryboardSpecification.setColumns(5);
        extractStoryboardSpecification.setRows(5);
        extractStoryboardSpecification.setTileWidth(100);
        extractStoryboardSpecification.setTileHeight(50);

        var extractStoryboardRequest = new ExtractStoryboardRequest()
            .addSource(source)
            .addSpecification(extractStoryboardSpecification);

        transcodeManager.extractStoryboard(extractStoryboardRequest, function(error, data) {
            expect(data.groupId).to.be("dd35054a57a0490aa67251777e0f9386");
            done();
        });
    });
});