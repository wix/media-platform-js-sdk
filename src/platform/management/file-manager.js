var request = require('request');

/**
 * @param {AuthenticationFacade} authenticationFacade
 * @constructor
 */
function FileManager(authenticationFacade) {

    this.authenticationFacade = authenticationFacade;

}

FileManager.prototype.listFiles = function (userId, listFilesRequest, callback) {
    this.doRequest('GET', userId, listFilesRequest.toParams(), callback);
};

FileManager.prototype.getFile = function () {

};
//GET /files/{file_name}

FileManager.prototype.getStreamingMediaData = function () {

};
// GET /files/{file_name}/info?user_id={api_key}

FileManager.prototype.updateFile = function () {

};
/*
 PUT /files/{file_name}
 {
 "original_file_name": "string value",
 "parent_folder_id": "string value",
 "tags": [
 {}
 ]
 }
 */


FileManager.prototype.deleteFile = function () {

};
// DELETE /files/{file_id}


FileManager.prototype.listFolders = function () {

};
// GET /folders

FileManager.prototype.createFolder = function () {

};
/*
 POST /folders
 {
 "folder_name": "string value",
 "parent_folder_id": "string value"
 }
 */

FileManager.prototype.updateFolder = function () {

};
/*
 * {
 "folder_name": "string value"
 }
 *
 */

FileManager.prototype.deleteFolder = function () {

};

FileManager.prototype.doRequest = function (httpMethod, userId, params, callback) {

    this.authenticationFacade.getHeader(userId, function (error, header) {

        if (error) {
            callback(error, null);
            return;
        }

        request({ method: httpMethod, headers: header, qs: params, json: true }, function (error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }

            if (response.statusCode !== 200) {
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