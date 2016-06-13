/**
 * Created by elad on 13/06/2016.
 */

function Size() {
    this.settings = {
        width: null,
        height: null
    }
}

/**
 * @summary The width constraint
 * @param {Number} w a number greater than `0`
 * @returns {Size} the operation
 */
Size.prototype.width= function (w) {
    this.settings.width = w;
    return this;
};

/**
 * @summary The height constraint
 * @param {Number} h a number greater than `0`
 * @returns {Size} the operation
 */
Size.prototype.height= function (h) {
    this.settings.height = h;
    return this;
};

/**
 * @summary The shorthand to set width and height
 * @param {Number} w a number greater than `0`
 * @param {Number} h a number greater than `0`
 * @returns {Size} the operation
 */
Size.prototype.size = function (w, h) {
    this.width(w);
    this.height(h);
    return this;
};

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

module.exports = Size;
