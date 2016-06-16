var _ = require('underscore');
var Alignments = require('./alignments');

/**
 * @param {*} operation
 * @constructor
 */
function Align(operation) {

    this.operation = operation;

    this.settings = {
        /**
         * @type {string|null}
         */
        alignment: null
    };

    this.alignment = this.alignment.bind(this);
}

/**
 * @summary Sets the alignment value for this operation
 * @param {Alignments} a the alignment value
 * @returns {*} the operation
 */
Align.prototype.alignment = function (a) {

    if (!!a && !_.findKey(Alignments, function(value) {
            return value === a;
        })) {
        console.error('align: ' + a + ' is not a valid alignment value - see alignments.js for valid values');
        return this.operation;
    }

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

/**
 * @type {Align}
 */
module.exports = Align;
