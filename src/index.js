var MediaPlatform = require('./platform/media-platform');
var ImageRequest = require('./image/image-request');
var imageRequestDeserializers = require('./image/image-request-deserializer');
var Alignments = require('./image/operation/align/alignments');
var EncodingOptions = require('./dto/video/encoding-options');
var StaticFileOptions = require('./dto/static/static-file-options');
var UploadRequest = require('./dto/upload/upload-request');
var GetSecureURLRequest = require('./dto/download/get-secure-url-request');
var ImportRequest = require('./dto/upload/import-request');
var Authorization = require('./dto/upload/authorization');
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
     * @type {{AUDIO: string, VIDEO: string, IMAGE: string, DOCUMENT: string, STATIC: string}}
     */
    MediaType: MediaType,

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

    video: {
        /**
         * @type {EncodingOptions}
         */
        EncodingOptions: EncodingOptions
    },

    static: {
        /**
         * @type {StaticFileOptions}
         */
        StaticFileOptions: StaticFileOptions
    },

    file: {
        /**
         * @type {UploadRequest}
         */
        UploadRequest: UploadRequest,

        /**
         * @type {GetSecureURLRequest}
         */
        GetSecureURLRequest: GetSecureURLRequest,

        /**
         * @type {ImportRequest}
         */
        ImportRequest: ImportRequest,

        /**
         * @type {Authorization}
         */
        Authorization: Authorization,

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
