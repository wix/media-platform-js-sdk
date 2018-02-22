import {LiveStream} from './metadata/live-stream';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

class LiveManager {
  constructor(configuration, httpClient) {


    /**
     * @type {Configuration}
     */
    this.configuration = configuration;

    /**
     * @type {HTTPClient}
     */
    this.httpClient = httpClient;

    /**
     * @type {string}
     */
    this.baseUrl = 'https://' + configuration.domain;

    /**
     * @type {string}
     */
    this.apiUrl = this.baseUrl + '/_api/live';
  }


  openStream(liveStreamRequest, callback) {

    this.httpClient.request('POST', this.apiUrl + '/stream', liveStreamRequest, null, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new LiveStream(response.payload));
    });
  }


  getStream(streamId, callback) {

    this.httpClient.request('GET', this.apiUrl + '/stream/' + streamId, null, null, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new LiveStream(response.payload));
    });
  }


  closeStream(streamId, callback) {

    this.httpClient.request('DELETE', this.apiUrl + '/stream/' + streamId, null, null, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, response);
    });
  }


  listStreams(callback) {

    this.httpClient.request('GET', this.apiUrl + '/list_streams', null, null, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      var streams = [];
      for (var i in response.payload) {
        streams.push(new LiveStream(response.payload[i]));
      }

      callback(null, streams);
    });
  }

}


/**
 * @type {LiveManager}
 */
export default LiveManager;
export {LiveManager};
