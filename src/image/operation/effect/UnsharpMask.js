/**
 * Created by elad on 13/06/2016.
 */

/**
 * @constructor
 */
function UnsharpMask() {
    this.settings = {
        active: null,
        radius: 0.5,
        amount: 0.2,
        threshold: 0
    }
}

/**
 * @summary Sharpens the image using radius, amount & threshold parameters
 * @param {number} radius the unsharp mask radius. default value: `0.50`
 * @returns {UnsharpMask} the operation
 */
UnsharpMask.prototype.radius = function (radius) {
    this.settings.radius = radius;
    this.settings.active = true;
    return this;
};

/**
 * @summary Sharpens the image using radius, amount & threshold parameters
 * @param {number} amount the unsharp mask amount. default value: `0.20`
 * @returns {UnsharpMask} the operation
 */
UnsharpMask.prototype.amount = function (amount) {
    this.settings.amount = amount;
    this.settings.active = true;
    return this;
};

/**
 * @summary Sharpens the image using radius, amount & threshold parameters
 * @param {number} threshold the unsharp mask threshold. default value: `0.00`
 * @returns {UnsharpMask} the operation
 */
UnsharpMask.prototype.threshold = function (threshold) {
    this.settings.threshold = threshold;
    this.settings.active = true;
    return this;
};

/**
 * @summary Sharpens the image using radius, amount & threshold parameters
 * @returns {UnsharpMask} the operation
 */
UnsharpMask.prototype.deactivate = function () {
    this.settings.active = null;
    return this;
};

/**
 * @returns {string}
 */
UnsharpMask.prototype.serialize = function () {

    var out = '';

    if (this.settings.active) {
        out += 'usm_' + this.settings.radius + "_" + this.settings.amount + "_" + this.settings.threshold;
    }

    return out;
};

module.exports = UnsharpMask;