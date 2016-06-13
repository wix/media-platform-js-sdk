/**
 * Created by elad on 13/06/2016.
 */

var _ = require('underscore');

/**
 * @constructor
 */
function Chromaticity() {

    this.settings = {
        brightness: null,
        contrast: null,
        saturation: null,
        hue: null
    }

}

/**
 * @summary brightness of the image
 * @description supports `auto` or a numeric value between `-100` and `100`
 * @param {string|number} b a Number between `-100` and `100` or 'auto'
 * @returns {Chromaticity} the operation
 */
Chromaticity.prototype.brightness = function (b) {
    this.settings.brightness = _.isUndefined(b) ? null : b;
    return this;
};

/**
 * @summary contrast of the image.
 * @description supports `auto` or a numeric value between `-100` and `100`
 * @param {string|number} c a Number between `-100` and `100` or `auto`
 * @returns {Chromaticity} the operation
 */
Chromaticity.prototype.contrast = function (c) {
    this.settings.contrast = _.isUndefined(c) ? null : c;
    return this;
};

/**
 * @summary saturation of the image.
 * @description supports `auto` or a numeric value between `-100` and `100`
 * @param {string|number} s a Number between `-100` and `100` or `auto`
 * @returns {Chromaticity} the operation
 */
Chromaticity.prototype.saturation = function (s) {
    this.settings.saturation = _.isUndefined(s) ? null : s;
    return this;
};

/**
 * @summary hue of the image.
 * @description supports `auto` or a numeric value between `-100` and `100`
 * @param {string|number} h a Number between `-100` and `100` or `auto`
 * @returns {Chromaticity} the operation
 */
Chromaticity.prototype.hue = function (h) {
    this.settings.hue = _.isUndefined(h) ? null : h;
    return this;
};

/**
 * @returns {string}
 */
Chromaticity.prototype.serialize = function () {

    var out = '';

    if (this.settings.brightness) {
        out += 'br_' + this.settings.brightness;
    }

    if (this.settings.contrast) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'con_' + this.settings.contrast;
    }

    if (this.settings.saturation) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'sat_' + this.settings.saturation;
    }

    if (this.settings.hue) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'hue_' + this.settings.hue;
    }
    return out;
};

module.exports = Chromaticity;