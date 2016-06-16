/**
 * @param operation
 * @constructor
 */
function Oil(operation) {

    this.operation = operation;

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
 * @param {boolean?} active
 * @returns {*} the operation
 */
Oil.prototype.activate = function (active) {
    this.settings.active = (active === undefined) ? true : !!active;
    return this.operation;
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

/**
 * @type {Oil}
 */
module.exports = Oil;