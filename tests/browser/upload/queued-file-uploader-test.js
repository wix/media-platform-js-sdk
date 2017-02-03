var expect = require('expect.js');
var fauxJax = require('faux-jax');
var FileAPI = require('file-api');
var QueuedFileUploader = require('../../../public/platform/uploader/queued-file-uploader');
var UploadJob = require('../../../public/platform/uploader/upload-job');

describe('queued file uploader', function () {
    this.timeout(10000);

    function setResponse(responseBody, responseStatus) {

        fauxJax.install();

        fauxJax.on('request', function (request) {
            if (request.requestURL === 'https://www.myapp.com/auth') {
                request.respond(200, {'Content-Type': 'application/json'}, '{"Authorization": "auth"}');
                return;
            }

            if (request.requestURL.indexOf('https://www.domain.com/files/upload/url') == 0) {
                request.respond(200, {'Content-Type': 'application/json'}, '{"upload_url": "http://upload.com/url", "upload_token": "token"}');
                return;
            }

            if (request.requestURL === 'http://upload.com/url') {
                request.respond(responseStatus || 200, {'Content-Type': 'application/json'}, JSON.stringify(responseBody));
            }
        })
    }

    var mediaPlatform = new MP.MediaPlatform({
        domain: 'www.domain.com',
        authenticationUrl: 'https://www.myapp.com/auth'
    });

    var uploader = new QueuedFileUploader(mediaPlatform.fileUploader, 1);

    it('uploads a file and reports progress', function (done) {
        setResponse(imageResponse);
        var progress = false;
        uploader.queue.drain = function() {
            fauxJax.restore();
            expect(progress).to.be(true);
            done();
        };

        var file = new FileAPI.File('../files/image.jpg');
        var uploadJob = new UploadJob().setMediaType(MP.MediaType.IMAGE).setFile(file);
        uploadJob.on('upload-started', function (event) {
            // console.log(event);
        });
        uploadJob.on('upload-progress', function (event) {
            // console.log(event);
            progress = true;
        });
        uploadJob.on('upload-error', function (event) {
            // console.log(event);
        });
        uploadJob.on('upload-success', function (event) {
            // console.log(event);
        });

        uploader.enqueue(uploadJob);
    });

    it('can only queue a job once', function (done) {
        setResponse(imageResponse);
        uploader.queue.drain = function() {
            fauxJax.restore();
            done();
        };

        var file = new FileAPI.File('../files/image.jpg');
        var uploadJob = new UploadJob().setMediaType(MP.MediaType.IMAGE).setFile(file);
        uploadJob.on('upload-error', function (event) {
            // console.log(event);
        });
        uploadJob.on('upload-success', function (event) {
            // console.log('done');
        });

        uploader.enqueue(uploadJob);
        uploader.enqueue(uploadJob);
        expect(uploader.length()).to.be(1);
    });

    it('handles image upload', function (done) {
        setResponse(imageResponse);
        uploader.queue.drain = function() {
            fauxJax.restore();
            done();
        };

        var file = new FileAPI.File('../files/image.jpg');
        var uploadJob = new UploadJob().setMediaType(MP.MediaType.IMAGE).setFile(file);
        uploadJob.on('upload-error', function (event) {
            // console.log(event);
        });
        uploadJob.on('upload-success', function (event) {
            console.log(event.dto);
        });

        uploader.enqueue(uploadJob);
    });

    it('handles video upload', function (done) {
        setResponse(videoResponse);
        uploader.queue.drain = function() {
            fauxJax.restore();
            done();
        };

        var file = new FileAPI.File('../files/video.mp4');
        var uploadJob = new UploadJob().setMediaType(MP.MediaType.VIDEO).setFile(file);
        uploadJob.on('upload-error', function (event) {
            // console.log(event);
        });
        uploadJob.on('upload-success', function (event) {
            console.log(event.dto);
        });

        uploader.enqueue(uploadJob);
    });

    it('handles audio upload', function (done) {
        setResponse(audioResponse);
        uploader.queue.drain = function() {
            fauxJax.restore();
            done();
        };

        var file = new FileAPI.File('../files/audio.mp3');
        var uploadJob = new UploadJob().setMediaType(MP.MediaType.AUDIO).setFile(file);
        uploadJob.on('upload-error', function (event) {
            console.log(event);
        });
        uploadJob.on('upload-success', function (event) {
            console.log(event.dto);
        });

        uploader.enqueue(uploadJob);
    });

    it('handles document upload', function (done) {
        setResponse(documentResponse);
        uploader.queue.drain = function() {
            fauxJax.restore();
            done();
        };

        var file = new FileAPI.File('../files/document.xlsx');
        var uploadJob = new UploadJob().setMediaType(MP.MediaType.DOCUMENT).setFile(file);
        uploadJob.on('upload-error', function (event) {
            console.log(event);
        });
        uploadJob.on('upload-success', function (event) {
            console.log(event.dto);
        });

        uploader.enqueue(uploadJob);
    });

    it('handles static file upload', function (done) {
        setResponse(staticResponse);
        uploader.queue.drain = function() {
            fauxJax.restore();
            done();
        };

        var file = new FileAPI.File('../files/file.json');
        var uploadJob = new UploadJob().setMediaType(MP.MediaType.STATIC).setFile(file);
        uploadJob.on('upload-error', function (event) {
            console.log(event);
        });
        uploadJob.on('upload-success', function (event) {
            console.log(event.dto);
        });

        uploader.enqueue(uploadJob);
    });

    it('handles errors', function (done) {
        setResponse({error: 'fish'}, 500);
        uploader.queue.drain = function() {
            fauxJax.restore();
            done();
        };

        var file = new FileAPI.File('../files/file.json');
        var uploadJob = new UploadJob().setMediaType(MP.MediaType.STATIC).setFile(file);
        uploadJob.on('upload-error', function (event) {
            console.log(event);
        });
        uploadJob.on('upload-success', function (event) {
            console.log(event);
        });

        uploader.enqueue(uploadJob);
    });

    var imageResponse = [
        {
            "parent_folder_id": "dc933247458b41792a0fb9d2f2296bb5",
            "created_ts": 1466345821,
            "hash": "0a9371085075b9fed4c29b9418804840",
            "tags": [],
            "file_name": "10a917_d723da13c9e44213924b582e1d641aaa~mv2.png",
            "labels": [],
            "file_url": "ggl-109789773458215503884/images/05ffa1e26ed94c788c1158116c6a6636/file.jpg",
            "height": 17,
            "width": 17,
            "original_file_name": "included-icon.png",
            "modified_ts": 1466345821,
            "file_size": 842,
            "media_type": "picture",
            "icon_url": "media/10a917_d723da13c9e44213924b582e1d641aaa~mv2.png",
            "mime_type": "image/png"
        }
    ];

    var videoResponse = [{
        "parent_folder_id": "40700af2c4d942a9f77c157baee95fd9",
        "created_ts": 1471955310,
        "hash": "f5ea6d9e1de2ae552f4dbedcbcf9bb94",
        "tags": [],
        "file_name": "2e44912c30e44beca4c623035b4418de",
        "refs": [],
        "labels": [],
        "file_url": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/file.mp4",
        "height": 1080,
        "width": 1728,
        "original_file_name": "video.mp4",
        "modified_ts": 1471955309,
        "file_size": 4151438,
        "media_type": "video",
        "file_output": {
            "image": [{
                "status": "READY",
                "secure": false,
                "format": "jpg",
                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def000/file.jpg",
                "height": 1080,
                "width": 1728
            }, {
                "status": "READY",
                "secure": false,
                "format": "jpg",
                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def001/file.jpg",
                "height": 1080,
                "width": 1728
            }, {
                "status": "READY",
                "secure": false,
                "format": "jpg",
                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def002/file.jpg",
                "height": 1080,
                "width": 1728
            }, {
                "status": "READY",
                "secure": false,
                "format": "jpg",
                "url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def003/file.jpg",
                "height": 1080,
                "width": 1728
            }],
            "video": [{
                "status": "INPROGRESS",
                "secure": false,
                "fps": "25/1",
                "format": "mp4",
                "url": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/480p/mp4/file.mp4",
                "video_bitrate": 1200000,
                "height": 480,
                "width": 768,
                "tag": "High",
                "audio_bitrate": 3112,
                "key": "480p.mp4",
                "duration": 12000,
                "quality": "480p",
                "display_aspect_ratio": "8:5"
            }, {
                "status": "INPROGRESS",
                "secure": false,
                "fps": "25/1",
                "format": "mp4",
                "url": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/720p/mp4/file.mp4",
                "video_bitrate": 2757180,
                "height": 720,
                "width": 1152,
                "tag": "HD",
                "audio_bitrate": 3112,
                "key": "720p.mp4",
                "duration": 12000,
                "quality": "720p",
                "display_aspect_ratio": "8:5"
            }, {
                "status": "INPROGRESS",
                "secure": false,
                "fps": "25/1",
                "format": "mp4",
                "url": "ggl-109789773458215503884/video/2e44912c30e44beca4c623035b4418de/1080p/mp4/file.mp4",
                "video_bitrate": 2757180,
                "height": 1080,
                "width": 1728,
                "tag": "HD",
                "audio_bitrate": 3112,
                "key": "1080p.mp4",
                "duration": 12000,
                "quality": "1080p",
                "display_aspect_ratio": "8:5"
            }]
        },
        "op_status": "IN-QUEUE",
        "icon_url": "ggl-109789773458215503884/images/2e44912c30e44beca4c623035b4418def002/file.jpg",
        "mime_type": "video/mp4",
        "file_input": {
            "fps": "25/1",
            "video_bitrate": 2757180,
            "height": 1080,
            "width": 1728,
            "audio_bitrate": 3112,
            "sample_aspect_ratio": "1:1",
            "duration": 12000,
            "rotation": 0,
            "type": "video",
            "display_aspect_ratio": "8:5"
        }
    }];

    var audioResponse = [
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
    ];

    var documentResponse = [
        {
            "parent_folder_id": "5d899584b15b2691bd0100d322ea201d",
            "created_ts": 1472025868,
            "hash": "b9376c800ea7ab681da23ee6c18c0e69",
            "tags": [],
            "file_name": "10a917_28919fe96f4846219334fe80dc73b8fa.xlsx",
            "labels": [],
            "file_url": "ggl-109789773458215503884/document/10a917_28919fe96f4846219334fe80dc73b8fa.xlsx",
            "original_file_name": "document.xlsx",
            "modified_ts": 1472025868,
            "file_size": 21034,
            "media_type": "document",
            "icon_url": "media/6167099680654d6a026118a70f4c8715.png",
            "mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    ];

    var staticResponse = [
        {
            "parent_folder_id": "5d899584b15b2691bd0100d322ea201d",
            "created_ts": 1472025868,
            "hash": "b9376c800ea7ab681da23ee6c18c0e69",
            "tags": [],
            "file_name": "10a917_28919fe96f4846219334fe80dc73b8fa.json",
            "labels": [],
            "file_url": "ggl-109789773458215503884/static/10a917_28919fe96f4846219334fe80dc73b8fa.json",
            "original_file_name": "file.json",
            "modified_ts": 1472025868,
            "file_size": 12,
            "media_type": "static_file",
            "icon_url": "media/6167099680654d6a026118a70f4c8715.png",
            "mime_type": "application/json"
        }
    ];
});
