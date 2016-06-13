/**
 * Created by elad on 13/06/2016.
 */

/**
 * @constructor
 */
function Negative() {
    
    this.settings = {
        /**
         * @type {number|null}
         */
        active: null
    } 
}

/**
 * @summary Applies an oil paint effect to the image.
 * @returns {Negative} the operation
 */
Negative.prototype.neg = function () {
    this.settings.active = true;
    return this;
};

/**
 * @summary Applies an oil paint effect to the image.
 * @returns {Negative} the operation
 */
Negative.prototype.deactivate = function () {
    this.settings.active = null;
    return this;
};

/**
 * @returns {string}
 */
Negative.prototype.serialize = function () {

    var out = '';

    if (this.settings.active) {
        out += 'neg';
    }

    return out;
};

module.exports = Negative;