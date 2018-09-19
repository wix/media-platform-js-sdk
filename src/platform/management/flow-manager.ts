import {RawResponse} from '../../types/response/response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';

import {Flow, IFlow} from './metadata/flow';
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
   * @returns {Promise<Flow>>}
   */
  getFlow(flowId: string): Promise<Flow> {
    return this.httpClient.get<RawResponse<IFlow>>(this.apiUrl + '/flow/' + flowId)
      .then((response) => {
        return new Flow(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * CreateFlow
   * @param {ICreateFlowRequest} createFlowRequest
   * @returns {Promise<Flow>}
   */
  createFlow(createFlowRequest: ICreateFlowRequest): Promise<Flow> {
    return this.httpClient.post<RawResponse<IFlow>>(this.apiUrl + '/flow', createFlowRequest)
      .then((response) => {
        return new Flow(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * Delete flow
   * @param flowId
   * @returns {Promise<void>}
   */
  deleteFlow(flowId: string): Promise<void> {
    return this.httpClient.delete(this.apiUrl + '/flow/' + flowId)
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
