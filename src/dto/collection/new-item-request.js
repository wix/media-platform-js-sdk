/**
 * @constructor
 */
function NewItemRequest() {

    /**
     * @type {string}
     */
    this.mediaType = null;

    /**
     * @type {string}
     */
    this.title = null;

    /**
     * @type {Array<string>}
     */
    this.tags = [];

    /**
     * @type {Object.<string, string>}
     */
    this.publicProperties = null;

    /**
     * @type {Object.<string, string>}
     */
    this.privateProperties = null;
}

/**
 * @param {string} mediaType
 * @returns {NewItemRequest}
 */
NewItemRequest.prototype.setMediaType = function (mediaType) {
    this.mediaType = mediaType;
    return this;
};

/**
 * @param {string} title
 * @returns {NewItemRequest}
 */
NewItemRequest.prototype.setTitle = function (title) {
    this.title = title;
    return this;
};

/**
 * @param {Array<string>} tags
 * @returns {NewItemRequest}
 */
NewItemRequest.prototype.setTags = function (tags) {
    this.tags = tags;
    return this;
};

/**
 * @param {Object.<string, string>} publicProperties
 * @returns {NewItemRequest}
 */
NewItemRequest.prototype.setPublicProperties = function (publicProperties) {
    this.publicProperties = publicProperties;
    return this;
};

/**
 * @param {Object.<string, string>} privateProperties
 * @returns {NewItemRequest}
 */
NewItemRequest.prototype.setPrivateProperties = function (privateProperties) {
    this.privateProperties = privateProperties;
    return this;
};

/**
 * @returns {{type: (*|string), title: *, sort_order: (*|number), tags: *, public_properties: (Object.<string, string>|*), private_properties: (Object.<string, string>|*)}}
 */
NewItemRequest.prototype.toParams = function () {
    return {
        type: this.mediaType,
        title: this.title,
        tags: this.tags,
        public_properties: this.publicProperties,
        private_properties: this.privateProperties
    }
};

/**
 * @type {NewItemRequest}
 */
module.exports = NewItemRequest;