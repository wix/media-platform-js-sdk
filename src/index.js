var MediaPlatform = require('./platform/media-platform');
var ImageRequest = require('./image/image-request');
var EncodingOptions = require('./dto/video/encoding-options');
var MetadataDTO = require('./dto/metadata-dto');
var MediaType = require('./dto/media-type');
var ListFilesRequest = require('./dto/management/list-files-request');
var UpdateFileRequest =  require('./dto/management/update-file-request');
var NewFolderRequest = require('./dto/management/new-folder-request');
var UpdateFolderRequest = require('./dto/management/update-folder-request');

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
        ImageRequest: ImageRequest
    },

    video: {
        /**
         * @type {EncodingOptions}
         */
        EncodingOptions: EncodingOptions
    },

    file: {
        /**
         * @type {MetadataDTO}
         */
        MetadataDTO: MetadataDTO,

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
    }

};
