var ItemDTO = require('./item-dto');

/**
 * @param {{}} data
 * @constructor
 */
function CollectionDTO(data) {

    /**
     * @type {string}
     */
    this.id = null;

    /**
     * @type {string}
     */
    this.type = null;

    /**
     * @type {string}
     */
    this.title = null;

    /**
     * @type {Array<string>}
     */
    this.tags = [];

    /**
     * @type {Array<ItemDTO>}
     */
    this.items = [];

    /**
     * @type {string}
     */
    this.thumbnailUrl = null;

    /**
     * @type {Object.<string, string>}
     */
    this.publicProperties = {};

    /**
     * @type {Object.<string, string>}
     */
    this.privateProperties = {};

    /**
     * @type {string}
     */
    this.dateCreated = null;

    /**
     * @type {string}
     */
    this.dateUpdated = null;

    if (data) {
        this.deserialize(data);
    }
}


/**
 * @param {{}} data
 * @private
 */
CollectionDTO.prototype.deserialize = function (data) {
    this.id = data.id;
    this.type = data.type;
    this.title = data.title;
    this.thumbnailUrl = data.thumbnail_url;
    this.tags = data.tags;
    this.publicProperties = data.public_properties;
    this.privateProperties = data.private_properties;
    this.dateCreated = data.date_created;
    this.dateUpdated = data.date_updated;
    
    if (data.items) {
        this.items = data.items.map(function (item) {
            return new ItemDTO(item);
        });
    }
};

/**
 * @type {CollectionDTO}
 */
module.exports = CollectionDTO;

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