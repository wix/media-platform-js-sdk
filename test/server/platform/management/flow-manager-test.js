var nock = require('nock');
var expect = require('expect.js');
var FlowManager = require('../../../../src/platform/management/flow-manager');
var Configuration = require('../../../../src/platform/configuration/configuration');
var Authenticator = require('../../../../src/platform/authentication/authenticator');
var HTTPClient = require('../../../../src/platform/http/http-client');
var ImportFileRequest = require('../../../../src/platform/management/requests/import-file-request');
var TranscodeRequest = require('../../../../src/platform/management/requests/transcode-request');
var CreateFlowRequest = require('../../../../src/platform/management/requests/create-flow-request');
var Destination = require('../../../../src/platform/management/job/destination');
var Source = require('../../../../src/platform/management/job/source');
var TranscodeSpecification = require('../../../../src/platform/management/job/transcode-specification');
var QualityRange = require('../../../../src/platform/management/job/quality-range');
var Invocation = require('../../../../src/platform/management/metadata/invocation');
var FlowComponent = require('../../../../src/platform/management/metadata/flow-component');

var repliesDir = __dirname + '/replies/';

describe('flow manager', function() {

    var configuration = new Configuration('manager.com', 'secret', 'appId');
    var authenticator = new Authenticator(configuration);
    var httpClient = new HTTPClient(authenticator);
    var flowManager = new FlowManager(configuration, httpClient);

    var apiServer = nock('https://manager.com/').defaultReplyHeaders({
        'Content-Type': 'application/json'
    });

    afterEach(function() {
        nock.cleanAll();
    });


    it("Get flow request is parsing properly", function(done) {
        apiServer.get('/_api/flow_control/flow/flow_id')
            .once()
            .replyWithFile(200, repliesDir + 'get-flow-response.json');

        flowManager.getFlow('flow_id', function(error, data) {
            expect(data.invocation).to.be.an(Invocation);
            expect(data.invocation.entryPoints).to.be.an(Array);
            expect(data.invocation.entryPoints[0]).to.be("import");
            expect(data.flow.import.type).to.be("file.import");

            done();
        });
    });

    it('Create Flow', function (done) {
        apiServer.post('/_api/flow_control/flow')
            .once()
            .replyWithFile(200, repliesDir + 'get-flow-response.json');


        var invocation = new Invocation()
            .addSource(new Source().setPath("/to/here/file.mp4"))
            .addEntryPoint("import");

        var importFileRequest = new ImportFileRequest()
            .setDestination(new Destination().setPath('/to/here/file.mp4'))
            .setSourceUrl('http://from/here/file.mp4');

        var importComponent = new FlowComponent()
            .setType('file.import')
            .setSpecification(importFileRequest)
            .addSuccessor('transcode');

        var transcodeSpecification = new TranscodeSpecification()
            .setDestination(new Destination()
                .setDirectory("/test/output/")
                .setAcl("public")
            ).setQualityRange(QualityRange({minimum: "240p", maximum: "1440p"} ));

        var transcodeComponent = new FlowComponent()
            .setType('av.transcode')
            .setSpecification(transcodeSpecification)
            .setSuccessors([]);

        var createFlowRequest = new CreateFlowRequest()
            .setInvocation(invocation)
            .addFlowComponent("import", importComponent)
            .addFlowComponent("transcode", transcodeComponent);


        flowManager.createFlow(createFlowRequest, function(error, data) {
            expect(data.id).to.be("flow_id");
            done();
        });
    });

    it('Delete Flow', function(done) {
        apiServer.delete('/_api/flow_control/flow/flow_id')
            .once()
            .replyWithFile(200, repliesDir + 'flow-delete-response.json');

        flowManager.deleteFlow('flow_id', function(error, data) {
            expect(data.message).to.be("OK");
            done();
        });
    });

});