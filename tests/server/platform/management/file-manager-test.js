var fs = require('fs');
var nock = require('nock');
var expect = require('expect.js');
var FileUploader = require('../../../../src/platform/management/file-uploader');
var FileManager = require('../../../../src/platform/management/file-manager');
var Configuration = require('../../../../src/platform/configuration/configuration');
var Authenticator = require('../../../../src/platform/authentication/authenticator');
var HTTPClient = require('../../../../src/platform/http/http-client');
var ListFilesRequest = require('../../../../src/platform/management/requests/list-files-request');
var UpdateFileRequest = require('../../../../src/platform/management/requests/update-file-request');

var repliesDir = __dirname + '/replies/';
var sourcesDir = __dirname + '/../../../sources/';

describe('file manager', function() {

    var configuration = new Configuration('manager.com', 'secret', 'appId');
    var authenticator = new Authenticator(configuration);
    var httpClient = new HTTPClient(authenticator);
    var fileUploader = new FileUploader(configuration, httpClient);
    var fileManager = new FileManager(configuration, httpClient, fileUploader);

    var uploadServer = nock('https://manager.com/');
    // getUploadUrl - .get('/_api/upload/url');
    // upload - .post('/_api/upload/file');
    var fileServer = nock('https://manager.com/');
    // list - .get('/_api/files/ls_dir')

    it('listFiles - default', function (done) {
        fileServer.get('/_api/files/ls_dir').once().query(true).replyWithFile(200, repliesDir + 'list-files-response.json');

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
        fileServer.get('/_api/files/ls_dir').once().query(true).replyWithFile(200, repliesDir + 'list-files-response.json');

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

        fileServer.get('/_api/files').once().query(true).replyWithFile(200, repliesDir + 'file-descriptor-response.json');

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
        
        uploadServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
        uploadServer.post('/_api/upload/file').once().replyWithFile(200, repliesDir + 'file-descriptor-response.json');

        //path, file, uploadRequest, callback
        fileManager.uploadFile('upload/to/there/image.jpg', sourcesDir + 'image.jpg', null, function (error, data) {
            done(error);
        });
    });

    it('file upload handles path (string) errors', function (done) {

        uploadServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
        uploadServer.post('/_api/upload/file').once().replyWithFile(200, repliesDir + 'file-descriptor-response.json');

        fileManager.uploadFile('upload/to/there/image.jpg', 'nothing here', null, function (error, data) {
            expect(error).to.be.a(Error);
            expect(data).to.be(null);
            done();
        });
    });

    it('file upload accepts stream as source', function (done) {

        uploadServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
        uploadServer.post('/_api/upload/file').once().replyWithFile(200, repliesDir + 'file-descriptor-response.json');

        var stream = fs.createReadStream(sourcesDir + 'audio.mp3');

        fileManager.uploadFile('upload/to/there/image.jpg', stream, null, function (error, data) {
            done(error);
        });
    });

    it('file upload accepts buffer as source', function (done) {

        uploadServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
        uploadServer.post('/_api/upload/file').once().replyWithFile(200, repliesDir + 'file-descriptor-response.json');

        var buffer = fs.readFileSync(sourcesDir + 'document.xlsx');

        fileManager.uploadFile('upload/to/there/image.jpg', buffer, null, function (error, data) {
            done(error);
        });
    });

    it('file upload reject unsupported source', function (done) {

        uploadServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
        uploadServer.post('/_api/upload/file').once().replyWithFile(200, repliesDir + 'file-descriptor-response.json');

        fileManager.uploadFile('upload/to/there/image.jpg', 1111, null, function (error, data) {
            expect(error).to.be.a(Error);
            expect(data).to.be(null);
            done();
        });
    });

    it('file upload handles auth errors', function (done) {

        uploadServer.get('/_api/upload/url').once().query(true).reply(403, {});

        fileManager.uploadFile('upload/to/there/image.jpg', sourcesDir + 'image.jpg', null, function (error, data) {
            expect(error).to.be.a(Error);
            expect(data).to.be(null);
            done();
        });
    });

    it('file upload handles upload errors', function (done) {

        uploadServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
        uploadServer.post('/_api/upload/file').once().reply(500, {});

        fileManager.uploadFile('upload/to/there/image.jpg', sourcesDir + 'image.jpg', null, function (error, data) {
            expect(error).to.be.a(Error);
            expect(data).to.be(null);
            done();
        });
    });
});

