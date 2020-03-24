import { RawResponse } from '../../types/response/response';
import { IConfigurationBase } from '../configuration/configuration';
import { IHTTPClient } from '../http/http-client';

import { FileMetadata, IFileMetadata } from './metadata/file-metadata';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @doc AudioManager
 */
export class AudioManager {
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
    this.apiUrl = this.baseUrl + '/_api/audio';
  }

  /**
   * @param {string} path
   * @returns {Promise<FileMetadata>}
   */
  extractMetadata(path: string): Promise<FileMetadata> {
    const params = {
      path,
    };

    return this.httpClient
      .get<RawResponse<IFileMetadata>>(`${this.apiUrl}/metadata`, params)
      .then(
        (response) => {
          return new FileMetadata(response.payload);
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }
}
