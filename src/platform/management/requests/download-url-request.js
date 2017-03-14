/**
 * @constructor
 */
function DownloadUrlRequest() {

    /**
     * @description the token time to live in seconds
     * @type {number}
     */
    this.ttl = 600;

    /**
     * @description Content-Disposition header, if provided the content disposition is set to attachment with the provided file name
     * @type {{filename: <string>}}
     */
    this.attachment = null;

    /**
     * @description if the token expired, will redirect to this provided url
     * @type {string | null}
     */
    this.onExpireRedirectTo = null;
}

/**
 * @param {number} ttl
 * @returns {DownloadUrlRequest}
 */
DownloadUrlRequest.prototype.setTTL = function (ttl) {
    this.ttl = ttl;
    return this;
};

/**
 * @param {string?} filename
 * @returns {DownloadUrlRequest}
 */
DownloadUrlRequest.prototype.setAttachment = function (filename) {
    this.attachment = {};
    if (filename) {
        this.attachment.filename = filename;
    }

    return this;
};

/**
 * @param {string} onExpireRedirectTo
 * @returns {DownloadUrlRequest}
 */
DownloadUrlRequest.prototype.setOnExpireRedirectTo = function (onExpireRedirectTo) {
    this.onExpireRedirectTo = onExpireRedirectTo;
    return this;
};

/**
 * @type {DownloadUrlRequest}
 */
module.exports = DownloadUrlRequest;