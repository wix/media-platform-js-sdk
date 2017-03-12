/**
 * @param {string} name
 * @param {number} value
 * @param {number} lowerBound
 * @param {number} upperBound
 * @returns {string|null}
 */
function numberNotInRange(name, value, lowerBound, upperBound) {
    if ((typeof value === "number" && isNaN(value))
        || value > upperBound
        || value < lowerBound) {
        return name + ': ' + value + ' is not a number between ' + lowerBound +  ' to ' + upperBound;
    }
    
    return null;
}

/**
 * @param {string} name
 * @param {number} value
 * @param {number} lowerBound
 * @returns {string|null}
 */
function numberIsNotGreaterThan(name, value, lowerBound) {
    if ((typeof value === "number" && isNaN(value)) || value < lowerBound) {
        return name + ': ' + value + ' is not a number greater than ' + lowerBound;
    }

    return null;
}

module.exports = {
    numberNotInRange: numberNotInRange,
    numberIsNotGreaterThan: numberIsNotGreaterThan
};