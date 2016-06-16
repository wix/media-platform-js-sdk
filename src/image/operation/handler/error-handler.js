/**
 * @param {BaseOperation} operation
 * @param {string} message
 */
function onError(operation, message) {
    console.error(message);
    if (typeof operation.callback  === 'function') {
        operation.callback(new Error(message));
    }
}

module.exports = {
    onError: onError
};