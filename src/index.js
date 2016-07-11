var MediaPlatform = require('./platform/media-platform');
var ImageRequest = require('./image/image-request');
var Alignments = require('./image/operation/align/alignments');
var EncodingOptions = require('./dto/video/encoding-options');
var UploadRequest = require('./dto/upload/upload-request');
var MediaType = require('./dto/media-type');
var ListFilesRequest = require('./dto/management/list-files-request');
var UpdateFileRequest =  require('./dto/management/update-file-request');
var NewFolderRequest = require('./dto/management/new-folder-request');
var UpdateFolderRequest = require('./dto/management/update-folder-request');
var NewCollectionRequest = require('./dto/collection/new-collection-request');
var UpdateCollectionRequest = require('./dto/collection/update-collection-request');
var NewItemRequest = require('./dto/collection/new-item-request');
var UpdateItemRequest = require('./dto/collection/update-item-request');

module.exports = {
    
    /**
     * @type {MediaPlatform}
     */
    MediaPlatform: MediaPlatform,

    /**
     * @type {{AUDIO: string, VIDEO: string, IMAGE: string, DOCUMENT: string}}
     */
    MediaType: MediaType,

    image: {
        /**
         * @type {ImageRequest}
         */
        ImageRequest: ImageRequest,

        /**
         * @type {Alignments}
         */
        Alignments: Alignments
    },

    video: {
        /**
         * @type {EncodingOptions}
         */
        EncodingOptions: EncodingOptions
    },

    file: {
        /**
         * @type {UploadRequest}
         */
        UploadRequest: UploadRequest,

        /**
         * @type {ListFilesRequest}
         */
        ListFilesRequest: ListFilesRequest,

        /**
         * @type {UpdateFileRequest}
         */
        UpdateFileRequest: UpdateFileRequest,

        /**
         * @type {NewFolderRequest}
         */
        NewFolderRequest: NewFolderRequest,

        /**
         * @type {UpdateFolderRequest}
         */
        UpdateFolderRequest: UpdateFolderRequest
    },

    collection: {
        /**
         * @type {NewCollectionRequest}
         */
        NewCollectionRequest: NewCollectionRequest,

        /**
         * @type {UpdateCollectionRequest}
         */
        UpdateCollectionRequest: UpdateCollectionRequest,

        /**
         * @type {NewItemRequest}
         */
        NewItemRequest: NewItemRequest,

        /**
         * @type {UpdateItemRequest}
         */
        UpdateItemRequest: UpdateItemRequest
    }
};
