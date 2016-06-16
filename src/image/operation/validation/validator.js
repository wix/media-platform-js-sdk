/**
 * @param name
 * @param value
 * @param lowerBound
 * @param upperBound
 * @returns {boolean}
 */
function numberInRange(name, value, lowerBound, upperBound) {
    if (value > upperBound || value < lowerBound) {
        console.error(name + ': ' + value + ' is not a number between ' + lowerBound +  ' to ' + upperBound);
        return false;
    }
    
    return true;
}

/**
 * @param name
 * @param value
 * @param lowerBound
 * @returns {boolean}
 */
function numberIsGreaterThan(name, value, lowerBound) {
    if (value < lowerBound) {
        console.error(name + ': ' + value + ' is not a number greater than ' + lowerBound);
        return false;
    }

    return true;
}

module.exports = {
    numberInRange: numberInRange,
    numberIsGreaterThan: numberIsGreaterThan
};