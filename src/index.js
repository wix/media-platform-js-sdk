var MediaPlatform = require('./platform/media-platform');
var Image = require('./image/image');
var UploadFileRequest = require('./platform/management/requests/upload-file-request');
var DownloadUrlRequest = require('./platform/management/requests/download-url-request');
var UploadUrlRequest = require('./platform/management/requests/upload-url-request');
var ListFilesRequest = require('./platform/management/requests/list-files-request');
var SearchJobsRequest = require('./platform/management/requests/search-jobs-request');
var ExtractArchiveRequest = require('./platform/management/requests/extract-archive-request');
var ImportFileRequest = require('./platform/management/requests/import-file-request');
var Destination = require('./platform/management/job/destination');
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
         * @type {UploadUrlRequest}
         */
        UploadUrlRequest: UploadUrlRequest,

        /**
         * @type {DownloadUrlRequest}
         */
        DownloadUrlRequest: DownloadUrlRequest,

        /**
         * @type {ListFilesRequest}
         */
        ListFilesRequest: ListFilesRequest,

        /**
         * @type {ImportFileRequest}
         */
        ImportFileRequest: ImportFileRequest,

        /**
         * @type {Destination}
         */
        Destination: Destination
    },

    archive: {
    /**
     * @type {ExtractArchiveRequest}
     */
        ExtractArchiveRequest: ExtractArchiveRequest
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
    },

    job: {
        /**
         * @type {SearchJobsRequest}
         */
        SearchJobsRequest: SearchJobsRequest
    }
};
