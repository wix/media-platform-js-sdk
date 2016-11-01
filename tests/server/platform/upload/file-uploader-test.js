var stream = require('stream');
var fs = require('fs');
var nock = require('nock');
var expect = require('expect.js');
var Configuration = require('../../../../src/platform/configuration/configuration');
var AuthenticationConfiguration = require('../../../../src/platform/authentication/configuration/authentication-configuration');
var AuthenticationFacade = require('../../../../src/platform/authentication/authentication-facade');
var AuthenticatedHTTPClient = require('../../../../src/platform/http/authenticated-http-client');
var FileUploader = require('../../../../src/platform/upload/file-uploader');
var UploadRequest = require('../../../../src/dto/upload/upload-request');
var ImportRequest = require('../../../../src/dto/upload/import-request');
var EncodingOptions = require('../../../../src/dto/video/encoding-options');
var StaticFileOptions = require('../../../../src/dto/static/static-file-options');

var source = __dirname + '/../../../source/';
var reply = __dirname + '/replies/';

describe('file uploader', function() {

    var configuration = new Configuration('upload.com', 'secret', 'appId');
    var authenticationConfiguration = new AuthenticationConfiguration(configuration);
    var authenticationFacade = new AuthenticationFacade(authenticationConfiguration);
    var httpClient = new AuthenticatedHTTPClient(authenticationFacade);
    var fileUploader = new FileUploader(configuration, httpClient);

    var authServer = nock('https://upload.com/').get('/apps/auth/token');
    var uploadCredentialsServer = nock('https://upload.com/').get('/files/upload/url').query(true);
    var fileServer = nock('https://fish.cat.com/').post('/').query(true);

    describe('upload file', function() {

        it('accepts path (string) as source', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
            fileServer.times(1).reply(200, {});

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', source + 'image.jpg', null, {}, function (error, data) {
                done(error);
            });
        });

        it('handles path (string) errors', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', 'fish', null, {}, function (error, data) {
                expect(error).to.be.a(Error);
                expect(data).to.be(null);
                done();
            });
        });

        it('accepts stream as source', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
            fileServer.times(1).reply(200, {});

            var stream = fs.createReadStream(source + 'audio.mp3');

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', stream, null, {}, function (error, data) {
                done(error);
            });
        });

        it('accepts buffer as source', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
            fileServer.times(1).reply(200, {});

            var buffer = fs.readFileSync(source + 'document.xlsx');

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', buffer, null, {}, function (error, data) {
                done(error);
            });
        });

        it('reject unsupported source', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', 1000, null, {}, function (error, data) {
                expect(error).to.be.a(Error);
                expect(data).to.be(null);
                done();
            });
        });

        it('handles auth errors', function (done) {

            authServer.times(1).reply(403, {});

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('fish', 'type', source + 'image.jpg', null, {}, function (error, data) {
                expect(error).to.be.a(Error);
                expect(data).to.be(null);
                done();
            });
        });

        it('handles get signed url errors', function (done) {

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

        it('handles upload errors', function (done) {
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

    describe('import file', function() {

        it('commit a URL to import', function (done) {

            authServer.times(1).reply(200, {token: 'token'});
            var server = nock('https://upload.com/').post('/files/upload/external/async').query(true);
            server.replyWithFile(200, reply + 'import-response.json');

            //noinspection JSAccessibilityCheck
            fileUploader.importFile('userId', new ImportRequest().setFileName('file.jpg').setUrl('http://this.is/a/url').setMediaType('picture'), function (error, data) {
                done(error);
            });
        });
    });

    describe('upload image', function() {

        it('returns a proper response object', function (done) {

            uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });
            fileServer.replyWithFile(200, reply + 'upload-image-response.json');

            fileUploader.uploadImage('userId', source + 'image.jpg', null, function (error, data) {
                expect(data).to.eql({
                    "parentFolderId": "dc933247458b41792a0fb9d2f2296bb5",
                    "hash": "0a9371085075b9fed4c29b9418804840",
                    "originalFileName": "included-icon.png",
                    "fileName": "10a917_d723da13c9e44213924b582e1d641aaa~mv2.png",
                    "fileUrl": "ggl-109789773458215503884/images/05ffa1e26ed94c788c1158116c6a6636/file.jpg",
                    "baseUrl": "ggl-109789773458215503884/images",
                    "fileSize": 842,
                    "iconUrl": "media/10a917_d723da13c9e44213924b582e1d641aaa~mv2.png",
                    "mediaType": "picture",
                    "mimeType": "image/png",
                    "lables": [],
                    "tags": [],
                    "dateCreated": 1466345821,
                    "dateModified": 1466345821,
                    "height": 17,
                    "width": 17,
                    "faces": null,
                    "status": null
                });
                done(error);
            });
        });
    });

    describe('upload audio', function() {

        uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });

        it('returns a proper response object', function (done) {

            fileServer.replyWithFile(200, reply + 'upload-audio-response.json');
            
            var metadata = new UploadRequest().addTags('cat','fish');
            fileUploader.uploadAudio('userId', source + 'audio.mp3', metadata, function (error, data) {
                expect(data).to.eql({
                    "parentFolderId": "1b98ddebaa447184cd90f33753e6c474",
                    "hash": "35df225c1634042f59e85aad37bae506",
                    "originalFileName": "YEXuWYCjGR.mp3",
                    "fileName": "af63a5d465ce48a998297684f3246df6",
                    "fileUrl": "ggl-109789773458215503884/audio/af63a5d465ce48a998297684f3246df6/file.mp3",
                    "baseUrl": "ggl-109789773458215503884/audio",
                    "fileSize": 3528120,
                    "iconUrl": "wixmedia-public/images/b0068f926fc542fbb1f3653df8ce5099/music_note.png",
                    "mediaType": "music",
                    "mimeType": "audio/mp3",
                    "lables": [],
                    "tags": [],
                    "dateCreated": 1466413719,
                    "dateModified": 1466413719,
                    "status": null,
                    "inputFile": {
                        "format": "mp3",
                        "channels": 2,
                        "sampleSize": 16,
                        "sampleRate": 44100,
                        "duration": 215883,
                        "bitrate": 128000
                    }
                });
                done(error);
            });
        });
    });

    describe('upload video', function() {

        uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });

        it('default options', function (done) {

            fileServer.replyWithFile(200, reply + 'upload-video-response.json');

            fileUploader.uploadVideo('userId', source + 'video.mp4', null, null, function (error, data) {
                expect(data).to.eql({
                    "parentFolderId": "40700af2c4d942a9f77c157baee95fd9",
                    "hash": "f5ea6d9e1de2ae552f4dbedcbcf9bb94",
                    "originalFileName": "video.mp4",
                    "fileName": "2e44912c30e44beca4c623035b4418de",
                    "fileUrl": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/file.mp4",
                    "baseUrl": "ggl-109789773458215503884/video",
                    "fileSize": 4151438,
                    "iconUrl": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def002/file.jpg",
                    "mediaType": "video",
                    "mimeType": "video/mp4",
                    "lables": [],
                    "tags": [],
                    "dateCreated": 1471955310,
                    "dateModified": 1471955309,
                    "height": 1080,
                    "width": 1728,
                    "status": "IN-QUEUE",
                    "inputFile": {
                        "tag": null,
                        "fps": "25/1",
                        "videoBitrate": 2757180,
                        "audioBitrate": 3112,
                        "duration": 12000,
                        "quality": null,
                        "displayAspectRatio": "8:5",
                        "sampleAspectRatio": "1:1",
                        "rotation": 0,
                        "type": "video"
                    },
                    "outputFiles": {
                        "images": [
                            {
                                "status": "READY",
                                "secure": false,
                                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def000/file.jpg",
                                "format": "jpg",
                                "width": 1728,
                                "height": 1080
                            },
                            {
                                "status": "READY",
                                "secure": false,
                                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def001/file.jpg",
                                "format": "jpg",
                                "width": 1728,
                                "height": 1080
                            },
                            {
                                "status": "READY",
                                "secure": false,
                                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def002/file.jpg",
                                "format": "jpg",
                                "width": 1728,
                                "height": 1080
                            },
                            {
                                "status": "READY",
                                "secure": false,
                                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def003/file.jpg",
                                "format": "jpg",
                                "width": 1728,
                                "height": 1080
                            }
                        ],
                        "videos": [
                            {
                                "tag": "High",
                                "fps": "25/1",
                                "videoBitrate": 1200000,
                                "audioBitrate": 3112,
                                "duration": 12000,
                                "quality": "480p",
                                "displayAspectRatio": "8:5",
                                "rotation": null,
                                "sampleAspectRatio": null,
                                "type": null
                            },
                            {
                                "tag": "HD",
                                "fps": "25/1",
                                "videoBitrate": 2757180,
                                "audioBitrate": 3112,
                                "duration": 12000,
                                "quality": "720p",
                                "displayAspectRatio": "8:5",
                                "rotation": null,
                                "sampleAspectRatio": null,
                                "type": null
                            },
                            {
                                "tag": "HD",
                                "fps": "25/1",
                                "videoBitrate": 2757180,
                                "audioBitrate": 3112,
                                "duration": 12000,
                                "quality": "1080p",
                                "displayAspectRatio": "8:5",
                                "rotation": null,
                                "sampleAspectRatio": null,
                                "type": null
                            }
                        ]
                    }
                });
                done(error);
            });
        });

        it('custom options', function (done) {

            fileServer.replyWithFile(200, reply + 'upload-video-response.json');

            var options = new EncodingOptions()
                .setVideoFormats(['mp4', 'webm', 'ogv'])
                .setAudioFormat('m4a')
                .setExtractAudio(true)
                .setSkipAudio(true)
                .setImageFormat('png');
            fileUploader.uploadVideo('userId', source + 'video.mp4', options, null, function (error, data) {
                expect(data).to.eql({
                    "parentFolderId": "40700af2c4d942a9f77c157baee95fd9",
                    "hash": "f5ea6d9e1de2ae552f4dbedcbcf9bb94",
                    "originalFileName": "video.mp4",
                    "fileName": "2e44912c30e44beca4c623035b4418de",
                    "fileUrl": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/file.mp4",
                    "baseUrl": "ggl-109789773458215503884/video",
                    "fileSize": 4151438,
                    "iconUrl": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def002/file.jpg",
                    "mediaType": "video",
                    "mimeType": "video/mp4",
                    "lables": [],
                    "tags": [],
                    "status": "IN-QUEUE",
                    "dateCreated": 1471955310,
                    "dateModified": 1471955309,
                    "height": 1080,
                    "width": 1728,
                    "inputFile": {
                        "tag": null,
                        "fps": "25/1",
                        "videoBitrate": 2757180,
                        "audioBitrate": 3112,
                        "duration": 12000,
                        "quality": null,
                        "displayAspectRatio": "8:5",
                        "sampleAspectRatio": "1:1",
                        "rotation": 0,
                        "type": "video"
                    },
                    "outputFiles": {
                        "images": [
                            {
                                "status": "READY",
                                "secure": false,
                                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def000/file.jpg",
                                "format": "jpg",
                                "width": 1728,
                                "height": 1080
                            },
                            {
                                "status": "READY",
                                "secure": false,
                                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def001/file.jpg",
                                "format": "jpg",
                                "width": 1728,
                                "height": 1080
                            },
                            {
                                "status": "READY",
                                "secure": false,
                                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def002/file.jpg",
                                "format": "jpg",
                                "width": 1728,
                                "height": 1080
                            },
                            {
                                "status": "READY",
                                "secure": false,
                                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def003/file.jpg",
                                "format": "jpg",
                                "width": 1728,
                                "height": 1080
                            }
                        ],
                        "videos": [
                            {
                                "tag": "High",
                                "fps": "25/1",
                                "videoBitrate": 1200000,
                                "audioBitrate": 3112,
                                "duration": 12000,
                                "quality": "480p",
                                "displayAspectRatio": "8:5",
                                "rotation": null,
                                "sampleAspectRatio": null,
                                "type": null
                            },
                            {
                                "tag": "HD",
                                "fps": "25/1",
                                "videoBitrate": 2757180,
                                "audioBitrate": 3112,
                                "duration": 12000,
                                "quality": "720p",
                                "displayAspectRatio": "8:5",
                                "rotation": null,
                                "sampleAspectRatio": null,
                                "type": null
                            },
                            {
                                "tag": "HD",
                                "fps": "25/1",
                                "videoBitrate": 2757180,
                                "audioBitrate": 3112,
                                "duration": 12000,
                                "quality": "1080p",
                                "displayAspectRatio": "8:5",
                                "rotation": null,
                                "sampleAspectRatio": null,
                                "type": null
                            }
                        ]
                    }
                });
                done(error);
            });
        });
    });

    describe('upload document', function() {

        uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });

        it('default options', function (done) {

            fileServer.replyWithFile(200, reply + 'upload-document-response.json');

            var buffer = fs.readFileSync(source + 'document.xlsx');
            fileUploader.uploadDocument('userId', buffer, null, function (error, data) {
                expect(data).to.eql({
                    "parentFolderId": "5d899584b15b2691bd0100d322ea201d",
                    "hash": "b9376c800ea7ab681da23ee6c18c0e69",
                    "originalFileName": "document.xlsx",
                    "fileName": "10a917_28919fe96f4846219334fe80dc73b8fa.xlsx",
                    "fileUrl": "ggl-109789773458215503884/document/10a917_28919fe96f4846219334fe80dc73b8fa.xlsx",
                    "baseUrl": "ggl-109789773458215503884/document",
                    "fileSize": 21034,
                    "iconUrl": "media/6167099680654d6a026118a70f4c8715.png",
                    "mediaType": "document",
                    "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "lables": [],
                    "status": null,
                    "tags": [],
                    "dateCreated": 1472025868,
                    "dateModified": 1472025868
                });
                done(error);
            });
        });
    });


    describe('upload static file', function() {

        it('default options', function (done) {

            uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });
            fileServer.replyWithFile(200, reply + 'upload-static-file-response.json');

            var buffer = fs.readFileSync(source + 'file.json');
            fileUploader.uploadStatic('userId', buffer, null, null, function (error, data) {
                expect(data).to.eql({
                    "parentFolderId": "5d899584b15b2691bd0100d322ea201d",
                    "hash": "b9376c800ea7ab681da23ee6c18c0e69",
                    "originalFileName": "file.json",
                    "fileName": "10a917_28919fe96f4846219334fe80dc73b8fa.json",
                    "fileUrl": "ggl-109789773458215503884/static/10a917_28919fe96f4846219334fe80dc73b8fa.json",
                    "baseUrl": "ggl-109789773458215503884/static",
                    "fileSize": 12,
                    "iconUrl": "media/6167099680654d6a026118a70f4c8715.png",
                    "mediaType": "static_file",
                    "mimeType": "application/json",
                    "lables": [],
                    "status": null,
                    "tags": [],
                    "dateCreated": 1472025868,
                    "dateModified": 1472025868
                });
                done(error);
            });
        });

        it('disable compression', function (done) {
            uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });
            fileServer.replyWithFile(200, reply + 'upload-static-file-response.json');

            var buffer = fs.readFileSync(source + 'file.json');
            var options = new StaticFileOptions().setCompress(false);
            fileUploader.uploadStatic('userId', buffer, options, null, function (error, data) {
                expect(data).to.eql({
                    "parentFolderId": "5d899584b15b2691bd0100d322ea201d",
                    "hash": "b9376c800ea7ab681da23ee6c18c0e69",
                    "originalFileName": "file.json",
                    "fileName": "10a917_28919fe96f4846219334fe80dc73b8fa.json",
                    "fileUrl": "ggl-109789773458215503884/static/10a917_28919fe96f4846219334fe80dc73b8fa.json",
                    "baseUrl": "ggl-109789773458215503884/static",
                    "fileSize": 12,
                    "iconUrl": "media/6167099680654d6a026118a70f4c8715.png",
                    "mediaType": "static_file",
                    "mimeType": "application/json",
                    "lables": [],
                    "status": null,
                    "tags": [],
                    "dateCreated": 1472025868,
                    "dateModified": 1472025868
                });
                done(error);
            });
        });

        it('enable compression', function (done) {
            uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });
            fileServer.replyWithFile(200, reply + 'upload-static-file-response.json');

            var buffer = fs.readFileSync(source + 'file.json');
            var options = new StaticFileOptions().setCompress(true);
            fileUploader.uploadStatic('userId', buffer, options, null, function (error, data) {
                expect(data).to.eql({
                    "parentFolderId": "5d899584b15b2691bd0100d322ea201d",
                    "hash": "b9376c800ea7ab681da23ee6c18c0e69",
                    "originalFileName": "file.json",
                    "fileName": "10a917_28919fe96f4846219334fe80dc73b8fa.json",
                    "fileUrl": "ggl-109789773458215503884/static/10a917_28919fe96f4846219334fe80dc73b8fa.json",
                    "baseUrl": "ggl-109789773458215503884/static",
                    "fileSize": 12,
                    "iconUrl": "media/6167099680654d6a026118a70f4c8715.png",
                    "mediaType": "static_file",
                    "mimeType": "application/json",
                    "lables": [],
                    "status": null,
                    "tags": [],
                    "dateCreated": 1472025868,
                    "dateModified": 1472025868
                });
                done(error);
            });
        });
    });
});