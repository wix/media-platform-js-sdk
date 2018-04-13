import {FileDescriptor, IFileDescriptor} from './metadata/file-descriptor';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {ImageOperationRequest} from './requests/image-operation-request';
import {RawResponse} from '../../types/response/response';

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
   * @param {function(Error, FileDescriptor)} callback DEPRECATED! use promise response instead
   */
  imageOperation(imageOperationRequest: ImageOperationRequest, callback?: (error: Error | null, fileDescriptor: FileDescriptor | null) => void): Promise<FileDescriptor> {
    return this.httpClient.post<RawResponse<IFileDescriptor>>(this.apiUrl + '/operations', imageOperationRequest)
      .then((response) => {
        const fileDescriptor = new FileDescriptor(response.payload);
        if (callback) {
          callback(null, fileDescriptor);
        }
        return fileDescriptor
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }
}
