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

export class FilesSearch {
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
    this.apiUrl = `${this.baseUrl}/_api/files/search`;
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
   * @param {string} query
   * @param {function(Error | null, any)} callback
   */
  searchFiles(query: string, callback?: (error: Error | null, params: any | null) => void): Promise<any | Error> {

    return this.httpClient
      .get<RawResponse<ImageExtractionResponse>>(`${this.apiUrl}?query=${query}`)
      .then<IImageExtractionResponse, Error>(
        this.parseResponse(callback),
        this.errorHandler(callback)
      );
  }
}
