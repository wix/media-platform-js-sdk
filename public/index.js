var MediaPlatform = require('./platform/media-platform');
var MediaType = require('../src/dto/media-type');
var ImageDTO = require('../src/dto/image/image-dto');
var VideoDTO = require('../src/dto/video/video-dto');
var AudioDTO = require('../src/dto/audio/audio-dto');
var DocumentDTO = require('../src/dto/document/document-dto');
var StaticFileDTO = require('../src/dto/static/static-file-dto');
var toDTO = require('../src/dto/file-deserializer').toDTO;
var ImageRequest = require('../src/image/image-request');
var imageRequestDeserializers = require('../src/image/image-request-deserializer');
var Alignments = require('../src/image/operation/align/alignments');
var EncodingOptions = require('../src/dto/video/encoding-options');
var StaticFileOptions = require('../src/dto/static/static-file-options');
var UploadRequest = require('../src/dto/upload/upload-request');
var ListFilesRequest = require('../src/dto/management/list-files-request');
var UpdateFileRequest = require('../src/dto/management/update-file-request');
var NewFolderRequest = require('../src/dto/management/new-folder-request');
var UpdateFolderRequest = require('../src/dto/management/update-folder-request');
var NewCollectionRequest = require('../src/dto/collection/new-collection-request');
var UpdateCollectionRequest = require('../src/dto/collection/update-collection-request');
var NewItemRequest = require('../src/dto/collection/new-item-request');
var UpdateItemRequest = require('../src/dto/collection/update-item-request');

var MP = {};

/**
 * @type {MediaPlatform}
 */
MP.MediaPlatform = MediaPlatform;

/**
 * @type {MediaType}
 */
MP.MediaType = MediaType;

MP.image = {
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
    Alignments: Alignments,

    /**
     * @type {ImageDTO}
     */
    ImageDTO: ImageDTO
};

MP.video = {
    /**
     * @type {EncodingOptions}
     */
    EncodingOptions: EncodingOptions,

    /**
     * @type {VideoDTO}
     */
    VideoDTO: VideoDTO
};

MP.audio = {
    /**
     * @type {AudioDTO}
     */
    AudioDTO: AudioDTO
};

MP.document = {
    /**
     * @type {DocumentDTO}
     */
    DocumentDTO: DocumentDTO
};

MP.static = {
    /**
     * @type {StaticFileOptions}
     */
    StaticFileOptions: StaticFileOptions,

    /**
     * @type {StaticFileDTO}
     */
    StaticFileDTO: StaticFileDTO
};

MP.file = {
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
    UpdateFolderRequest: UpdateFolderRequest,

    /**
     * @type {toDTO}
     */
    toDTO: toDTO
};

MP.collection = {
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
};

module.exports = MP;