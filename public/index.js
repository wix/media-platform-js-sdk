var Configuration = require('./platform/configuration/configuration');
var MediaPlatform = require('./platform/media-platform');
var Image = require('../src/image/image');
var UploadFileRequest = require('../src/platform/management/requests/upload-file-request');
var ListFilesRequest = require('../src/platform/management/requests/list-files-request');
var UpdateFileRequest = require('../src/platform/management/requests/update-file-request');

var MP = {};

/**
 * @type {Configuration}
 */
MP.Configuration = Configuration;

/**
 * @type {MediaPlatform}
 */
MP.MediaPlatform = MediaPlatform;

/**
 * @type {Image}
 */
MP.Image = Image;

MP.file = {
    /**
     * @type {UploadFileRequest}
     */
    UploadFileRequest: UploadFileRequest,

    /**
     * @type {ListFilesRequest}
     */
    ListFilesRequest: ListFilesRequest,

    /**
     * @type {UpdateFileRequest}
     */
    UpdateFileRequest: UpdateFileRequest
};

module.exports = MP;