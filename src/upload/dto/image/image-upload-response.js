var util = require('util');
var BaseUploadResponse = require('../base-upload-response');

/**
 * @typedef {{x: number, y: number, width: number, height: number}}
 */
var Square = {
    x: null,
    y: null,
    width: null,
    height: null
};

/**
 * @param {Object} data
 * @constructor
 */
function ImageUploadResponse(data) {
    BaseUploadResponse.call(this);

    /**
     * @type {number}
     */
    this.height = null;

    /**
     * @type {number}
     */
    this.width = null;

    /**
     * @type {string}
     */
    this.iconUrl = null;

    /**
     * @type {string}
     */
    this.mimeType = null;

    /**
     * @type {Array<Square>|null}
     */
    this.faces = null; //'face' in response object

    if (data) {
        this.deserialize(data);
    }
}
util.inherits(ImageUploadResponse, BaseUploadResponse);

ImageUploadResponse.prototype.deserialize = function (data) {
    ImageUploadResponse.super_.prototype.deserialize.call(this, data);

    this.width = data.width;
    this.height = data.height;
    this.faces = data.face || [];
};

/**
 * @type {ImageUploadResponse}
 */
module.exports = ImageUploadResponse;
// [
//     {
//         "parent_folder_id": "dc933247458b41792a0fb9d2f2296bb5",
//         "created_ts": 1466345821,
//         "hash": "0a9371085075b9fed4c29b9418804840",
//         "tags": [],
//         "file_name": "10a917_d723da13c9e44213924b582e1d641aaa~mv2.png",
//         "labels": [],
//         "file_url": "media/10a917_d723da13c9e44213924b582e1d641aaa~mv2.png",
//         "height": 17,
//         "width": 17,
//         "original_file_name": "included-icon.png",
//         "modified_ts": 1466345821,
//         "file_size": 842,
//         "media_type": "picture",
//         "icon_url": "media/10a917_d723da13c9e44213924b582e1d641aaa~mv2.png",
//         "mime_type": "image/png"
//     }
// ]
