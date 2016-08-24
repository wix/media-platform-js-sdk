var nock = require('nock');
var expect = require('expect.js');
var FileManager = require('../../../../src/platform/management/file-manager');
var Configuration = require('../../../../src/platform/configuration/configuration');
var AuthenticationConfiguration = require('../../../../src/platform/authentication/configuration/authentication-configuration');
var AuthenticationFacade = require('../../../../src/platform/authentication/authentication-facade');
var AuthenticatedHTTPClient = require('../../../../src/platform/http/authenticated-http-client');
var ListFilesRequest = require('../../../../src/dto/management/list-files-request');
var UpdateFileRequest = require('../../../../src/dto/management/update-file-request');
var NewFolderRequest = require('../../../../src/dto/management/new-folder-request');
var UpdateFolderRequest = require('../../../../src/dto/management/update-folder-request');
var MediaType = require('../../../../src/dto/media-type');

var reply = __dirname + '/replies/';

describe('file manager', function() {

    var configuration = new Configuration('manager.com', 'secret');
    var authenticationConfiguration = new AuthenticationConfiguration(configuration);
    var authenticationFacade = new AuthenticationFacade(authenticationConfiguration);
    var httpClient = new AuthenticatedHTTPClient(authenticationFacade);
    var fileManager = new FileManager(configuration, httpClient);

    var authServer = nock('https://manager.com/').get('/apps/auth/token');
    var fileServer = nock('https://manager.com/');

    it('listFiles - default', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.get('/files/getpage').query(true).replyWithFile(200, reply + 'list-files-response.json');

        fileManager.listFiles('userId', null, function (error, data) {
            console.log(JSON.stringify(data, null, 2));
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
                        "baseUrl": "ggl-109789773458215503884/images",
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
                        "faces": null
                    },
                    {
                        "parentFolderId": "1b98ddebaa447184cd90f33753e6c474",
                        "hash": "687ec4539601f9e85f09d8dffd51264f",
                        "originalFileName": "cat.mp3",
                        "fileName": "c179afe7100a4c0085e743d887d545a3",
                        "fileUrl": "ggl-109789773458215503884/audio/c179afe7100a4c0085e743d887d545a3/file.mp3",
                        "baseUrl": "ggl-109789773458215503884/audio",
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
                        }
                    },
                    {
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
                        "dateModified": 1471955330,
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

    it('listFolders', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.get('/folders').query(true).replyWithFile(200, reply + 'list-folders-response.json');

        fileManager.listFolders('userId', null, function (error, data) {
            done(error);
        });
    });

    it('listFolders - sub folder', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.get('/folders/folderId').query(true).replyWithFile(200, reply + 'list-folders-response.json');

        fileManager.listFolders('userId', 'folderId', function (error, data) {
            done(error);
        });
    });

    it('newFolder', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.post('/folders').query(true).replyWithFile(200, reply + 'folder-dto-response.json');

        var newFolderRequest = new NewFolderRequest()
            .setMediaType(MediaType.IMAGE)
            .setFolderName('Doberman Pinscher')
            .setParentFolderId('cat');
        fileManager.newFolder('userId', newFolderRequest, function (error, data) {
            done(error);
        });
    });

    it('updateFolder', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.put('/folders/folderId').query(true).replyWithFile(200, reply + 'folder-dto-response.json');

        var updateFolderRequest = new UpdateFolderRequest()
            .setFolderName('Doberman Pinscher');
        fileManager.updateFolder('userId', 'folderId', updateFolderRequest, function (error, data) {
            done(error);
        });
    });

    it('deleteFolder', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.delete('/folders/folderId').query(true).reply(200, {});

        fileManager.deleteFolder('userId', 'folderId', function (error, data) {
            done(error);
        });
    });

    it('handles auth errors', function (done) {

        authServer.times(1).reply(403, {});

        //noinspection JSAccessibilityCheck
        fileManager.listFiles('moshe', null, function (error, data) {
            expect(error).to.be.a(Error);
            done();
        });
    });
});