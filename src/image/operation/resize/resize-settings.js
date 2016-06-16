/**
 * @param operation
 * @constructor
 */
function Resize(operation) {
    
    this.operation = operation;
    
    this.settings = {
        /**
         * @type {boolean|null}
         */
        upscale: null
    };

    this.configuration = this.configuration.bind(this);
}

/**
 * @summary The resize filter
 * @param {boolean?} enableUpscale Enable image proportional upscaling.
 * @returns {*} the operation
 */
Resize.prototype.configuration = function (enableUpscale) {
    this.settings.upscale = !!enableUpscale;
    return this.operation;
};

/**
 * @returns {string}
 */
Resize.prototype.serialize = function () {

    var out = '';

    if (this.settings.upscale) {
        out += 'lg'
    }

    return out;
};

/**
 * @type {Resize}
 */
module.exports = Resize;