var stream = require('stream');
var fs = require('fs');
var nock = require('nock');
var expect = require('expect.js');
var FileUploader = require('../../../src/upload/file-uploader');
var AppConfiguration = require('../../../src/configuration/app-configuration');
var AppAuthenticationConfiguration = require('../../../src/authentication/configuration/app-authentication-configuration');
var AuthenticationFacade = require('../../../src/authentication/authentication-facade');

describe('file uploader', function() {

    var authServer = nock('https://users.fish.com/').get('/auth/app/token').times(100).reply(200, {
        token: 'token'
    });

    var uploadServer = nock('https://upload.test.com/').get('/files/upload/url').times(100).reply(200, {
        upload_url: 'https://fish.cat.com/'
    });

    var fileServer = nock('https://fish.cat.com/').post('/').times(100).reply(200, {});

    var appConfig = new AppConfiguration('test.com', 'key', 'secret');
    var appAuthenticationConfiguration = new AppAuthenticationConfiguration(appConfig);
    var authenticationFacade = new AuthenticationFacade(appAuthenticationConfiguration);

    describe('upload file', function() {

        var fileUploader = new FileUploader(appConfig, authenticationFacade);

        it('accepts path (string) as source', function (done) {

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', __dirname + '/../../source/image.jpg', function (error, data) {
                done(error);
            });
        });

        it('handles path (string) errors', function (done) {

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', 'fish', function (error, data) {
                expect(error).to.be.a(Error);
                done();
            });
        });

        it('accepts stream as source', function (done) {

            var stream = fs.createReadStream(__dirname + '/../../source/audio.mp3');

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', stream, function (error, data) {
                done(error);
            });
        });

        it('accepts buffer as source', function (done) {

            var buffer = fs.readFileSync(__dirname + '/../../source/document.xlsx');

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', buffer, function (error, data) {
                done(error);
            });
        });

        it('reject unsupported source', function (done) {

            //noinspection JSAccessibilityCheck
            fileUploader.uploadFile('userId', 'type', 1000, function (error, data) {
                expect(error).to.be.a(Error);
                done();
            });
        });
    });

    describe('upload image', function() {

    });

    describe('upload audio', function() {

    });

    describe('upload video', function() {


    });

    describe('upload document', function() {

    });
});