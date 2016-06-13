/**
 * Created by elad on 13/06/2016.
 */

/**
 * @constructor
 */
function RedEyeRemover() {
  
    this.settings = {
        /**
         * @type {boolean|null}
         */
        active: null
    }
    
}

/**
 * @summary Red eye removal
 * @returns {RedEyeRemover} the operation
 */
RedEyeRemover.prototype.activate = function () {
    this.settings.active = true;
    return this;
};

/**
 * @summary Red eye removal
 * @returns {RedEyeRemover} the operation
 */
RedEyeRemover.prototype.deactivate = function () {
    this.settings.active = null;
    return this;
};

/**
 * @returns {string}
 */
RedEyeRemover.prototype.serialize = function () {

    var out = '';

    if (this.settings.active) {
        out += 'eye';
    }

    return out;
};

module.exports = RedEyeRemover;