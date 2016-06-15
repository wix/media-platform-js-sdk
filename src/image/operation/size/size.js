/**
 * @param operation
 * @constructor
 */
function Size(operation) {
    
    this.operation = operation;
    
    this.settings = {
        width: null,
        height: null
    };
    
    this.size = this.size.bind(this);
}

/**
 * @summary The width constraint
 * @param {Number} width a number greater than `0`
 * @param {Number} height a number greater than `0`
 * @returns {Size} the operation
 */
Size.prototype.size = function (width, height) {
    this.settings.width = width;
    this.settings.height = height;
    return this.operation;
};

/**
 * @returns {string}
 */
Size.prototype.serialize = function () {
    var out = '';

    if (this.settings.width) {
        out += 'w_' + this.settings.width;
    }

    if (this.settings.height) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'h_' + this.settings.height;
    }

    return out;
};

/**
 * @type {Size}
 */
module.exports = Size;
