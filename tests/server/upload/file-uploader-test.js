var stream = require('stream');
var fs = require('fs');
var nock = require('nock');
var expect = require('expect.js');
var FileUploader = require('../../../src/platform/upload/file-uploader');
var AppConfiguration = require('../../../src/platform/configuration/app-configuration');
var AppAuthenticationConfiguration = require('../../../src/platform/authentication/configuration/app-authentication-configuration');
var AuthenticationFacade = require('../../../src/platform/authentication/authentication-facade');

describe('file uploader', function() {

    var appConfig = new AppConfiguration('test.com', 'key', 'secret');
    var appAuthenticationConfiguration = new AppAuthenticationConfiguration(appConfig);
    var authenticationFacade = new AuthenticationFacade(appAuthenticationConfiguration);
    var fileUploader = new FileUploader(appConfig, authenticationFacade);

    nock('https://test.com/').get('/auth/token').times(100).reply(200, {
        token: 'token'
    });

    var uploadCredentialsServer = nock('https://test.com/');

    var fileServer = nock('https://fish.cat.com/');

    describe('upload file', function() {

        uploadCredentialsServer.get('/files/upload/url').query(true).times(4).reply(200, {
            upload_url: 'https://fish.cat.com/',
            upload_token: 'token'
        });

        fileServer.post('/').query(true).times(4).reply(200, {});

        it('accepts path (string) as source', function (done) {

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', __dirname + '/../../source/image.jpg', {}, function (error, data) {
                done(error);
            });
        });

        it('handles path (string) errors', function (done) {

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', 'fish', {}, function (error, data) {
                expect(error).to.be.a(Error);
                done();
            });
        });

        it('accepts stream as source', function (done) {

            var stream = fs.createReadStream(__dirname + '/../../source/audio.mp3');

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', stream, {}, function (error, data) {
                done(error);
            });
        });

        it('accepts buffer as source', function (done) {

            var buffer = fs.readFileSync(__dirname + '/../../source/document.xlsx');

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', buffer, {}, function (error, data) {
                done(error);
            });
        });

        it('reject unsupported source', function (done) {

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', 1000, {}, function (error, data) {
                expect(error).to.be.a(Error);
                done();
            });
        });

        it('handles auth errors', function (done) {
            //TODO
            // //noinspection JSAccessibilityCheck
            // fileUploader.uploadFile('userId', 'type', 1000, {}, function (error, data) {
            //     expect(error).to.be.a(Error);
            //     done();
            // });

            done();
        });

        it('handles get signed url errors', function (done) {
            //TODO
            // //noinspection JSAccessibilityCheck
            // fileUploader.uploadFile('userId', 'type', 1000, {}, function (error, data) {
            //     expect(error).to.be.a(Error);
            //     done();
            // });

            done();
        });

        it('handles upload errors', function (done) {
            //TODO
            // //noinspection JSAccessibilityCheck
            // fileUploader.uploadFile('userId', 'type', 1000, {}, function (error, data) {
            //     expect(error).to.be.a(Error);
            //     done();
            // });

            done();
        });
    });

    describe('upload image', function() {

        uploadCredentialsServer.get('/files/upload/url').query(true).reply(200, {
            upload_url: 'https://fish.cat.com/image',
            upload_token: 'token'
        });

        it('returns a proper response object', function (done) {

            fileServer.post('/image').reply(200,
                [
                    {
                        parent_folder_id: 'dc933247458b41792a0fb9d2f2296bb5',
                        created_ts: 1466345821,
                        hash: '0a9371085075b9fed4c29b9418804840',
                        tags: [],
                        file_name: '10a917_d723da13c9e44213924b582e1d641aaa~mv2.png',
                        labels: [],
                        file_url: 'media/10a917_d723da13c9e44213924b582e1d641aaa~mv2.png',
                        height: 17,
                        width: 17,
                        original_file_name: 'included-icon.png',
                        modified_ts: 1466345821,
                        file_size: 842,
                        media_type: 'picture',
                        icon_url: 'media/10a917_d723da13c9e44213924b582e1d641aaa~mv2.png',
                        mime_type: 'image/png'
                    }
                ]
            );

            fileUploader.uploadImage('userId', __dirname + '/../../source/image.jpg', function (error, data) {
                //TODO: assert props
                done(error);
            });
        });
    });

    describe('upload audio', function() {


        uploadCredentialsServer.get('/files/upload/url').query(true).reply(200, {
            upload_url: 'https://fish.cat.com/audio',
            upload_token: 'token'
        });

        it('returns a proper response object', function (done) {

            fileServer.post('/audio').reply(200,
                [
                    {
                        "parent_folder_id": "1b98ddebaa447184cd90f33753e6c474",
                        "created_ts": 1466413719,
                        "hash": "35df225c1634042f59e85aad37bae506",
                        "tags": [],
                        "file_name": "af63a5d465ce48a998297684f3246df6",
                        "labels": [],
                        "file_url": "ggl-109789773458215503884/audio/af63a5d465ce48a998297684f3246df6/file.mp3",
                        "original_file_name": "YEXuWYCjGR.mp3",
                        "modified_ts": 1466413719,
                        "file_size": 3528120,
                        "media_type": "music",
                        "icon_url": "wixmedia-public/images/b0068f926fc542fbb1f3653df8ce5099/music_note.png",
                        "mime_type": "audio/mp3",
                        "file_input": {
                            "format": "mp3",
                            "channels": 2,
                            "sample_size": 16,
                            "sample_rate": 44100,
                            "duration": 215883,
                            "bitrate": 128000
                        }
                    }
                ]
            );

            fileUploader.uploadAudio('userId', __dirname + '/../../source/audio.mp3', function (error, data) {
                //TODO: assert props
                done(error);
            });
        });
    });

    describe('upload video', function() {

        uploadCredentialsServer.get('/files/upload/url').query(true).times(2).reply(200, {
            upload_url: 'https://fish.cat.com/video',
            upload_token: 'token'
        });

        it('default options', function (done) {

            fileServer.post('/video').reply(200,
                [
                    {
                        "parent_folder_id": "dbbbc0fd90024aab84a7a7653c803659",
                        "created_ts": 1466344754,
                        "hash": "d55bddf8d62910879ed9f605522149a8",
                        "tags": [],
                        "file_name": "e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec",
                        "labels": [],
                        "file_url": "video/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec/file",
                        "height": 720,
                        "width": 1280,
                        "original_file_name": "SampleVideo_1080x720_1mb copy 2.mp4",
                        "modified_ts": 1466344753,
                        "file_size": 1055736,
                        "media_type": "video",
                        "op_status": "IN-QUEUE",
                        "icon_url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf002.jpg",
                        "mime_type": "video/mp4",
                        "file_input": {
                            "fps": 25.0,
                            "video_bitrate": 1205959,
                            "height": 720,
                            "width": 1280,
                            "audio_bitrate": 384828,
                            "sample_aspect_ratio": "1:1",
                            "duration": 5280,
                            "rotation": 0,
                            "type": "video",
                            "display_aspect_ratio": "16:9"
                        },
                        "file_output": {
                            "image": [
                                {
                                    "status": "READY",
                                    "secure": false,
                                    "format": "jpg",
                                    "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf000.jpg",
                                    "height": 720,
                                    "width": 1280
                                },
                                {
                                    "status": "READY",
                                    "secure": false,
                                    "format": "jpg",
                                    "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf001.jpg",
                                    "height": 720,
                                    "width": 1280
                                },
                                {
                                    "status": "READY",
                                    "secure": false,
                                    "format": "jpg",
                                    "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf002.jpg",
                                    "height": 720,
                                    "width": 1280
                                },
                                {
                                    "status": "READY",
                                    "secure": false,
                                    "format": "jpg",
                                    "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf003.jpg",
                                    "height": 720,
                                    "width": 1280
                                }
                            ],
                            "video": [
                                {
                                    "status": "INPROGRESS",
                                    "secure": false,
                                    "fps": 25.0,
                                    "format": "mp4",
                                    "url": "video/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec/480p/mp4/file.mp4",
                                    "video_bitrate": 1200000,
                                    "height": 480,
                                    "width": 854,
                                    "tag": "High",
                                    "audio_bitrate": 196000,
                                    "duration": 5280,
                                    "quality": "480p",
                                    "display_aspect_ratio": "16:9"
                                },
                                {
                                    "status": "INPROGRESS",
                                    "secure": false,
                                    "fps": 25.0,
                                    "format": "mp4",
                                    "url": "video/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec/720p/mp4/file.mp4",
                                    "video_bitrate": 1205959,
                                    "height": 720,
                                    "width": 1280,
                                    "tag": "HD",
                                    "audio_bitrate": 196000,
                                    "duration": 5280,
                                    "quality": "720p",
                                    "display_aspect_ratio": "16:9"
                                }
                            ]
                        }
                    }
                ]
            );

            fileUploader.uploadVideo('userId', __dirname + '/../../source/video.mp4', null, function (error, data) {
                //TODO: assert props
                done(error);
            });
        });

        it('custom options', function (done) {

            var EncodingOptions = require('../../../src/platform/upload/dto/video/encoding-options');

            fileServer.post('/video').reply(200,
                [
                    {
                        "parent_folder_id": "dbbbc0fd90024aab84a7a7653c803659",
                        "created_ts": 1466344754,
                        "hash": "d55bddf8d62910879ed9f605522149a8",
                        "tags": [],
                        "file_name": "e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec",
                        "labels": [],
                        "file_url": "video/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec/file",
                        "height": 720,
                        "width": 1280,
                        "original_file_name": "SampleVideo_1080x720_1mb copy 2.mp4",
                        "modified_ts": 1466344753,
                        "file_size": 1055736,
                        "media_type": "video",
                        "op_status": "IN-QUEUE",
                        "icon_url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf002.jpg",
                        "mime_type": "video/mp4",
                        "file_input": {
                            "fps": 25.0,
                            "video_bitrate": 1205959,
                            "height": 720,
                            "width": 1280,
                            "audio_bitrate": 384828,
                            "sample_aspect_ratio": "1:1",
                            "duration": 5280,
                            "rotation": 0,
                            "type": "video",
                            "display_aspect_ratio": "16:9"
                        },
                        "file_output": {
                            "image": [
                                {
                                    "status": "READY",
                                    "secure": false,
                                    "format": "jpg",
                                    "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf000.jpg",
                                    "height": 720,
                                    "width": 1280
                                },
                                {
                                    "status": "READY",
                                    "secure": false,
                                    "format": "jpg",
                                    "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf001.jpg",
                                    "height": 720,
                                    "width": 1280
                                },
                                {
                                    "status": "READY",
                                    "secure": false,
                                    "format": "jpg",
                                    "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf002.jpg",
                                    "height": 720,
                                    "width": 1280
                                },
                                {
                                    "status": "READY",
                                    "secure": false,
                                    "format": "jpg",
                                    "url": "media/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ecf003.jpg",
                                    "height": 720,
                                    "width": 1280
                                }
                            ],
                            "video": [
                                {
                                    "status": "INPROGRESS",
                                    "secure": false,
                                    "fps": 25.0,
                                    "format": "mp4",
                                    "url": "video/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec/480p/mp4/file.mp4",
                                    "video_bitrate": 1200000,
                                    "height": 480,
                                    "width": 854,
                                    "tag": "High",
                                    "audio_bitrate": 196000,
                                    "duration": 5280,
                                    "quality": "480p",
                                    "display_aspect_ratio": "16:9"
                                },
                                {
                                    "status": "INPROGRESS",
                                    "secure": false,
                                    "fps": 25.0,
                                    "format": "mp4",
                                    "url": "video/e66d82_ca6c7b4fc81f45c9bcf219d81395d3ec/720p/mp4/file.mp4",
                                    "video_bitrate": 1205959,
                                    "height": 720,
                                    "width": 1280,
                                    "tag": "HD",
                                    "audio_bitrate": 196000,
                                    "duration": 5280,
                                    "quality": "720p",
                                    "display_aspect_ratio": "16:9"
                                }
                            ]
                        }
                    }
                ]
            );

            var options = new EncodingOptions()
                .videoFormats(['mp4', 'webm', 'ogv'])
                .audioFormat('m4a')
                .extractAudio(true)
                .skipAudio(true)
                .imageFormat('png');
            fileUploader.uploadVideo('userId', __dirname + '/../../source/video.mp4', null, function (error, data) {
                //TODO: assert props
                done(error);
            });
        });
    });

    describe('upload document', function() {

        uploadCredentialsServer.get('/files/upload/url').query(true).times(2).reply(200, {
            upload_url: 'https://fish.cat.com/document',
            upload_token: 'token'
        });

        it('default options', function (done) {

            fileServer.post('/document').reply(200,
                [
                    {
                        "parent_folder_id": "1b98ddebaa447184cd90f33753e6c474",
                        "created_ts": 1466413719,
                        "hash": "35df225c1634042f59e85aad37bae506",
                        "tags": [],
                        "file_name": "af63a5d465ce48a998297684f3246df6",
                        "labels": [],
                        "file_url": "ggl-109789773458215503884/audio/af63a5d465ce48a998297684f3246df6/file.mp3",
                        "original_file_name": "YEXuWYCjGR.mp3",
                        "modified_ts": 1466413719,
                        "file_size": 3528120,
                        "media_type": "music",
                        "icon_url": "wixmedia-public/images/b0068f926fc542fbb1f3653df8ce5099/music_note.png",
                        "mime_type": "audio/mp3"
                    }
                ]
            );

            var buffer = fs.readFileSync(__dirname + '/../../source/document.xlsx');
            fileUploader.uploadDocument('userId', buffer, function (error, data) {
                //TODO: assert props
                done(error);
            });
        });
    });
});