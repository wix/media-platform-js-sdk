import { RawResponse } from '../../types/response/response';
import { IConfigurationBase } from '../configuration/configuration';
import { IHTTPClient } from '../http/http-client';

import { FileDescriptor, IFileDescriptor } from './metadata/file-descriptor';
import {
  IIndexImageJobResponse,
  IndexImageJobResponse,
} from './responses/index-image-job-response';
import { IndexImageRequest } from './requests/index-image-request';
import { FindSimilarImagesRequest } from './requests/find-similar-images-request';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

export class VisualSearchManager {
  public baseUrl: string;
  public apiUrl: string;

  constructor(
    public configuration: IConfigurationBase,
    public httpClient: IHTTPClient,
  ) {
    /**
     * @type {string}
     */
    this.baseUrl = 'https://' + configuration.domain;

    /**
     * @type {string}
     */
    this.apiUrl = this.baseUrl + '/_api/visual_search';
  }

  /**
   * Index image
   * @param {string} collectionId
   * @param {IndexImageRequest} indexImageRequest
   * @returns {Promise<IndexImageJobResponse>}
   */
  indexImage(collectionId: string, indexImageRequest: IndexImageRequest): Promise<IndexImageJobResponse> {
    return this.httpClient
      .post<RawResponse<IIndexImageJobResponse>>(
        this.apiUrl + `/collections/${collectionId}/index`,
        indexImageRequest,
      )
      .then(
        (response) => {
          return new IndexImageJobResponse(response.payload);
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * Find similar images
   * @param {string} collectionId
   * @param {FindSimilarImagesRequest} findSimilarImagesRequest
   * @returns {Promise<FileDescriptor[]>}
   */
  findSimilarImages(collectionId: string, findSimilarImagesRequest: FindSimilarImagesRequest): Promise<FileDescriptor[]> {
    return this.httpClient
      .post<RawResponse<IFileDescriptor[]>>(
        this.apiUrl + `/collections/${collectionId}/search`,
        findSimilarImagesRequest,
      )
      .then(
        (response) => {
          return response.payload.map(descriptor => new FileDescriptor(descriptor));
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }
}
