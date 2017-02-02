var nock = require('nock');
var expect = require('expect.js');
var FileUploader = require('../../../../src/platform/management/file-uploader');
var FileManager = require('../../../../src/platform/management/file-manager');
var Configuration = require('../../../../src/platform/configuration/configuration');
var Authenticator = require('../../../../src/platform/authentication/authenticator');
var HTTPClient = require('../../../../src/platform/http/http-client');
var ListFilesRequest = require('../../../../src/platform/management/requests/list-files-request');
var UpdateFileRequest = require('../../../../src/platform/management/requests/update-file-request');

var reply = __dirname + '/replies/';

describe('file manager', function() {

    var configuration = new Configuration('manager.com', 'secret', 'appId');
    var authenticator = new Authenticator(configuration);
    var httpClient = new HTTPClient(authenticator);
    var fileUploader = new FileUploader(configuration, httpClient);
    var fileManager = new FileManager(configuration, httpClient, fileUploader);

    var uploadServer = nock('https://uploader.com/');
    // getUploadUrl - .get('/_api/upload/url');
    // upload - .post('/_api/upload/file');
    var fileServer = nock('https://manager.com/');
    // list - .get('/_api/files/ls_dir')

    it('listFiles - default', function (done) {
        fileServer.get('/_api/files/ls_dir').query(true).replyWithFile(200, reply + 'list-files-response.json');

        fileManager.listFiles('path', null, function (error, data) {
            expect(data).to.eql({ pageSize: 20,
                total: 50,
                nextPageCursor: 'next',
                files: [
                    {
                        id: 'id',
                        hash: 'hash',
                        path: '/here/be/fish/cat.png',
                        mimeType: 'image/png',
                        mediaType: 'image',
                        type: '-',
                        size: 1000,
                        metadata: {},
                        tags: ['1', '2'],
                        dateCreated: undefined,
                        dateUpdated: undefined
                    },
                    {
                        id: 'another id',
                        hash: null,
                        path: '/here/be/fish/cat.png',
                        mimeType: 'application/vnd.wix-media.dir',
                        mediaType: 'directory',
                        type: 'd',
                        size: null,
                        metadata: {},
                        tags: ['3', '4'],
                        dateCreated: undefined,
                        dateUpdated: undefined
                    }
                ]
            });
            done(error);
        });
    });

    it('listFiles - page', function (done) {
        fileServer.get('/_api/files/ls_dir').query(true).replyWithFile(200, reply + 'list-files-response.json');

        var listFilesRequest = new ListFilesRequest()
            .ascending()
            .setCursor('c')
            .setOrderBy('date')
            .setPageSize(10);

        fileManager.listFiles('path', listFilesRequest, function (error, data) {
            done(error);
        });
    });

    it('getFile', function (done) {

        fileServer.get('/_api/files').query(true).replyWithFile(200, reply + 'file-descriptor-response.json');

        fileManager.getFile('path/of/file', function (error, data) {
            expect(data).to.eql({
                id: 'id',
                path: '/here/be/fish/cat.png',
                type: '-',
                mimeType: 'image/png',
                mediaType: 'image',
                size: 1000,
                hash: 'hash',
                tags: ['tags'],
                metadata: {},
                dateCreated: 'yesterday',
                dateUpdated: 'a second ago'
            });
            done(error);
        });
    });

    // it('updateFile', function (done) {
    //
    //     fileServer.put('/files/fileId').query(true).replyWithFile(200, reply + 'file-descriptor-response.json');
    //
    //     var updateFileRequest = new UpdateFileRequest()
    //         .setTags(['dog', 'Schnauzer']);
    //     fileManager.updateFile('userId', 'fileId', updateFileRequest, function (error, data) {
    //         expect(data).to.eql({
    //             id: 'id',
    //             path: '/here/be/fish/cat.png',
    //             type: '-',
    //             mimeType: 'image/png',
    //             mediaType: 'image',
    //             size: 1000,
    //             hash: 'hash',
    //             tags: ['tags'],
    //             metadata: {},
    //             dateCreated: 'yesterday',
    //             dateUpdated: 'a second ago'
    //         });
    //         done(error);
    //     });
    // });

    // it('deleteFile', function (done) {
    //
    //     fileServer.delete('/_api/files').query(true).reply(200, {
    //         'code': 0,
    //         'message': 'OK',
    //         'payload': null
    //     });
    //
    //     fileManager.deleteFile('path', function (error) {
    //         done(error);
    //     });
    // });

    it('file upload accepts path (string) as source', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
        fileServer.times(1).reply(200, {});

        //noinspection JSAccessibilityCheck
        fileUploader.uploadFile('userId', 'type', source + 'image.jpg', null, {}, function (error, data) {
            done(error);
        });
    });

    it('file upload handles path (string) errors', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });

        //noinspection JSAccessibilityCheck
        fileUploader.uploadFile('userId', 'type', 'fish', null, {}, function (error, data) {
            expect(error).to.be.a(Error);
            expect(data).to.be(null);
            done();
        });
    });

    it('file upload accepts stream as source', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
        fileServer.times(1).reply(200, {});

        var stream = fs.createReadStream(source + 'audio.mp3');

        //noinspection JSAccessibilityCheck
        fileUploader.uploadFile('userId', 'type', stream, null, {}, function (error, data) {
            done(error);
        });
    });

    it('file upload accepts buffer as source', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
        fileServer.times(1).reply(200, {});

        var buffer = fs.readFileSync(source + 'document.xlsx');

        //noinspection JSAccessibilityCheck
        fileUploader.uploadFile('userId', 'type', buffer, null, {}, function (error, data) {
            done(error);
        });
    });

    it('file upload reject unsupported source', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });

        //noinspection JSAccessibilityCheck
        fileUploader.uploadFile('userId', 'type', 1000, null, {}, function (error, data) {
            expect(error).to.be.a(Error);
            expect(data).to.be(null);
            done();
        });
    });

    it('file upload handles auth errors', function (done) {

        authServer.times(1).reply(403, {});

        //noinspection JSAccessibilityCheck
        fileUploader.uploadFile('fish', 'type', source + 'image.jpg', null, {}, function (error, data) {
            expect(error).to.be.a(Error);
            expect(data).to.be(null);
            done();
        });
    });

    it('file upload handles get upload url errors', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        uploadCredentialsServer.times(1).reply(403, {});

        //noinspection JSAccessibilityCheck
        fileUploader.uploadFile('userId', 'type', source + 'image.jpg', null, {}, function (error, data) {
            expect(error).to.be.a(Error);
            expect(data).to.be(null);
            expect(authenticationFacade.cache.get('userId')).to.be(undefined);
            done();
        });
    });

    it('file upload handles upload errors', function (done) {
        authServer.times(1).reply(200, { token: 'token' });
        uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
        fileServer.times(1).reply(500, {});

        //noinspection JSAccessibilityCheck
        fileUploader.uploadFile('userId', 'type', source + 'image.jpg', null, {}, function (error, data) {
            expect(error).to.be.a(Error);
            expect(data).to.be(null);
            done();
        });
    });
});

