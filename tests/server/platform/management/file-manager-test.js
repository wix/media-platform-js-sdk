var nock = require('nock');
var expect = require('expect.js');
var FileManager = require('../../../../src/platform/management/file-manager');
var Configuration = require('../../../../src/platform/configuration/configuration');
var Authenticator = require('../../../../src/platform/authentication/authenticator');
var HTTPClient = require('../../../../src/platform/http/http-client');
var ListFilesRequest = require('../../../../src/platform/management/requests/list-files-request');
var UpdateFileRequest = require('../../../../src/platform/management/requests/update-file-request');

var reply = __dirname + '/replies/';

describe('file manager', function() {

    var configuration = new Configuration('manager.com', 'secret');
    var authenticationConfiguration = new AuthenticationConfiguration(configuration);
    var authenticationFacade = new Authenticator(authenticationConfiguration);
    var httpClient = new HTTPClient(authenticationFacade);
    var fileManager = new FileManager(configuration, httpClient);

    var authServer = nock('https://manager.com/').get('/apps/auth/token');
    var fileServer = nock('https://manager.com/');

    it('listFiles - default', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.get('/files/getpage').query(true).replyWithFile(200, reply + 'list-files-response.json');

        fileManager.listFiles('userId', null, function (error, data) {
            expect(data).to.eql({
                "timeStamp": 1467295051,
                "count": 3,
                "nextPageCursor": "Cn8KGQoMZGF0ZV91cGRhdGVkEgkIoOnYxbbKzQISXmoNc353aXhwcm9zcGVyb3JNCxIEVXNlciIZZ2dsLTEwOTc4OTc3MzQ1ODIxNTUwMzg4NAwLEgRGaWxlIiAzODNlMWI5MjQ2M2I0N2E3YWRmZjRjN2YxOWFjNTEyYQwYACAB",
                "files": [
                    {
                        "parentFolderId": "d23b196fa41a47043ae3908ca467cbe9",
                        "hash": "9eea21221c9abe895eac99a54f058d2a",
                        "originalFileName": "image.jpg",
                        "fileName": "dbb3e157ff7041c9ad3e13ce263146a9",
                        "fileUrl": "ggl-109789773458215503884/images/dbb3e157ff7041c9ad3e13ce263146a9/file.jpg",
                        "host": "ggl-109789773458215503884/images",
                        "fileSize": 12958,
                        "iconUrl": "ggl-109789773458215503884/images/dbb3e157ff7041c9ad3e13ce263146a9/file.jpg",
                        "mediaType": "picture",
                        "mimeType": "image/jpeg",
                        "lables": [
                            "hunting knife",
                            "Wix.com"
                        ],
                        "tags": [
                            "cat",
                            "fish"
                        ],
                        "dateCreated": 1467294551,
                        "dateModified": 1467294551,
                        "height": 35,
                        "width": 115,
                        "faces": null,
                        "status": null
                    },
                    {
                        "parentFolderId": "1b98ddebaa447184cd90f33753e6c474",
                        "hash": "687ec4539601f9e85f09d8dffd51264f",
                        "originalFileName": "cat.mp3",
                        "fileName": "c179afe7100a4c0085e743d887d545a3",
                        "fileUrl": "ggl-109789773458215503884/audio/c179afe7100a4c0085e743d887d545a3/file.mp3",
                        "host": "ggl-109789773458215503884/audio",
                        "fileSize": 30439,
                        "iconUrl": "wixmedia-public/images/b0068f926fc542fbb1f3653df8ce5099/music_note.png",
                        "mediaType": "music",
                        "mimeType": "audio/mpeg",
                        "lables": [],
                        "tags": [],
                        "dateCreated": 1467273852,
                        "dateModified": 1471511997,
                        "inputFile": {
                            "format": "mp3",
                            "channels": 1,
                            "sampleSize": 16,
                            "sampleRate": 44100,
                            "duration": 5093,
                            "bitrate": 48000
                        },
                        "status": null
                    },
                    {
                        "parentFolderId": "40700af2c4d942a9f77c157baee95fd9",
                        "hash": "f5ea6d9e1de2ae552f4dbedcbcf9bb94",
                        "originalFileName": "video.mp4",
                        "fileName": "2e44912c30e44beca4c623035b4418de",
                        "fileUrl": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/file.mp4",
                        "host": "ggl-109789773458215503884/video",
                        "fileSize": 4151438,
                        "iconUrl": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def002/file.jpg",
                        "mediaType": "video",
                        "mimeType": "video/mp4",
                        "lables": [],
                        "tags": [],
                        "dateCreated": 1471955310,
                        "dateModified": 1471955330,
                        "height": 1080,
                        "width": 1728,
                        "status": "READY",
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
                                    "videoBitrate": 914383,
                                    "audioBitrate": 3112,
                                    "duration": 12040,
                                    "quality": "480p",
                                    "displayAspectRatio": "8:5",
                                    "sampleAspectRatio": null,
                                    "rotation": null,
                                    "type": null
                                },
                                {
                                    "tag": "HD",
                                    "fps": "25/1",
                                    "videoBitrate": 1878247,
                                    "audioBitrate": 3112,
                                    "duration": 12040,
                                    "quality": "720p",
                                    "displayAspectRatio": "8:5",
                                    "sampleAspectRatio": null,
                                    "rotation": null,
                                    "type": null
                                },
                                {
                                    "tag": "HD",
                                    "fps": "25/1",
                                    "videoBitrate": 2771464,
                                    "audioBitrate": 3112,
                                    "duration": 12040,
                                    "quality": "1080p",
                                    "displayAspectRatio": "8:5",
                                    "sampleAspectRatio": null,
                                    "rotation": null,
                                    "type": null
                                }
                            ]
                        }
                    }
                ]
            });
            done(error);
        });
    });

    it('listFiles - page', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.get('/files/getpage').query(true).replyWithFile(200, reply + 'list-files-response.json');

        var listFilesRequest = new ListFilesRequest()
            .ascending()
            .setCursor('c')
            .setMediaType(MediaType.IMAGE)
            .orderBy('date')
            .setSize(10)
            .setTag('fish')
            .setParentFolderId('gold');

        fileManager.listFiles('userId', listFilesRequest, function (error, data) {
            done(error);
        });
    });

    it('getFile', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.get('/files/fileId').query(true).replyWithFile(200, reply + 'get-file-image-response.json');

        fileManager.getFile('userId', 'fileId', function (error, data) {
            expect(data).to.eql({
                "parentFolderId": "d23b196fa41a47043ae3908ca467cbe9",
                "hash": "541f2e240ec95eea4c42d494d35dfe25",
                "originalFileName": "neta.jpeg",
                "fileName": "8cdd7a4f6eee439ba209adc00830bb08",
                "fileUrl": "ggl-109789773458215503884/images/8cdd7a4f6eee439ba209adc00830bb08/file.jpeg",
                "host": "ggl-109789773458215503884/images",
                "fileSize": 65096,
                "iconUrl": "ggl-109789773458215503884/images/8cdd7a4f6eee439ba209adc00830bb08/file.jpeg",
                "mediaType": "picture",
                "mimeType": "image/jpeg",
                "lables": [
                    "clothing",
                    "hair",
                    "person",
                    "little black dress",
                    "model"
                ],
                "tags": [],
                "status": null,
                "dateCreated": 1471508651,
                "dateModified": 1471508677,
                "height": 602,
                "width": 400,
                "faces": [
                    {
                        "height": 207,
                        "width": 178,
                        "y": 29,
                        "x": 157
                    }
                ]
            });
            done(error);
        });
    });

    it('updateFile', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.put('/files/fileId').query(true).replyWithFile(200, reply + 'update-file-response.json');

        var updateFileRequest = new UpdateFileRequest()
            .setOriginalFileName('cat.jpeg')
            .setParentFolderId('folderId')
            .setTags(['dog', 'Schnauzer']);
        fileManager.updateFile('userId', 'fileId', updateFileRequest, function (error, data) {
            expect(data).to.eql({
                "parentFolderId": "d23b196fa41a47043ae3908ca467cbe9",
                "hash": "9eea21221c9abe895eac99a54f058d2a",
                "originalFileName": "dog.jpg",
                "fileName": "71f2336ac3bf456fafb1bba0f9179290",
                "fileUrl": "ggl-109789773458215503884/images/71f2336ac3bf456fafb1bba0f9179290/file.jpg",
                "host": "ggl-109789773458215503884/images",
                "fileSize": 12958,
                "iconUrl": "ggl-109789773458215503884/images/71f2336ac3bf456fafb1bba0f9179290/file.jpg",
                "mediaType": "picture",
                "mimeType": "image/jpeg",
                "status": null,
                "lables": [
                    "hunting knife",
                    "Wix.com"
                ],
                "tags": [],
                "dateCreated": 1467632026,
                "dateModified": 1467637885,
                "height": 35,
                "width": 115,
                "faces": null
            });
            done(error);
        });
    });

    it('deleteFile', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.delete('/files/fileId').query(true).reply(200, {});

        fileManager.deleteFile('userId', 'fileId', function (error) {
            done(error);
        });
    });

    it('handles auth errors', function (done) {

        authServer.times(1).reply(403, {});

        //noinspection JSAccessibilityCheck
        fileManager.listFiles('moshe', null, function (error, data) {
            expect(error).to.be.a(Error);
            expect(data).to.be(null);
            done();
        });
    });
});

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

    it('handles get upload url errors', function (done) {

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

