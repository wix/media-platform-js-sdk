var errorHandler = require('../handler/error-handler');

/**
 * @param {BaseOperation} operation
 * @param {string} name
 * @param {number} value
 * @param {number} lowerBound
 * @param {number} upperBound
 * @returns {boolean}
 */
function numberInRange(operation, name, value, lowerBound, upperBound) {
    if (value > upperBound || value < lowerBound) {
        errorHandler.onError(operation, name + ': ' + value + ' is not a number between ' + lowerBound +  ' to ' + upperBound);
        return false;
    }
    
    return true;
}

/**
 * @param {BaseOperation} operation
 * @param {string} name
 * @param {number} value
 * @param {number} lowerBound
 * @returns {boolean}
 */
function numberIsGreaterThan(operation, name, value, lowerBound) {
    if (value < lowerBound) {
        errorHandler.onError(operation, name + ': ' + value + ' is not a number greater than ' + lowerBound);
        return false;
    }

    return true;
}

module.exports = {
    numberInRange: numberInRange,
    numberIsGreaterThan: numberIsGreaterThan
};