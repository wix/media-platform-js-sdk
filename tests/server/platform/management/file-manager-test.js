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

    var uploadServer = nock('https://manager.com/').defaultReplyHeaders({
        'Content-Type': 'application/json'
    });
    var fileServer = nock('https://manager.com/').defaultReplyHeaders({
        'Content-Type': 'application/json'
    });

    afterEach(function() {
        nock.cleanAll();
    });

    it('listFiles - default', function (done) {
        fileServer.get('/_api/files/ls_dir').once().query(true).replyWithFile(200, repliesDir + 'list-files-response.json');

        fileManager.listFiles('path', null, function (error, data) {
            expect(data).to.eql({
                nextPageToken: 'next',
                files: [
                    {
                        id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
                        hash: 'd41d8cd98f00b204e9800998ecf8427e',
                        path: '/place-holder.txt',
                        mimeType: 'text/plain',
                        type: '-',
                        size: 0,
                        acl: 'public',
                        dateCreated: '2017-02-20T14:23:42Z',
                        dateUpdated: '2017-02-20T14:23:42Z'
                    },
                    {
                        id: 'f65c0c70bec44b86bb543cc166800f03',
                        hash: null,
                        path: '/kb',
                        mimeType: 'application/vnd.wix-media.dir',
                        type: 'd',
                        size: 0,
                        acl: 'public',
                        dateCreated: '2017-02-20T14:22:51Z',
                        dateUpdated: '2017-02-20T14:22:51Z'
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

    it('getFileMetadata - Image', function (done) {

        fileServer.get('/_api/files/file-id/metadata')
            .once()
            .replyWithFile(200, repliesDir + 'file-metadata-image-response.json');

        fileManager.getFileMetadataById('file-id', function (error, data) {
            expect(data).to.eql({
                fileDescriptor: {
                    id: '2145ae56cd5c47c79c05d4cfef5f1078',
                    hash: null,
                    path: '/images/animals/cat.jpg',
                    mimeType: 'image/jpg',
                    type: '-',
                    size: 15431,
                    acl: 'private',
                    dateCreated: undefined,
                    dateUpdated: undefined
                },
                basic: {
                    height: 600,
                    width: 500,
                    colorspace: null,
                    format: 'jpeg'
                },
                features: {
                    labels: [
                        {
                            name: "cat",
                            score: 0.9
                        },
                        {
                            name: "animal",
                            score: 0.933
                        }
                    ],
                    faces: [
                        {
                            height: 180,
                            width: 155,
                            x: 383,
                            y: 393
                        },
                        {
                            height: 173,
                            width: 145,
                            x: 460,
                            y: 385
                        }
                    ],
                    colors: [
                        {
                            b: 244,
                            g: 218,
                            pixelFraction: 0.38548386,
                            r: 138,
                            score: 0.688166
                        }
                    ]
                }
            });
            done(error);
        });
    });

    it('getFileMetadata - Video', function (done) {

        fileServer.get('/_api/files/file-id/metadata')
            .once()
            .replyWithFile(200, repliesDir + 'file-metadata-video-response.json');

        fileManager.getFileMetadataById('file-id', function (error, data) {
            expect(data).to.eql({
                basic: {
                    audioStreams: [
                        {
                            bitrate: 128322,
                            codecLongName: "AAC (Advanced Audio Coding)",
                            codecName: "aac",
                            codecTag: "mp4a",
                            duration: 59351,
                            index: 1
                        }
                    ],
                    format: {
                        bitrate: 2085272,
                        duration: 59351,
                        formatLongName: "QuickTime / MOV",
                        size: 15476893
                    },
                    interlaced: false,
                    videoStreams: [
                        {
                            avgFrameRate: "2997/100",
                            bitrate: 1950467,
                            codecLongName: "MPEG-4 part 2",
                            codecName: "mpeg4",
                            codecTag: "mp4v",
                            displayAspectRatio: "16:9",
                            duration: 59351,
                            height: 720,
                            index: 0,
                            rFrameRate: "3000/100",
                            sampleAspectRatio: "1:1",
                            width: 1280
                        }
                    ]
                },
                features: null,
                fileDescriptor: {
                    acl: "private",
                    dateCreated: undefined,
                    dateUpdated: undefined,
                    hash: null,
                    id: "2de4305552004e0b9076183651030646",
                    mimeType: "video/mp4",
                    path: "/videos/animals/cat.mp4",
                    size: 15431333,
                    type: "-"
                }
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

