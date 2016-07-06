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
    this.type = null;

    /**
     * @type {Array<NewItemRequest>}
     */
    this.items = [];
}
inherits(NewCollectionRequest, UpdateCollectionRequest);

/**
 * @param {string} type
 * @returns {UpdateCollectionRequest}
 */
NewCollectionRequest.prototype.setType = function (type) {
    this.type = type;
    return this;
};

/**
 * @param {Array<NewItemRequest>} items
 * @returns {NewCollectionRequest}
 */
NewCollectionRequest.prototype.setItems = function (items) {
    this.items = items;
    return this;
};

/**
 * @returns {{title: *, thumbnail_url: (*|string), type: *, tags: *, items: Array, public_properties: (Object.<string, string>|*), private_properties: (Object.<string, string>|*)}}
 */
NewCollectionRequest.prototype.toParams = function () {

    var items = this.items.map(function (item) {
        return item.toParams();
    });

    return {
        title: this.title,
        thumbnail_url: this.thumbnailUrl,
        type: this.type,
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