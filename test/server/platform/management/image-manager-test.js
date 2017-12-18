var nock = require('nock');
var expect = require('expect.js');
var FileDescriptor = require('../../../../src/platform/management/metadata/file-descriptor');
var Image = require('../../../../src/image/image');
var ImageManager = require('../../../../src/platform/management/image-manager');
var Source = require('../../../../src/platform/management/job/source');
var Destination = require('../../../../src/platform/management/job/destination');
var ImageOperationSpecification = require('../../../../src/platform/management/job/image-operation-specification');
var ImageOperationRequest = require('../../../../src/platform/management/requests/image-operation-request');
var Configuration = require('../../../../src/platform/configuration/configuration');
var Authenticator = require('../../../../src/platform/authentication/authenticator');
var HTTPClient = require('../../../../src/platform/http/http-client');

var repliesDir = __dirname + '/replies/';

describe('image manager', function() {

    var configuration = new Configuration('manager.com', 'secret', 'appId');
    var authenticator = new Authenticator(configuration);
    var httpClient = new HTTPClient(authenticator);
    var imageManager = new ImageManager(configuration, httpClient);

    var apiServer = nock('https://manager.com/').defaultReplyHeaders({
        'Content-Type': 'application/json'
    });

    afterEach(function() {
        nock.cleanAll();
    });

    it('perform image operation', function (done) {

        apiServer.post('/_api/images/operations')
            .once()
            .query(true)
            .replyWithFile(200, repliesDir + 'file-descriptor-response.json');

        var source = new Source().setPath('/fish.png');
        var fileDescriptor = new FileDescriptor({
            id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
            hash: 'd41d8cd98f00b204e9800998ecf8427e',
            path: '/orig.png',
            mimeType: 'image/png',
            type: '-',
            size: 0,
            acl: 'private',
            dateCreated: '2017-02-20T14:23:42Z',
            dateUpdated: '2017-02-20T14:23:42Z'
        });
        var command = new Image(fileDescriptor).fit(100, 200).toCommand().command;
        var destination = new Destination().setPath('/orig.thumb.png').setAcl('private');
        var specification = new ImageOperationSpecification().setCommand(command).setDestination(destination);
        var request = new ImageOperationRequest(source, specification);

        imageManager.imageOperation(request, function (error, data) {
            expect(data).to.eql({
                id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
                hash: 'd41d8cd98f00b204e9800998ecf8427e',
                path: '/place-holder.txt',
                mimeType: 'text/plain',
                type: '-',
                size: 0,
                acl: 'public',
                dateCreated: '2017-02-20T14:23:42Z',
                dateUpdated: '2017-02-20T14:23:42Z'
            });
            done(error);
        });
    });
});

