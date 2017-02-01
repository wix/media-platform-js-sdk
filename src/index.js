var MediaPlatform = require('./platform/media-platform');
var ImageRequest = require('./image/image-request');
var imageRequestDeserializers = require('./image/image-request-deserializer');
var Alignments = require('./image/operation/align/alignments');
var UploadRequest = require('./platform/management/requests/upload-file-request');
var UpdateFileRequest =  require('./platform/management/requests/update-file-request');
var ListFilesRequest = require('./platform/management/requests/list-files-request');

module.exports = {
    
    /**
     * @type {MediaPlatform}
     */
    MediaPlatform: MediaPlatform,

    image: {
        /**
         * @type {ImageRequest}
         */
        ImageRequest: ImageRequest,

        /**
         * @type {fromDto}
         */
        fromDto: imageRequestDeserializers.fromDto,

        /**
         * @type {fromUrl}
         */
        fromUrl: imageRequestDeserializers.fromUrl,

        /**
         * @type {fromUrlToImageRequest}
         */
        urlToImageRequest: imageRequestDeserializers.fromUrlToImageRequest,

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
