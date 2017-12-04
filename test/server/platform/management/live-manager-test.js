var nock = require('nock');
var expect = require('expect.js');
var LiveManager = require('../../../../src/platform/management/live-manager');
var LivestreamRequest = require('../../../../src/platform/management/requests/livestream-request');
var Configuration = require('../../../../src/platform/configuration/configuration');
var Authenticator = require('../../../../src/platform/authentication/authenticator');
var HTTPClient = require('../../../../src/platform/http/http-client');
var Destination = require('../../../../src/platform/management/job/destination');
var PublishEndpoint = require('../../../../src/platform/management/metadata/publish-endpoint');
var Dvr = require('../../../../src/platform/management/metadata/dvr');
var Geo = require('../../../../src/platform/management/metadata/geo');

var repliesDir = __dirname + '/replies/';

describe('live manager', function() {

    var configuration = new Configuration('manager.com', 'secret', 'appId');
    var authenticator = new Authenticator(configuration);
    var httpClient = new HTTPClient(authenticator);
    var liveManager = new LiveManager(configuration, httpClient);

    var apiServer = nock('https://manager.com/').defaultReplyHeaders({
        'Content-Type': 'application/json'
    });

    afterEach(function() {
        nock.cleanAll();
    });


    it("Publish Endpoint is parsing properly", function(done) {
        apiServer.get('/_api/live/stream/stream_id')
            .once()
            .replyWithFile(200, repliesDir + 'livestream-response.json');

        liveManager.getStream('stream_id', function(error, data) {
            expect(data.publishEndpoint).to.be.an(PublishEndpoint);
            expect(data.publishEndpoint.protocol).to.be('rtmp');

            done();
        });
    });

    it("Geo is parsing properly", function(done) {
        apiServer.get('/_api/live/stream/stream_id')
            .once()
            .replyWithFile(200, repliesDir + 'livestream-response.json');

        liveManager.getStream('stream_id', function(error, data) {
            expect(data.publishEndpoint.geo).to.be.an(Geo);
            expect(data.publishEndpoint.geo.ipAddress).to.be('127.0.0.1');

            done();
        });
    });

    it("DVR is parsing properly", function(done) {
        apiServer.get('/_api/live/stream/stream_id')
            .once()
            .replyWithFile(200, repliesDir + 'livestream-response.json');

        liveManager.getStream('stream_id', function(error, data) {
            expect(data.dvr).to.be.an(Dvr);
            expect(data.dvr.destination).to.be.an(Destination);
            expect(data.dvr.destination.path).to.be('/live');

            done();
        });
    });

    it("Playback URL is parsing properly", function(done) {
        apiServer.get('/_api/live/stream/stream_id')
            .once()
            .replyWithFile(200, repliesDir + 'livestream-response.json');

        liveManager.getStream('stream_id', function(error, data) {
            expect(data.playbackUrls.length).to.be.greaterThan(0);
            expect(data.playbackUrls[0].packageName).to.be('hls');

            done();
        });
    });

    it('Create Live Stream', function (done) {
        apiServer.post('/_api/live/stream')
            .once()
            .replyWithFile(200, repliesDir + 'livestream-response.json');


        var livestreamRequest = new LivestreamRequest()
            .setProtocol("rtmp")
            .setMaxStreamingSec(3600)
            .setGeo( new Geo().setIpAddress("127.0.0.1") )
            .setConnectTimeout(60)
            .setReconnectTimeout(60)
            .setDvr(
                new Dvr().setDestination(
                    new Destination()
                        .setAcl("public")
                        .setPath("/test") ) );


        liveManager.openStream(livestreamRequest, function(error, data) {
            expect(data.id).to.be("stream_id");
            done();
        });
    });

    it('Get Live Stream', function(done) {
        apiServer.get('/_api/live/stream/stream_id')
            .once()
            .replyWithFile(200, repliesDir + 'livestream-response.json');

        liveManager.getStream('stream_id', function(error, data) {
            expect(data.streamType).to.be("live");
            done();
        });
    });

    it('Close Live Stream', function(done) {
        apiServer.delete('/_api/live/stream/stream_id')
            .once()
            .replyWithFile(200, repliesDir + 'livestream-close-response.json');

        liveManager.closeStream('stream_id', function(error, data) {
            expect(data.message).to.be("OK");
            done();
        });
    });

    it("List streams", function(done) {
        apiServer.get('/_api/live/list_streams')
            .once()
            .replyWithFile(200, repliesDir + 'livestream-list-response.json');


        liveManager.listStreams(function(error, data) {
            expect(data.length).to.be(3);
            expect(data[0].id).to.be('stream_id1');
            done();
        });
    })
});