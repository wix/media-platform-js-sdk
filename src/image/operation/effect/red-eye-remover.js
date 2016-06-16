/**
 * @param operation
 * @constructor
 */
function RedEyeRemover(operation) {
  
    this.operation = operation;

    /**
     * @type {string|null}
     */
    this.error = null;
    
    this.settings = {
        /**
         * @type {boolean|null}
         */
        active: null
    };

    this.activate = this.activate.bind(this);
}

/**
 * @summary Red eye removal
 * @returns {*} the operation
 */
RedEyeRemover.prototype.activate = function (active) {
    this.settings.active = (active === undefined) ? true : !!active;
    return this.operation;
};

/**
 * @returns {string}
 */
RedEyeRemover.prototype.serialize = function () {

    var out = '';

    if (this.settings.active) {
        out += 'eye';
    }

    return {
        params: out,
        error: this.error
    };
};

/**
 * @type {RedEyeRemover}
 */
module.exports = RedEyeRemover;