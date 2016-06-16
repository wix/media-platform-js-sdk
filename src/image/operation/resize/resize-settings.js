/**
 * @param operation
 * @constructor
 */
function ResizeSettings(operation) {
    
    this.operation = operation;
    
    this.settings = {
        /**
         * @type {boolean|null}
         */
        upscale: null
    };

    this.enableUpscale = this.enableUpscale.bind(this);
}

/**
 * @summary The resize filter
 * @param {boolean?} enableUpscale Enable image proportional upscaling.
 * @returns {*} the operation
 */
ResizeSettings.prototype.enableUpscale = function (enableUpscale) {
    this.settings.upscale = (enableUpscale === undefined) ? true : !!enableUpscale;
    return this.operation;
};

/**
 * @returns {string}
 */
ResizeSettings.prototype.serialize = function () {

    var out = '';

    if (this.settings.upscale) {
        out += 'lg'
    }

    return out;
};

/**
 * @type {ResizeSettings}
 */
module.exports = ResizeSettings;