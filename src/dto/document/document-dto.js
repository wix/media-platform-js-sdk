var util = require('util');
var BaseDTO = require('../base-dto');

/**
 * @param {Object} data
 * @constructor
 */
function DocumentDTO(data) {
    BaseDTO.call(this);

    if (data) {
        this.deserialize(data);
    }
}
util.inherits(DocumentDTO, BaseDTO);

DocumentDTO.prototype.deserialize = function (data) {
    DocumentDTO.super_.prototype.deserialize.call(this, data);
};

/**
 * @type {DocumentDTO}
 */
module.exports = DocumentDTO;

// [
//     {
//         "parent_folder_id": "5d899584b15b2691bd0100d322ea201d",
//         "created_ts": 1466668462,
//         "hash": "b9376c800ea7ab681da23ee6c18c0e69",
//         "tags": [],
//         "file_name": "10a917_f1acd59629ec4a109eac8d8f2ab6a929.xlsx",
//         "labels": [],
//         "file_url": "ugd/10a917_f1acd59629ec4a109eac8d8f2ab6a929.xlsx",
//         "original_file_name": "document.xlsx",
//         "modified_ts": 1466668462,
//         "file_size": 21034,
//         "media_type": "document",
//         "icon_url": "media/6167099680654d6a026118a70f4c8715.png",
//         "mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     }
// ]