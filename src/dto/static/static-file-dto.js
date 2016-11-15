var inherits = require('inherits');
var BaseDTO = require('../base-dto');

/**
 * @param {Object} data
 * @constructor
 */
function StaticFileDTO(data) {
    BaseDTO.call(this);

    if (data) {
        this.deserialize(data);
    }
}
inherits(StaticFileDTO, BaseDTO);

StaticFileDTO.prototype.deserialize = function (data) {
    StaticFileDTO.super_.prototype.deserialize.call(this, data);
};

/**
 * @type {StaticFileDTO}
 */
module.exports = StaticFileDTO;