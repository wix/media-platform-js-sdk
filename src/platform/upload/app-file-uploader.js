/**
 * @param {AppConfiguration} configuration
 * @param {FileUploader} fileUploader
 * @constructor
 */
function AppFileUploader(configuration, fileUploader) {

    /**
     * @type {FileUploader}
     */
    this.fileUploader = fileUploader;

    /**
     * @type {string}
     */
    this.userId = configuration.apiKey;
}

/**
 * retrieve a pre signed URL to which the file is uploaded
 * @param {string} mediaType
 * @param {function(Error, {uploadUrl: string}|null)} callback
 */
AppFileUploader.prototype.getUploadUrl = function (mediaType, callback) {
    this.fileUploader.getUploadUrl(this.userId, mediaType, callback);
};

/**
 * @param {string|Buffer|Stream} source
 * @param {UploadRequest?} uploadRequest
 * @param {function(Error, ImageDTO)} callback
 */
AppFileUploader.prototype.uploadImage = function (source, uploadRequest, callback) {
    this.fileUploader.uploadImage(this.userId, source, uploadRequest, callback);
};

/**
 * @param {string|Buffer|Stream} source
 * @param {UploadRequest?} uploadRequest
 * @param {function(Error, AudioDTO)} callback
 */
AppFileUploader.prototype.uploadAudio = function (source, uploadRequest, callback) {
    this.fileUploader.uploadAudio(this.userId, source, uploadRequest, callback);
};

/**
 * @param {string|Buffer|Stream} source
 * @param {EncodingOptions?} encodingOptions
 * @param {UploadRequest?} uploadRequest
 * @param {function(Error, VideoDTO)} callback
 */
AppFileUploader.prototype.uploadVideo = function (source, encodingOptions, uploadRequest, callback) {
    this.fileUploader.uploadVideo(this.userId, source, encodingOptions, uploadRequest, callback);
};

/**
 * @param {string|Buffer|Stream} source
 * @param {UploadRequest?} uploadRequest
 * @param {function(Error, DocumentDTO)} callback
 */
AppFileUploader.prototype.uploadDocument = function (source, uploadRequest, callback) {
    this.fileUploader.uploadDocument(this.userId, source, uploadRequest, callback);
};

/**
 * @type {AppFileUploader}
 */
module.exports = AppFileUploader;