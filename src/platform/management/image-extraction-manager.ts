import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {UploadJob} from '../../public/platform/uploader/upload-job';
import { IImageExtractionResponse, ImageExtractionResponse } from './responses/image-extraction-response';

export interface RawResponse<T> {
  code: number;
  message: string;
  payload: T;
}

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @param {FileUploader} fileUploader
 * @constructor
 */

export class ImageExtractionManager {
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
   * @param {string} fileId
   * @param {string} features -- comma separated list of supported extractors
   * @param {function(Error, IImageExtractionResponse)} callback
   */
  extractImageById(fileId: string, features?: string | null, callback?: (error: Error | null, params: IImageExtractionResponse) => void): Promise<IImageExtractionResponse> {
    features = features || 'colors,labels,explicit_content,faces';

    return this.httpClient
      .get(`${this.apiUrl}/features?fileId=${fileId}&features=${features}`)
      .then((response: RawResponse<ImageExtractionResponse>) => {
        const imageExtractionResponse = new ImageExtractionResponse(response.payload);

        if (callback) {
          callback(null, imageExtractionResponse);
        }

        return imageExtractionResponse;
      });
  }

  /**
   * @param {string} path
   * @param {string} features -- comma separated list of supported extractors
   * @param {function(Error | null, IImageExtractionResponse)} callback
   */
  extractImageByFilePath(path: string, features?: string | null, callback?: (error: Error | null, params: IImageExtractionResponse) => void): Promise<IImageExtractionResponse> {
    features = features || 'colors,labels,explicit_content,faces';

    return this.httpClient
      .get(`${this.apiUrl}/features?path=${path}&features=${features}`)
      .then((response: RawResponse<ImageExtractionResponse>) => {
        const imageExtractionResponse = new ImageExtractionResponse(response.payload);

        if (callback) {
          callback(null, imageExtractionResponse);
        }

        return imageExtractionResponse;
      });
  }
}
