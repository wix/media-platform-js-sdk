var inherits = require('inherits');
var UpdateCollectionRequest = require('./update-collection-request');

/**
 * @constructor
 */
function NewCollectionRequest() {
    UpdateCollectionRequest.call(this);
    
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
     * @type {string}
     */
    this.mediaType = null;

    /**
     * @type {Array<NewItemRequest>}
     */
    this.items = [];

    /**
     * @type {Object.<string, string>}
     */
    this.publicProperties = null;

    /**
     * @type {Object.<string, string>}
     */
    this.privateProperties = null;
}
inherits(NewCollectionRequest, UpdateCollectionRequest);

/**
 * @param {Array<NewItemRequest>} items
 * @returns {NewCollectionRequest}
 */
NewCollectionRequest.prototype.setItems = function (items) {
    this.items = items;
    return this;
};

/**
 * @returns {{title: *, thumbnail_url: string, type: string, tags: *, items: *, public_properties: Object.<string, string>, private_properties: Object.<string, string>}}
 */
NewCollectionRequest.prototype.toParams = function () {

    var items = this.items.map(function (item) {
        item.toParams();
    });

    return {
        title: this.title,
        thumbnail_url: this.thumbnailUrl,
        type: this.mediaType,
        tags: this.tags,
        items: items,
        public_properties: this.publicProperties,
        private_properties: this.privateProperties
    }
};

/**
 * @type {NewCollectionRequest}
 */
module.exports = NewCollectionRequest;

/*
 {
 "type": "string value",
 "title": "string value",
 "tags": [
 {}
 ],
 "items": [
 {
 "type": "string value",
 "title": "string value",
 "sort_order": "string value",
 "tags": [
 {}
 ],
 "public_properties": {},
 "private_properties": {}
 }
 ],
 "thumbnail_url": "string value",
 "public_properties": {},
 "private_properties": {}
 }
 */