import {Flow} from './metadata/flow';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {ICreateFlowRequest} from './requests/create-flow-request';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

export class FlowManager {
  public baseUrl: string;
  public apiUrl: string;

  constructor(public configuration: IConfigurationBase, public httpClient: IHTTPClient) {
    this.baseUrl = 'https://' + configuration.domain;
    this.apiUrl = this.baseUrl + '/_api/flow_control';
  }

  /**
   * @param {string} flowId
   * @param {function(Error, Flow)} callback
   */
  getFlow(flowId: string, callback: (error: Error | null, flow: Flow | null) => void) {
    this.httpClient.request('GET', this.apiUrl + '/flow/' + flowId, {}, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new Flow(response.payload));
    });
  }

  createFlow(createFlowRequest: ICreateFlowRequest, callback: (error: Error | null, flow: Flow | null) => void) {
    this.httpClient.request('POST', this.apiUrl + '/flow', createFlowRequest, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new Flow(response.payload));
    });
  }

  deleteFlow(flowId, callback: (error: Error | null, response: any) => void) {
    this.httpClient.request('DELETE', this.apiUrl + '/flow/' + flowId, {}, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, response);
    });
  }
}
