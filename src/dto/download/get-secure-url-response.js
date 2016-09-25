/**
 * @param {{}?}data
 * @constructor
 */
function GetSecureURLResponse(data) {

    /**
     * @type {string}
     */
    this.referenceId = null;

    /**
     * @type {string}
     */
    this.encoding = null;

    /**
     * @type {string}
     */
    this.path = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param {{}} data
 * @returns {GetSecureURLResponse}
 */
GetSecureURLResponse.prototype.deserialize = function (data) {
    this.referenceId = data.reference_id;
    this.encoding = data.encoding;
    this.path = data.url_path;

    return this;
};

/**
 * @type {GetSecureURLResponse}
 */
module.exports = GetSecureURLResponse;