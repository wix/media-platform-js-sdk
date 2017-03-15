var Configuration = require('./platform/configuration/configuration');
var MediaPlatform = require('./platform/media-platform');
var UploadJob = require('./platform/uploader/upload-job');
var Image = require('../src/image/image');
var UploadUrlRequest = require('../src/platform/management/requests/upload-url-request');
var UploadFileRequest = require('../src/platform/management/requests/upload-file-request');
var ListFilesRequest = require('../src/platform/management/requests/list-files-request');

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

MP.upload = {
    /**
     * @type {UploadJob}
     */
    UploadJob: UploadJob
};

MP.file = {
    /**
     * @type {UploadUrlRequest}
     */
    UploadUrlRequest: UploadUrlRequest,

    /**
     * @type {UploadFileRequest}
     */
    UploadFileRequest: UploadFileRequest,

    /**
     * @type {ListFilesRequest}
     */
    ListFilesRequest: ListFilesRequest
};

module.exports = MP;