var stream = require('stream');
var fs = require('fs');
var nock = require('nock');
var expect = require('expect.js');
var FileUploader = require('../../../../src/platform/upload/file-uploader');
var ProviderConfiguration = require('../../../../src/platform/configuration/provider-configuration');
var ProviderAuthenticationConfiguration = require('../../../../src/platform/authentication/configuration/provider-authentication-configuration');
var AuthenticationFacade = require('../../../../src/platform/authentication/authentication-facade');
var MetadataDTO = require('../../../../src/dto/metadata-dto');
var EncodingOptions = require('../../../../src/dto/video/encoding-options');

var source = __dirname + '/../../../source/';
var reply = __dirname + '/replies/';

describe('file uploader', function() {

    var configuration = new ProviderConfiguration('test.com', 'secret');
    var authenticationConfiguration = new ProviderAuthenticationConfiguration(configuration);
    var authenticationFacade = new AuthenticationFacade(authenticationConfiguration);
    var fileUploader = new FileUploader(configuration, authenticationFacade);

    var authServer = nock('https://test.com/').get('/auth/tenant/token');
    var uploadCredentialsServer = nock('https://test.com/').get('/files/upload/url').query(true);
    var fileServer = nock('https://fish.cat.com/').post('/').query(true);

    describe('upload file', function() {

        it('accepts path (string) as source', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
            fileServer.times(1).reply(200, {});

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', source + 'image.jpg', {}, function (error, data) {
                done(error);
            });
        });

        it('handles path (string) errors', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', 'fish', {}, function (error, data) {
                expect(error).to.be.a(Error);
                done();
            });
        });

        it('accepts stream as source', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
            fileServer.times(1).reply(200, {});

            var stream = fs.createReadStream(source + 'audio.mp3');

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', stream, {}, function (error, data) {
                done(error);
            });
        });

        it('accepts buffer as source', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
            fileServer.times(1).reply(200, {});

            var buffer = fs.readFileSync(source + 'document.xlsx');

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', buffer, {}, function (error, data) {
                done(error);
            });
        });

        it('reject unsupported source', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', 1000, {}, function (error, data) {
                expect(error).to.be.a(Error);
                done();
            });
        });

        it('handles auth errors', function (done) {

            authServer.times(1).reply(403, {});

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('fish', 'type', source + 'image.jpg', {}, function (error, data) {
                expect(error).to.be.a(Error);
                done();
            });
        });

        it('handles get signed url errors', function (done) {

            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(403, {});

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', source + 'image.jpg', {}, function (error, data) {
                expect(error).to.be.a(Error);
                done();
            });
            
            //TODO: verify that the token was invalidated in the facade
        });

        it('handles upload errors', function (done) {
            authServer.times(1).reply(200, { token: 'token' });
            uploadCredentialsServer.times(1).reply(200, { upload_url: 'https://fish.cat.com/', upload_token: 'token' });
            fileServer.times(1).reply(500, {});

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', source + 'image.jpg', {}, function (error, data) {
                expect(error).to.be.a(Error);
                done();
            });
        });
    });

    describe('upload image', function() {

        it('returns a proper response object', function (done) {

            uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });
            fileServer.replyWithFile(200, reply + 'image-upload-reply.json');

            fileUploader.uploadImage('userId', source + 'image.jpg', null, function (error, data) {
                //TODO: assert props
                done(error);
            });
        });
    });

    describe('upload audio', function() {

        uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });

        it('returns a proper response object', function (done) {

            fileServer.replyWithFile(200, reply + 'audio-upload-reply.json');
            
            var metadata = new MetadataDTO().addTags('cat','fish');
            fileUploader.uploadAudio('userId', source + 'audio.mp3', metadata, function (error, data) {
                //TODO: assert props
                done(error);
            });
        });
    });

    describe('upload video', function() {

        uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });

        it('default options', function (done) {

            fileServer.replyWithFile(200, reply + 'video-upload-reply.json');

            fileUploader.uploadVideo('userId', source + 'video.mp4', null, null, function (error, data) {
                //TODO: assert props
                done(error);
            });
        });

        it('custom options', function (done) {

            fileServer.replyWithFile(200, reply + 'video-upload-reply.json');

            var options = new EncodingOptions()
                .videoFormats(['mp4', 'webm', 'ogv'])
                .audioFormat('m4a')
                .extractAudio(true)
                .skipAudio(true)
                .imageFormat('png');
            fileUploader.uploadVideo('userId', source + 'video.mp4', options, null, function (error, data) {
                //TODO: assert props
                done(error);
            });
        });
    });

    describe('upload document', function() {

        uploadCredentialsServer.reply(200, { upload_url: 'https://fish.cat.com/',  upload_token: 'token' });

        it('default options', function (done) {

            fileServer.replyWithFile(200, reply + 'upload-document-reply.json');

            var buffer = fs.readFileSync(source + 'document.xlsx');
            fileUploader.uploadDocument('userId', buffer, null, function (error, data) {
                //TODO: assert props
                done(error);
            });
        });
    });
});