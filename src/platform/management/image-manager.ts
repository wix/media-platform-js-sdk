import { RawResponse } from '../../types/response/response';
import { IConfigurationBase } from '../configuration/configuration';
import { IHTTPClient } from '../http/http-client';

import { FileDescriptor, IFileDescriptor } from './metadata/file-descriptor';
import { ImageOperationRequest } from './requests/image-operation-request';
import { IImageWatermarkRequest } from './requests/image-watermark-request';
import {
  IWatermarkManifest,
  WatermarkManifest,
} from './metadata/watermark-manifest';
import { ImageToken } from '../../image/token/image-token';
import { Authenticator } from '../authentication/authenticator';
import { NS } from '../authentication/NS';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

export class ImageManager {
  public baseUrl: string;
  public apiUrl: string;

  constructor(
    public configuration: IConfigurationBase,
    public httpClient: IHTTPClient,
    private readonly authenticator: Authenticator | null = null,
  ) {
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
  imageOperation(
    imageOperationRequest: ImageOperationRequest,
  ): Promise<FileDescriptor> {
    return this.httpClient
      .post<RawResponse<IFileDescriptor>>(
        `${this.apiUrl}/operations`,
        imageOperationRequest,
      )
      .then(
        response => {
          return new FileDescriptor(response.payload);
        },
        error => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @deprecated
   * @param watermarkManifestRequest
   */
  createWatermarkManifest(
    watermarkManifestRequest: IImageWatermarkRequest,
  ): Promise<WatermarkManifest> {
    return this.httpClient
      .post<RawResponse<IWatermarkManifest>>(
        `${this.apiUrl}/watermark`,
        watermarkManifestRequest,
      )
      .then(
        response => {
          return new WatermarkManifest(response.payload);
        },
        error => {
          return Promise.reject(error);
        },
      );
  }

  newImageToken(): ImageToken {
    if (this.authenticator === null) {
      throw new Error('image tokens are not supported in the browser');
    }
    return new ImageToken()
      .setIssuer(NS.APPLICATION, this.authenticator.configuration.appId)
      .setSubject(NS.APPLICATION, this.authenticator.configuration.appId);
  }

  signToken(imageToken: ImageToken) {
    if (this.authenticator === null) {
      throw new Error('image tokens are not supported in the browser');
    }

    return this.authenticator.encode(imageToken);
  }
}
