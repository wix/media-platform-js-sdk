/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */
function FileDownloader(configuration, httpClient) {
    /**
     * @type {Configuration}
     */
    this.configuration = configuration;

    /**
     * @type {HTTPClient}
     */
    this.httpClient = httpClient;
}

/**
 * @param {string} path
 * @param {DownloadUrlRequest?} downloadUrlRequest
 * @param {function(Error|null, Object)} callback
 */
FileDownloader.prototype.getDownloadUrl = function (path, downloadUrlRequest, callback) {

    var params = {
        path: path
    };

    // todo: seems redundant... already handled in the the HttpClient
    if (downloadUrlRequest) {
        for (var key in downloadUrlRequest) {
            if (downloadUrlRequest.hasOwnProperty(key)) {
                if (typeof downloadUrlRequest[key] === 'function' || downloadUrlRequest[key] === null) {
                    continue;
                }

                params[key] = downloadUrlRequest[key];
            }
        }
    }

    this.httpClient.request('GET', 'https://' + this.configuration.domain + '/_api/download/secure_url', params, null,
        function (error, body) {

            if (error) {
                callback(error, null);
                return;
            }

            callback(null, body.payload);
        })
};

/**
 * @type {FileDownloader}
 */
export default FileDownloader;
export {FileDownloader};
