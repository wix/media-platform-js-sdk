import { RawResponse } from '../../types/response/response';
import { logDeprecated } from '../../utils/deprecated/deprecated';
import { IConfigurationBase } from '../configuration/configuration';
import { IHTTPClient } from '../http/http-client';

import {
  ImageExtraction,
  ImageExtractionResponse,
} from './responses/image-extraction-response';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

export class ImageExtractionManager {
  public baseUrl: string;
  public apiUrl: string;

  constructor(
    public configuration: IConfigurationBase,
    public httpClient: IHTTPClient,
  ) {
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
  private getListOfSupportedExtractors(features?: string[]): string {
    if (features && features.length) {
      return features.join(',');
    }

    return 'colors,labels,explicit_content,faces';
  }

  /**
   * @returns {(response: RawResponse<ImageExtraction>) => ImageExtraction}
   */
  private parseResponse(): (
    response: RawResponse<ImageExtractionResponse>,
  ) => ImageExtraction {
    return (response: RawResponse<ImageExtractionResponse>) => {
      return new ImageExtraction(response.payload);
    };
  }

  /**
   * @returns {(error) => Error}
   */
  private errorHandler(): (error) => Error {
    return (error) => error as Error;
  }

  /**
   * @param {string} fileId
   * @param {Array<string>} features -- list of supported extractors
   * @returns {Promise<ImageExtractionResponse | Error>}
   */
  extractImageById(
    fileId: string,
    features?: string[],
  ): Promise<ImageExtraction | Error> {
    const listOfFeatures = this.getListOfSupportedExtractors(features);
    if (features === null) {
      logDeprecated('passing features as null in extractImageById');
    }

    return this.httpClient
      .get<RawResponse<ImageExtractionResponse>>(
        `${this.apiUrl}/features?fileId=${fileId}&features=${listOfFeatures}`,
      )
      .then<ImageExtraction, Error>(this.parseResponse(), this.errorHandler());
  }

  /**
   * @param {string} path
   * @param {Array<string>} features -- list of supported extractors
   * @returns {Promise<ImageExtractionResponse | Error>}
   */
  extractImageByFilePath(
    path: string,
    features?: string[],
  ): Promise<ImageExtraction | Error> {
    const listOfFeatures = this.getListOfSupportedExtractors(features);

    return this.httpClient
      .get<RawResponse<ImageExtractionResponse>>(
        `${this.apiUrl}/features?path=${path}&features=${listOfFeatures}`,
      )
      .then<ImageExtraction, Error>(this.parseResponse(), this.errorHandler());
  }
}
