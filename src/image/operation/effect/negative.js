/**
 * @param operation
 * @constructor
 */
function Negative(operation) {
    
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
 * @summary Applies an oil paint effect to the image.
 * @returns {*} the operation
 */
Negative.prototype.activate = function (active) {
    this.settings.active = (active === undefined) ? true : !!active;
    return this.operation;
};

/**
 * @returns {string}
 */
Negative.prototype.serialize = function () {

    var out = '';

    if (this.settings.active) {
        out += 'neg';
    }

    return {
        params: out,
        error: this.error
    };
};

/**
 * @type {Negative}
 */
module.exports = Negative;