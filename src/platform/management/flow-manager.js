import {Flow} from './metadata/flow';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

class FlowManager {
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
    this.apiUrl = this.baseUrl + '/_api/flow_control';
  }

  /**
   * @param {string} flowId
   * @param {function(Error, Flow)} callback
   */
  getFlow(flowId, callback) {
    this.httpClient.request('GET', this.apiUrl + '/flow/' + flowId, {}, null, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new Flow(response.payload));
    });
  }

  createFlow(createFlowRequest, callback) {
    this.httpClient.request('POST', this.apiUrl + '/flow', createFlowRequest, null, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new Flow(response.payload));
    });
  }

  deleteFlow(flowId, callback) {
    this.httpClient.request('DELETE', this.apiUrl + '/flow/' + flowId, {}, null, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, response);
    });
  }
}

/**
 * @type {FlowManager}
 */
export default FlowManager;
export {FlowManager};
