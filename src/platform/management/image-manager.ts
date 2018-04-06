import {FileDescriptor} from './metadata/file-descriptor';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
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
   * @param {function(Error, FileDescriptor)} callback
   */
  imageOperation(imageOperationRequest: ImageOperationRequest, callback: (error: Error | null, fileDescriptor: FileDescriptor | null) => void) {
    this.httpClient.request('POST', this.apiUrl + '/operations', imageOperationRequest, undefined, function (error,
                                                                                                        response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new FileDescriptor(response.payload));
    });
  }
}
