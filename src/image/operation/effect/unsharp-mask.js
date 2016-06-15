/**
 * @param operation
 * @constructor
 */
function UnsharpMask(operation) {
    
    this.operation = operation;
    
    this.settings = {
        /**
         * @type {number|null}
         */
        radius: null,
        /**
         * @type {number|null}
         */
        amount: null,
        /**
         * @type {number|null}
         */
        threshold: null
    };

    this.configuration = this.configuration.bind(this);
}

/**
 * @summary Sharpens the image using radius, amount & threshold parameters
 * @param {number} radius the unsharp mask radius. default value: `0.50`
 * @param {number} amount the unsharp mask amount. default value: `0.20`
 * @param {number} threshold the unsharp mask threshold. default value: `0.00`
 * @returns {UnsharpMask} the operation
 */
UnsharpMask.prototype.configuration = function (radius, amount, threshold) {
    this.settings.radius = radius;
    this.settings.amount = amount;
    this.settings.threshold = threshold;
    return this.operation;
};

/**
 * @returns {string}
 */
UnsharpMask.prototype.serialize = function () {

    var out = '';

    if (this.settings.radius && this.settings.amount && this.settings.threshold) {
        out += 'usm_' + this.settings.radius + "_" + this.settings.amount + "_" + this.settings.threshold;
    }

    return out;
};

/**
 * @type {UnsharpMask}
 */
module.exports = UnsharpMask;