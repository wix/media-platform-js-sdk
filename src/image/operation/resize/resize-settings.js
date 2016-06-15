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

    this.configuration = this.configuration.bind(this);
}

/**
 * @summary The resize filter
 * @param {ResizeFilters?} filter the filter to use, from {@link ResizeFilters}
 * @param {boolean?} enableUpscaling Enable image proportional upscaling.
 * @returns {Resize} the operation
 */
Resize.prototype.configuration = function (filter, enableUpscaling) {
    this.settings.filter = !!filter ? filter : null;
    this.settings.upscale = !!enableUpscaling;
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