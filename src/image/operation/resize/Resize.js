/**
 * Created by elad on 06/06/2016.
 */

/**
 * @param operation
 * @constructor
 */
function Resize(operation) {
    
    this.operation = operation;
    
    this.settings = {
        /**
         * @type {number|null}
         */
        filter: null,
        /**
         * @type {boolean|null}
         */
        upscale: null
    };
    
}

/**
 * @summary The resize filter
 * @param {ResizeFilters?} rf the filter to use, from {@link ResizeFilters}
 * @returns {Resize} the operation
 */
Resize.prototype.resizeFilter = function (rf) {
    this.settings.filter = !!rf ? rf : null;
    return this.operation;
};

/**
 * @summary Enable image proportional upscaling.
 * @returns {Resize} the operation
 */
Resize.prototype.enableUpscaling = function () {
    this.settings.upscale = true;
    return this.operation;
};

/**
 * @summary Disable image proportional upscaling.
 * @returns {Resize} the operation
 */
Resize.prototype.disableUpscaling = function () {
    this.settings.upscale = null;
    return this.operation;
};

Resize.prototype.serialize = function () {

    var out = '';

    if (this.settings.filter) {
        out += 'rf_' + this.settings.filter;
    }

    if (this.settings.upscale) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'lg'
    }

    return out;
};

module.exports = Resize;