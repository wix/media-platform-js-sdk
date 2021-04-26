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
import { CreateVisualSearchModelResponse } from './responses/create-visual-search-model-response';
import { CreateVisualSearchCollectionResponse } from './responses/create-visual-search-collection-response';

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
   * Create visual search model
   * @param {string} id
   * @param {string} name
   * @param {string} description
   * @returns {Promise<FileDescriptor[]>}
   */
  createModel(id: string, name: string, description: string): Promise<CreateVisualSearchModelResponse> {
    return this.httpClient
      .post<RawResponse<CreateVisualSearchModelResponse>>(
        this.apiUrl + `/models`,
        { id, name, description },
      )
      .then(
        (response) => {
          return response.payload;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * Create visual search collection
   * @param {string} id
   * @param {string} name
   * @param {string} projectId
   * @param {string} modelId
   * @returns {Promise<FileDescriptor[]>}
   */
  createCollection(id: string, name: string, projectId: string, modelId: string): Promise<CreateVisualSearchCollectionResponse> {
    return this.httpClient
      .post<RawResponse<CreateVisualSearchCollectionResponse>>(
        this.apiUrl + `/collections`,
        { id, name, projectId, modelId },
      )
      .then(
        (response) => {
          return response.payload;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
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
