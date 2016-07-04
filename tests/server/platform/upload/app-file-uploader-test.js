var stream = require('stream');
var fs = require('fs');
var sinon = require('sinon');
var expect = require('expect.js');
var AppFileUploader = require('../../../../src/platform/upload/app-file-uploader');
var AppConfiguration = require('../../../../src/platform/configuration/app-configuration');

var source = __dirname + '/../../../source/';
var reply = __dirname + '/replies/';

describe('app file uploader', function() {

    var configuration = new AppConfiguration('test.com', 'apiKey', 'secret');
    var mockFileUploader = {
        getUploadUrl: sinon.spy(),
        uploadImage: sinon.spy(),
        uploadAudio: sinon.spy(),
        uploadVideo: sinon.spy(),
        uploadDocument: sinon.spy()
    };

    //noinspection JSCheckFunctionSignatures
    var appFileUploader = new AppFileUploader(configuration, mockFileUploader);

    describe('proxies calls to file uploader with apiKey as userId', function () {

        var callback = function (error, data) {};

        it('getUploadUrl is proxied', function () {

            appFileUploader.getUploadUrl('type', callback);

            expect(mockFileUploader.getUploadUrl.calledWith('apiKey', 'type', callback)).to.be(true);
        });

        it('uploadImage is proxied', function () {

            appFileUploader.uploadImage('source', null, callback);

            expect(mockFileUploader.uploadImage.calledWith('apiKey', 'source', null, callback)).to.be(true);
        });

        it('uploadAudio is proxied', function () {

            appFileUploader.uploadAudio('source', null, callback);

            expect(mockFileUploader.uploadAudio.calledWith('apiKey', 'source', null, callback)).to.be(true);
        });

        it('uploadVideo is proxied', function () {

            appFileUploader.uploadVideo('source', null, null, callback);

            expect(mockFileUploader.uploadVideo.calledWith('apiKey', 'source', null, null, callback)).to.be(true);
        });
    });

});
