/**
 * @constructor
 */
function UpdateCollectionRequest() {

    /**
     * @type {string}
     */
    this.title = null;

    /**
     * @type {string}
     */
    this.thumbnailUrl = null;

    /**
     * @type {Array<string>}
     */
    this.tags = [];

    /**
     * @type {Object.<string, string>}
     */
    this.publicProperties = {};

    /**
     * @type {Object.<string, string>}
     */
    this.privateProperties = {};
}

/**
 * @param {string} title
 * @returns {UpdateCollectionRequest}
 */
UpdateCollectionRequest.prototype.setTitle = function (title) {
    this.title = title;
    return this;
};

/**
 * @param {string} thumbnailUrl
 * @returns {UpdateCollectionRequest}
 */
UpdateCollectionRequest.prototype.setThumbnailUrl = function (thumbnailUrl) {
    this.thumbnailUrl = thumbnailUrl;
    return this;
};

/**
 * @param {Array<string>} tags
 * @returns {UpdateCollectionRequest}
 */
UpdateCollectionRequest.prototype.setTags = function (tags) {
    this.tags = tags;
    return this;
};

/**
 * @param {Object.<string, string>} publicProperties
 * @returns {UpdateCollectionRequest}
 */
UpdateCollectionRequest.prototype.setPublicProperties = function (publicProperties) {
    this.publicProperties = publicProperties;
    return this;
};

/**
 * @param {Object.<string, string>} privateProperties
 * @returns {UpdateCollectionRequest}
 */
UpdateCollectionRequest.prototype.setPrivateProperties = function (privateProperties) {
    this.privateProperties = privateProperties;
    return this;
};

/**
 * @returns {{title: *, thumbnail_url: (string|*), tags: *, public_properties: (Object.<string, string>|*), private_properties: (Object.<string, string>|*)}}
 */
UpdateCollectionRequest.prototype.toParams = function () {
    return {
        title: this.title,
        thumbnail_url: this.thumbnailUrl,
        tags: this.tags,
        public_properties: this.publicProperties,
        private_properties: this.privateProperties
    }
};

/**
 * @type {UpdateCollectionRequest}
 */
module.exports = UpdateCollectionRequest;