/**
 * Created by elad on 13/06/2016.
 */

/**
 * @constructor
 */
function Background(operation) {

    this.operation = operation;
    
    this.settings = {
        /**
         * @type {string|null}
         */
        color: null
    }
}
/**
 * @summary The background color, in case the canvas size is larger than the image itself.
 * @param {string} color an RGB value, of form `rrggbb`
 * @returns {Background} the operation
 */
Background.prototype.color = function (color) {
    this.settings.c = color;
    return this.operation;
};

/**
 * @returns {string}
 */
Background.prototype.serialize = function () {

    var out = '';

    if (this.settings.color) {
        out += 'c_' + this.settings.color;
    }

    return out;
};

module.exports = Background;