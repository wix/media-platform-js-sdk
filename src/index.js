var MediaPlatform = require('./platform/media-platform');
var Image = require('./image/image');
var Alignments = require('./image/operation/align/alignments');
var UploadRequest = require('./platform/management/requests/upload-file-request');
var UpdateFileRequest =  require('./platform/management/requests/update-file-request');
var ListFilesRequest = require('./platform/management/requests/list-files-request');

module.exports = {
    
    /**
     * @type {MediaPlatform}
     */
    MediaPlatform: MediaPlatform,

    /**
     * @type {Image}
     */
    Image: Image,

    image: {
        /**
         * @type {Alignments}
         */
        Alignments: Alignments
    },

    file: {
        /**
         * @type {UploadUrlRequest}
         */
        UploadRequest: UploadRequest,

        /**
         * @type {ListFilesRequest}
         */
        ListFilesRequest: ListFilesRequest,

        /**
         * @type {UpdateFileRequest}
         */
        UpdateFileRequest: UpdateFileRequest
    }
};
