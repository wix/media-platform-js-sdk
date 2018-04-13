import {Flow, IFlow} from './metadata/flow';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {ICreateFlowRequest} from './requests/create-flow-request';
import {RawResponse} from '../../types/response/response';
import {deprecatedFn} from '../../utils/deprecated/deprecated';

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
   * @param {function(Error, Flow)} callback DEPRECATED! use promise response instead
   */
  getFlow(flowId: string, callback?: (error: Error | null, flow: Flow | null) => void): Promise<Flow> {
    if (callback) {
      callback = deprecatedFn('FlowManager.getFlow use promise response instead')(callback);
    }
    return this.httpClient.get<RawResponse<IFlow>>(this.apiUrl + '/flow/' + flowId)
      .then((response) => {
        const flow = new Flow(response.payload);
        if (callback) {
          callback(null, flow);
        }
        return flow;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * CreateFlow
   * @param {ICreateFlowRequest} createFlowRequest
   * @param {(error: (Error | null), flow: (Flow | null)) => void} callback DEPRECATED! use promise response instead
   */
  createFlow(createFlowRequest: ICreateFlowRequest, callback?: (error: Error | null, flow: Flow | null) => void): Promise<Flow> {
    if (callback) {
      callback = deprecatedFn('FlowManager.createFlow use promise response instead')(callback);
    }
    return this.httpClient.post<RawResponse<IFlow>>(this.apiUrl + '/flow', createFlowRequest)
      .then((response) => {
        const flow = new Flow(response.payload);
        if (callback) {
          callback(null, flow);
        }
        return flow;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * Delete flow
   * @param flowId
   * @param {(error: (Error | null), response: any) => void} callback DEPRECATED! use promise response instead
   */
  deleteFlow(flowId, callback?: (error: Error | null, response: any) => void): Promise<void> {
    if (callback) {
      callback = deprecatedFn('FlowManager.deleteFlow use promise response instead')(callback);
    }
    return this.httpClient.delete(this.apiUrl + '/flow/' + flowId)
      .then((response) => {
        if (callback) {
          callback(null, response);
        }
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }
}
