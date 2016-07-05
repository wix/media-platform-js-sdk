var sinon = require('sinon');
var expect = require('expect.js');
var AppFileManager = require('../../../../src/platform/management/app-file-manager');
var AppConfiguration = require('../../../../src/platform/configuration/app-configuration');
var ListFilesRequest = require('../../../../src/dto/management/list-files-request');
var UpdateFileRequest = require('../../../../src/dto/management/update-file-request');
var NewFolderRequest = require('../../../../src/dto/management/new-folder-request');
var UpdateFolderRequest = require('../../../../src/dto/management/update-folder-request');
var MediaType = require('../../../../src/dto/media-type');

describe('app file manager', function() {

    var configuration = new AppConfiguration('test.com', 'apiKey', 'secret');
    var mockFileManager = {
        listFiles: sinon.spy(),
        getFile: sinon.spy(),
        updateFile: sinon.spy(),
        deleteFile: sinon.spy(),
        listFolders: sinon.spy(),
        newFolder: sinon.spy(),
        updateFolder: sinon.spy(),
        deleteFolder: sinon.spy()
    };

    //noinspection JSCheckFunctionSignatures
    var fileManager = new AppFileManager(configuration, mockFileManager);

    describe('proxies calls to file manager with apiKey as userId', function () {

        var callback = function (error, data) {};

        it('listFiles', function () {
            var listFilesRequest = new ListFilesRequest()
                .asecending()
                .setCursor('c')
                .setMediaType(MediaType.IMAGE)
                .orderBy('date')
                .setSize(10)
                .setTag('fish')
                .setParentFolderId('gold');

            fileManager.listFiles(listFilesRequest, callback);

            expect(mockFileManager.listFiles.calledWith('apiKey', listFilesRequest, callback)).to.be(true);
        });

        it('getFile', function () {
            fileManager.getFile('fileId', callback);

            expect(mockFileManager.getFile.calledWith('apiKey', 'fileId', callback)).to.be(true);
        });

        it('updateFile', function () {
            var updateFileRequest = new UpdateFileRequest()
                .setOriginalFileName('cat.jpeg')
                .setParentFolderId('folderId')
                .setTags(['dog', 'Schnauzer']);
            fileManager.updateFile('fileId', updateFileRequest, callback);

            expect(mockFileManager.updateFile.calledWith('apiKey', 'fileId', updateFileRequest, callback)).to.be(true);
        });

        it('deleteFile', function () {
            fileManager.deleteFile('fileId', callback);

            expect(mockFileManager.deleteFile.calledWith('apiKey', 'fileId', callback)).to.be(true);
        });

        it('listFolders', function () {
            fileManager.listFolders('folderId', callback);

            expect(mockFileManager.listFolders.calledWith('apiKey', 'folderId', callback)).to.be(true);
        });

        it('newFolder', function () {
            var newFolderRequest = new NewFolderRequest()
                .setMediaType(MediaType.IMAGE)
                .setFolderName('Doberman Pinscher')
                .setParentFolderId('cat');
            fileManager.newFolder(newFolderRequest, callback);

            expect(mockFileManager.newFolder.calledWith('apiKey', newFolderRequest, callback)).to.be(true);
        });

        it('updateFolder', function () {
            var updateFolderRequest = new UpdateFolderRequest()
                .setFolderName('Doberman Pinscher');
            fileManager.updateFolder('folderId', updateFolderRequest, callback);

            expect(mockFileManager.updateFolder.calledWith('apiKey', 'folderId', updateFolderRequest, callback)).to.be(true);
        });

        it('deleteFolder', function () {
            fileManager.deleteFolder('folderId', callback);

            expect(mockFileManager.deleteFolder.calledWith('apiKey', 'folderId', callback)).to.be(true);
        });
    })
});