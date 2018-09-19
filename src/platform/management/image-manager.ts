import {RawResponse} from '../../types/response/response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';

import {FileDescriptor, IFileDescriptor} from './metadata/file-descriptor';
import {ImageOperationRequest} from './requests/image-operation-request';


/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

export class ImageManager {
  public baseUrl: string;
  public apiUrl: string;

  constructor(public configuration: IConfigurationBase, public httpClient: IHTTPClient) {
    /**
     * @type {string}
     */
    this.baseUrl = 'https://' + configuration.domain;

    /**
     * @type {string}
     */
    this.apiUrl = this.baseUrl + '/_api/images';
  }

  /**
   * @param {ImageOperationRequest} imageOperationRequest
   */
  imageOperation(imageOperationRequest: ImageOperationRequest): Promise<FileDescriptor> {
    return this.httpClient.post<RawResponse<IFileDescriptor>>(this.apiUrl + '/operations', imageOperationRequest)
      .then((response) => {
        return new FileDescriptor(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }
}
