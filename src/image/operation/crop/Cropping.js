/**
 * Created by elad on 13/06/2016.
 */

/**
 * @constructor
 */
function Cropping() {
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
    }
}

/**
 * @summary The `x` value of the crop
 * @param {number} x the x value
 * @returns {Cropping} the operation
 */
Cropping.prototype.x = function (x) {
    this.settings.x = x;
    return this;
};

/**
 * @summary The `y` value of the crop
 * @param {number} y the y value
 * @returns {Cropping} the operation
 */
Cropping.prototype.y = function (y) {
    this.settings.y = y;
    return this;
};

/**
 * @param {number} scaleFactor The Scale factor. Scale cannot be 0. Valid values: (0:100.0].
 * @returns {Cropping} the operation
 */
Cropping.prototype.scaleFactor = function (scaleFactor) {
    this.settings.scaleFactor = scaleFactor;
    return this;
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
