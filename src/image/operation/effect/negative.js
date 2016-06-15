/**
 * @param operation
 * @constructor
 */
function Negative(operation) {
    
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
 * @returns {Negative} the operation
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

    return out;
};

/**
 * @type {Negative}
 */
module.exports = Negative;