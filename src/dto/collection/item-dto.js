/**
 * @param {{}} data
 * @constructor
 */
function ItemDTO(data) {

    /**
     * @type {string}
     */
    this.id = null;

    /**
     * @type {string}
     */
    this.type = null;

    /**
     * @type {title}
     */
    this.title = null;

    /**
     * @type {number}
     */
    this.ordinal = null;

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
 * @returns {{id: *, type: (*|string), title: *, sort_order: (*|number), tags: *, public_properties: (Object.<string, string>|*), private_properties: (Object.<string, string>|*)}}
 */
ItemDTO.prototype.toParams = function () {
    return {
        id: this.id,
        type: this.type,
        title: this.title,
        sort_order: this.ordinal,
        tags: this.tags,
        public_properties: this.publicProperties,
        private_properties: this.privateProperties
    }
};

/**
 * @param {{}} data
 * @private
 */
ItemDTO.prototype.deserialize = function (data) {
    this.id = data.id;
    this.type = data.type;
    this.title = data.title;
    this.ordinal = data.sort_order;
    this.tags = data.tags;
    this.publicProperties = data.public_properties;
    this.privateProperties = data.private_properties;
    this.dateCreated = data.date_created;
    this.dateUpdated = data.date_updated;
};

module.exports = ItemDTO;

/*
 {
 "id": "string value",
 "type": "string value",
 "title": "string value",
 "sort_order": "string value",
 "tags": [
 {}
 ],
 "public_properties": {},
 "date_created": "2016-02-04T10:24:40.591Z",
 "date_updated": "2016-02-04T10:24:40.591Z"
 }
 */