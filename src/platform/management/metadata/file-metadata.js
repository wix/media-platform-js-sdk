var FileDescriptor = require('./file-descriptor');
var ImageBasicMetadata = require('./image-basic-metadata');
var VideoBasicMetadata = require('./video-basic-metadata');
var ImageFeatures = require('./image-features');
var VideoPosters = require('./video-posters');

/**
 * @param data
 * @constructor
 */
function FileMetadata(data) {

    /**
     * @type {string}
     */
    this.fileDescriptor = null;

    /**
     * @type {string}
     */
    this.basic = null;

    /**
     * @type {ImageFeatures}
     */
    this.features = null;

    /**
     * * @type {VideoPosters}
     */
    this.posters = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
FileMetadata.prototype.deserialize = function (data) {
    this.fileDescriptor = new FileDescriptor(data.fileDescriptor);
    var type = this.fileDescriptor.mimeType.split('/')[0].toLowerCase();
    if (data.basic) {
        switch (type) {
            case 'image':
                this.basic = new ImageBasicMetadata(data.basic);
                break;
            case 'video':
                this.basic = new VideoBasicMetadata(data.basic);
                break;
        }
    }
    if (data.features) {
        switch (type) {
            case 'image':
                this.features = new ImageFeatures(data.features);
                break;
        }
    }
    if (type === 'video' && data.posters) {
        this.posters = new VideoPosters(data.posters);
    }
};


/**
 * @type {FileMetadata}
 */
module.exports = FileMetadata;
