/**
 * @param operation
 * @constructor
 */
function Sharpen(operation) {
    
    this.operation = operation;
    
    this.settings = {
        /**
         * @type {number|null}
         */
        radius: null
    };

    this.sharpen = this.sharpen.bind(this);
}

/**
 * @summary Sharpens the image using radius
 * @param {number} radius sharpening mask radius, `0` to `1`
 * @returns {Sharpen} the operation
 */
Sharpen.prototype.sharpen = function (radius) {
    this.settings.radius = radius;
    return this.operation;
};

/**
 * @returns {string}
 */
Sharpen.prototype.serialize = function () {

    var out = '';

    if (this.settings.radius) {
        out += 'shrp_' + this.settings.radius;
    }

    return out;
};

module.exports = Sharpen;