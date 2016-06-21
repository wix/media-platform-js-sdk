var stream = require('stream');
var fs = require('fs');
var nock = require('nock');
var expect = require('expect.js');
var FileUploader = require('../../../src/upload/file-uploader');
var AppConfiguration = require('../../../src/configuration/app-configuration');
var AppAuthenticationConfiguration = require('../../../src/authentication/configuration/app-authentication-configuration');
var AuthenticationFacade = require('../../../src/authentication/authentication-facade');

describe('file uploader', function() {

    var authServer = nock('https://users.fish.com/').get('/auth/app/token').reply(200, {
        token: 'token'
    });

    var uploadServer = nock('https://upload.test.com/').get('/files/upload/url').reply(200, {
        upload_url: 'https://fish.cat.com/'
    });

    var fileServer = nock('https://fish.cat.com/').post('/').reply(200, {});

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

        it('accepts stream as source', function () {

        });

        it('accepts buffer as source', function () {

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