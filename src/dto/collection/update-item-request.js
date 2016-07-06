var inherits = require('inherits');
var NewItemRequest = require('./new-item-request');

function UpdateItemRequest() {
    NewItemRequest.call(this);

    /**
     * @type {string}
     */
    this.id = null
}
inherits(UpdateItemRequest, NewItemRequest);

/**
 * @param {string} id
 * @returns {UpdateItemRequest}
 */
UpdateItemRequest.prototype.setId = function (id) {
    this.id = id;
    return this;
};

/**
 * @returns {{id: *, type: (*|string), title: *, tags: *, public_properties: (Object.<string, string>|*), private_properties: (*|Object.<string, string>)}}
 */
UpdateItemRequest.prototype.toParams = function () {
    return {
        id: this.id,
        type: this.type,
        title: this.title,
        tags: this.tags,
        public_properties: this.publicProperties,
        private_properties: this.privateProperties
    }
};

/**
 * @type {UpdateItemRequest}
 */
module.exports = UpdateItemRequest;     