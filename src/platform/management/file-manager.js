var request = require('request');
var ListFilesResponse = require('../../dto/management/list-files-response');
var ListFoldersResponse = require('../../dto/management/list-folders-response');
var FolderDTO = require('../../dto/folder/folder-dto');
var toDTO = require('../../dto/file-deserializer').toDTO;

/**
 * @param {ProviderConfiguration} configuration
 * @param {AuthenticationFacade} authenticationFacade
 * @constructor
 */
function FileManager(configuration, authenticationFacade) {

    /**
     * @type {AuthenticationFacade}
     */
    this.authenticationFacade = authenticationFacade;

    this.configuration = configuration;

    this.baseUrl = 'https://' + this.configuration.domain;
}

/**
 * @param {string} userId
 * @param {ListFilesRequest} listFilesRequest
 * @param {function(Error, ListFilesResponse)} callback
 */
FileManager.prototype.listFiles = function (userId, listFilesRequest, callback) {
    this.doRequest('GET', this.baseUrl + '/files/getpage', userId, listFilesRequest.toParams(), function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ListFilesResponse(response));
    });
};

/**
 * @param {string} userId
 * @param {string} fileId
 * @param {function(Error, BaseDTO)} callback
 */
FileManager.prototype.getFile = function (userId, fileId, callback) {
    this.doRequest('GET', this.baseUrl + '/files/' + fileId, userId, {}, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, toDTO(response));
    });
};
//GET /files/{file_name}

/**
 * @param {string} userId
 * @param {string} fileId
 * @param {UpdateFileRequest} updateFileRequest
 * @param {function(Error, BaseDTO)} callback
 */
FileManager.prototype.updateFile = function (userId, fileId, updateFileRequest, callback) {
    this.doRequest('PUT', this.baseUrl + '/files/' + fileId, userId, updateFileRequest.toParams(), function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, toDTO(response));
    });
};
// PUT /files/{file_name}

/**
 * @param {string} userId
 * @param {string} fileId
 * @param {function(Error)} callback
 */
FileManager.prototype.deleteFile = function (userId, fileId, callback) {
    this.doRequest('DELETE', this.baseUrl + '/files/' + fileId, userId, {}, function (error, response) {

        if (error) {
            callback(error);
            return;
        }

        callback(null);
    });
};
// DELETE /files/{file_id}

/**
 * @param {string} userId
 * @param {string?} parentFolderId
 * @param {function(Error, ListFoldersResponse)} callback
 */
FileManager.prototype.listFolders = function (userId, parentFolderId, callback) {
    var url = this.baseUrl + '/folders' + (parentFolderId ? '/' + parentFolderId : '');
    this.doRequest('GET', url, userId, {}, function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new ListFoldersResponse(response));
    });
};
// GET /folders/:folderId

/**
 * @param {string} userId
 * @param {NewFolderRequest} newFolderRequest
 * @param {function(Error, FolderDTO)} callback
 */
FileManager.prototype.newFolder = function (userId, newFolderRequest, callback) {
    this.doRequest('POST', this.baseUrl + '/folders', userId, newFolderRequest.toParams(), function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new FolderDTO(response));
    });
};
//POST /folders

/**
 * @param {string} userId
 * @param {string} folderId
 * @param {UpdateFolderRequest} updateFolderRequest
 * @param {function(Error, FolderDTO)} callback
 */
FileManager.prototype.updateFolder = function (userId, folderId, updateFolderRequest, callback) {
    this.doRequest('PUT', this.baseUrl + '/folders/' + folderId, userId, updateFolderRequest.toParams(), function (error, response) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, new FolderDTO(response));
    });
};
//PUT /folders/{folder_id}

/**
 * @param {string} userId
 * @param {string} folderId
 * @param {function(Error)} callback
 */
FileManager.prototype.deleteFolder = function (userId, folderId, callback) {
    this.doRequest('DELETE', this.baseUrl + '/folders/' + folderId, userId, {}, function (error, response) {

        if (error) {
            callback(error);
            return;
        }

        callback(null);
    });
};
//DELETE /folders/{folder_id}

FileManager.prototype.doRequest = function (httpMethod, url, userId, params, callback) {

    this.authenticationFacade.getHeader(userId, function (error, header) {

        if (error) {
            callback(error, null);
            return;
        }

        var options = { method: httpMethod, url: url, headers: header, json: true };

        switch (httpMethod) {
            case 'POST':
            case 'PUT':
                options.body = params;
                break;
            default:
                options.qs = params;
        }

        request(options, function (error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }

            if (response.statusCode < 200 || response.statusCode >= 300) {
                callback(new Error(JSON.stringify(response.body)), null);
                return;
            }

            callback(null, body);
        });
    })
};

/**
 * @type {FileManager}
 */
module.exports = FileManager;