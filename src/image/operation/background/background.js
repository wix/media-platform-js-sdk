/**
 * @param {*} operation
 * @constructor
 */
function Background(operation) {

    this.operation = operation;

    /**
     * @type {string|null}
     */
    this.error = null;
    
    this.settings = {
        /**
         * @type {string|null}
         */
        color: null
    };

    this.color = this.color.bind(this);
}
/**
 * @summary The background color, in case the canvas size is larger than the image itself.
 * @param {string} color an RGB value, of form `rrggbb`
 * @returns {*} the operation
 */
Background.prototype.color = function (color) {

    if (!!color && !color.match(/[0-9a-f]{6}/)) {
        this.error = 'background: ' + color + ' is not a valid 6 digit hex color';
        return this.operation;
    }

    this.error = null;
    this.settings.color = color;
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

    return {
        params: out,
        error: this.error
    };
};

/**
 * @type {Background}
 */
module.exports = Background;