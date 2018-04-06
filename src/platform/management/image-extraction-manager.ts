import {RawResponse} from '../../types/response/response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {IImageExtractionResponse, ImageExtractionResponse} from './responses/image-extraction-response';

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
    this.baseUrl = `https://${configuration.domain}`;
    /**
     * @type {string}
     */
    this.apiUrl = `${this.baseUrl}/_api/images`;
  }

  /**
   * @param {Array<string>} features -- list of supported extractors
   */
  private getListOfSupportedExtractors(features?: string[] | null): string {
    if (features && features.length) {
      return features.join(',');
    }

    return 'colors,labels,explicit_content,faces';
  }

  /**
   * @param {function(null, IImageExtractionResponse)} callback
   */
  private parseResponse(callback?: (error: null, params: IImageExtractionResponse) => void): (response: RawResponse<ImageExtractionResponse>) => ImageExtractionResponse {
    return (response: RawResponse<ImageExtractionResponse>) => {
      const imageExtractionResponse = new ImageExtractionResponse(response.payload);

      if (callback) {
        callback(null, imageExtractionResponse);
      }

      return imageExtractionResponse;
    };
  }

  /**
   * @param {function(Error, null)} callback
   */
  private errorHandler(callback?: (error: Error, params: null) => void): (error) => Error {
    return (error) => {
      if (callback) {
        callback(error, null);
      }

      return error as Error;
    };
  }

  /**
   * @param {string} fileId
   * @param {Array<string>} features -- list of supported extractors
   * @param {function(Error | null, IImageExtractionResponse | null)} callback
   */
  extractImageById(fileId: string, features?: string[] | null, callback?: (error: Error | null, params: IImageExtractionResponse | null) => void): Promise<IImageExtractionResponse | Error> {
    const listOfFeatures = this.getListOfSupportedExtractors(features);

    return this.httpClient
      .get<RawResponse<IImageExtractionResponse>>(`${this.apiUrl}/features?fileId=${fileId}&features=${listOfFeatures}`)
      .then<IImageExtractionResponse, Error>(
        this.parseResponse(callback),
        this.errorHandler(callback)
      );
  }

  /**
   * @param {string} path
   * @param {Array<string>} features -- list of supported extractors
   * @param {function(Error | null, IImageExtractionResponse)} callback
   */
  extractImageByFilePath(path: string, features?: string[] | null, callback?: (error: Error | null, params: IImageExtractionResponse | null) => void): Promise<IImageExtractionResponse | Error> {
    const listOfFeatures = this.getListOfSupportedExtractors(features);

    return this.httpClient
      .get<RawResponse<ImageExtractionResponse>>(`${this.apiUrl}/features?path=${path}&features=${listOfFeatures}`)
      .then<IImageExtractionResponse, Error>(
        this.parseResponse(callback),
        this.errorHandler(callback)
      );
  }
}
