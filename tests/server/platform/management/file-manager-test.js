var nock = require('nock');
var expect = require('expect.js');
var FileManager = require('../../../../src/platform/management/file-manager');
var ProviderConfiguration = require('../../../../src/platform/configuration/provider-configuration');
var ProviderAuthenticationConfiguration = require('../../../../src/platform/authentication/configuration/provider-authentication-configuration');
var AuthenticationFacade = require('../../../../src/platform/authentication/authentication-facade');
var AuthenticatedHTTPClient = require('../../../../src/platform/http/authenticated-http-client');
var ListFilesRequest = require('../../../../src/dto/management/list-files-request');
var UpdateFileRequest = require('../../../../src/dto/management/update-file-request');
var NewFolderRequest = require('../../../../src/dto/management/new-folder-request');
var UpdateFolderRequest = require('../../../../src/dto/management/update-folder-request');
var MediaType = require('../../../../src/dto/media-type');

var reply = __dirname + '/replies/';

describe('file manager', function() {

    var configuration = new ProviderConfiguration('manager.com', 'secret');
    var authenticationConfiguration = new ProviderAuthenticationConfiguration(configuration);
    var authenticationFacade = new AuthenticationFacade(authenticationConfiguration);
    var httpClient = new AuthenticatedHTTPClient(authenticationFacade);
    var fileManager = new FileManager(configuration, httpClient);

    var authServer = nock('https://manager.com/').get('/auth/tenant/token');
    var fileServer = nock('https://manager.com/');

    it('listFiles - default', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.get('/files/getpage').query(true).replyWithFile(200, reply + 'list-files-reply.json');

        fileManager.listFiles('userId', null, function (error, data) {
            done(error);
        });
    });

    it('listFiles - page', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.get('/files/getpage').query(true).replyWithFile(200, reply + 'list-files-reply.json');

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
        fileServer.get('/files/fileId').query(true).replyWithFile(200, reply + 'get-file-image-reply.json');

        fileManager.getFile('userId', 'fileId', function (error, data) {
            done(error);
        });
    });

    it('updateFile', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.put('/files/fileId').query(true).replyWithFile(200, reply + 'update-file-reply.json');

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
        fileServer.get('/folders').query(true).replyWithFile(200, reply + 'list-folders-reply.json');

        fileManager.listFolders('userId', null, function (error, data) {
            done(error);
        });
    });

    it('listFolders - sub folder', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.get('/folders/folderId').query(true).replyWithFile(200, reply + 'list-folders-reply.json');

        fileManager.listFolders('userId', 'folderId', function (error, data) {
            done(error);
        });
    });

    it('newFolder', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        fileServer.post('/folders').query(true).replyWithFile(200, reply + 'folder-dto-reply.json');

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
        fileServer.put('/folders/folderId').query(true).replyWithFile(200, reply + 'folder-dto-reply.json');

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