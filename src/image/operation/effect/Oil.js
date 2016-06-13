/**
 * Created by elad on 13/06/2016.
 */

/**
 * @constructor
 */
function Oil() {
    
    this.settings = {
        /**
         * @type {number|null}
         */
        active: null
    } 
}

/**
 * @summary Applies an oil paint effect to the image.
 * @returns {Oil} the operation
 */
Oil.prototype.oil = function () {
    this.settings.active = true;
    return this;
};

/**
 * @summary Applies an oil paint effect to the image.
 * @returns {Oil} the operation
 */
Oil.prototype.deactivate = function () {
    this.settings.active = null;
    return this;
};

/**
 * @returns {string}
 */
Oil.prototype.serialize = function () {

    var out = '';

    if (this.settings.active) {
        out += 'oil';
    }

    return out;
};

module.exports = Oil;