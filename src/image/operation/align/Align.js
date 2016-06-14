/**
 * Created by elad on 13/06/2016.
 */

/**
 * @param {BaseOperation} operation
 * @constructor
 */
function Align(operation) {
    
    this.operation = operation;
    
    this.settings = {
        /**
         * @type {string|null}
         */
        alignment: null
    }
}

/**
 * @summary Sets the alignment value for this operation
 * @param {Alignments} a the alignment value
 * @returns {BaseOperation} the operation
 */
Align.prototype.alignment = function (a) {
    this.settings.alignment = !!a ? a : null;
    return this.operation;
};

/**
 * @returns {string}
 */
Align.prototype.serialize = function () {

    var out = '';

    if (this.settings.alignment) {
        out += 'al_' + this.settings.alignment;
    }

    return out;
};

module.exports = Align;
