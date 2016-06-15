/**
 * @param operation
 * @constructor
 */
function Cropping(operation) {

    this.operation = operation;

    this.settings = {
        /**
         * @type {number|null}
         */
        x: null,
        /**
         * @type {number|null}
         */
        y: null,
        /**
         * @type {number|null}
         */
        scaleFactor: null
    };

    this.dimensions = this.dimensions.bind(this);
}

/**
 * @summary The `x` value of the crop
 * @param {number} x the x value
 * @param {number} y the y value
 * @param {number?} scaleFactor The Scale factor. Scale cannot be 0. Valid values: (0:100.0].
 * @returns {Crop} the operation
 */
Cropping.prototype.dimensions = function (x, y, scaleFactor) {
    this.settings.x = x;
    this.settings.y = y;
    this.settings.scaleFactor = scaleFactor || null;
    return this.operation;
};

/**
 * @returns {string}
 */
Cropping.prototype.serialize = function () {

    var out = '';

    if (this.settings.x) {
        out += 'x_' + this.settings.x;
    }

    if (this.settings.y) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'y_' + this.settings.y;
    }

    if (this.settings.scaleFactor) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'scl_' + this.settings.scaleFactor;
    }
    return out;
};

module.exports = Cropping;