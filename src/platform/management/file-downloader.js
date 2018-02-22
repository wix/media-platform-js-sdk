import _ from 'underscore';
import {Token} from '../authentication/token';
import {NS} from '../authentication/NS';
import {VERB} from '../authentication/VERB';

/**
 * @param {Configuration} configuration
 * @param {Authenticator} authenticator
 * @constructor
 */
function FileDownloader(configuration, authenticator) {

  /**
   * @type {Configuration}
   */
  this.configuration = configuration;

  /**
   * @type {Authenticator}
   */
  this.authenticator = authenticator;
}

/**
 * @param {string} path
 * @param {DownloadUrlRequest?} downloadUrlRequest
 * @returns {{downloadUrl: string}}
 */
FileDownloader.prototype.getDownloadUrl = function (path, downloadUrlRequest) {

  var payload = {
    path: path
  };

  if (downloadUrlRequest) {
    _.extendOwn(payload, downloadUrlRequest);
  }

  var token = new Token()
    .setSubject(NS.APPLICATION, this.configuration.appId)
    .setIssuer(NS.APPLICATION, this.configuration.appId)
    .setVerbs([VERB.FILE_DOWNLOAD])
    .setAdditionalClaims({
      payload: payload
    });

  if (downloadUrlRequest && downloadUrlRequest.ttl) {
    token.setExpiration(Math.round(new Date().getTime() / 1000) + downloadUrlRequest.ttl);
  }

  var signedToken = this.authenticator.encode(token);

  return {
    downloadUrl: 'https://' + this.configuration.domain + '/_api/download/file?downloadToken=' + signedToken
  };
};

/**
 * @type {FileDownloader}
 */
export default FileDownloader;
export {FileDownloader};
