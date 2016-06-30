var toDTO = require('../file-deserializer').toDTO;

/**
 * @param {{}} data
 * @constructor
 */
function ListFilesResponse(data) {

    /**
     * @type {number}
     */
    this.timeStamp = null;

    /**
     * @type {number}
     */
    this.count = null;

    /**
     * @type {string}
     */
    this.nextPageCursor = null;

    /**
     * @type {Array<BaseDTO>}
     */
    this.files = [];

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param {{}} data
 */
ListFilesResponse.prototype.deserialize = function (data) {

    this.timeStamp = data.ts;
    this.count = data.count;
    this.nextPageCursor = data.cursor;

    if (data.files) {
        this.files = data.files.map(toDTO);
    }
};

/**
 * @type {ListFilesResponse}
 */
module.exports = ListFilesResponse;