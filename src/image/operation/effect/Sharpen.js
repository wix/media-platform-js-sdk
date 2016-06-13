/**
 * Created by elad on 13/06/2016.
 */

/**
 * @constructor
 */
function Sharpen() {
    
    this.settings = {
        /**
         * @type {number|null}
         */
        radius: null
    } 
}

/**
 * @summary Sharpens the image using radius
 * @param {number} radius sharpening mask radius, `0` to `1`
 * @returns {Sharpen} the operation
 */
Sharpen.prototype.sharpen =  function (radius) {
    this.settings.radius = radius;
    return this;
};

/**
 * @returns {string}
 */
Sharpen.prototype.serialize = function () {

    var out = '';

    if (this.settings.radius) {
        out += 'shrp_' + this.settings.radius;
    }

    return out;
};

module.exports = Sharpen;