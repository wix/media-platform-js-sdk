var MediaPlatform = require('./platform/media-platform');
var Image = require('./image/image');
var UploadFileRequest = require('./platform/management/requests/upload-file-request');
var DownloadUrlRequest = require('./platform/management/requests/download-url-request');
var ListFilesRequest = require('./platform/management/requests/list-files-request');
var Token = require('./platform/authentication/token');
var NS = require('./platform/authentication/NS');

module.exports = {
    
    /**
     * @type {MediaPlatform}
     */
    MediaPlatform: MediaPlatform,

    /**
     * @type {Image}
     */
    Image: Image,

    file: {

        /**
         * @type {UploadFileRequest}
         */
        UploadFileRequest: UploadFileRequest,

        /**
         * @type {DownloadUrlRequest}
         */
        DownloadUrlRequest: DownloadUrlRequest,

        /**
         * @type {ListFilesRequest}
         */
        ListFilesRequest: ListFilesRequest
    },

    auth: {
        /**
         * @type {Token}
         */
        Token: Token,

        /**
         * @type {{SERVICE: string, MEMBER: string, APPLICATION: string, FILE: string}}
         */
        NS: NS
    }
};
