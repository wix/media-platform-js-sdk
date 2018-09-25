import * as fs from 'fs';
import * as Stream from 'stream';

import {RawResponse} from '../../types/response/response';
import {Configuration, IConfigurationBase} from '../configuration/configuration';
import {HTTPClient, IHTTPClient} from '../http/http-client';

import {FileDescriptor, IFileDescriptor} from './metadata/file-descriptor';
import {UploadFileRequest} from './requests/upload-file-request';
import {IUploadUrlRequest, UploadUrlRequest} from './requests/upload-url-request';
import {IUploadUrlResponse, UploadUrlResponse} from './responses/upload-url-response';


export type UploadFileStream = Stream | {
  value: Buffer;
  options: {
    filename: 'filename';
  };
};

export interface IFileUploader {
  configuration: IConfigurationBase;
  httpClient: IHTTPClient;

  getUploadUrl(uploadUrlRequest?: IUploadUrlRequest): Promise<UploadUrlResponse>;

  uploadFile(path: string, file: string | Buffer | Stream | File, uploadRequest?: UploadFileRequest);
}

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */
export class FileUploader implements IFileUploader {
  public apiUrl: string;

  constructor(public configuration: Configuration, public httpClient: HTTPClient) {
    this.apiUrl = 'https://' + configuration.domain + '/_api/upload';
  }

  /**
   * @description retrieve a signed URL to which the file is uploaded
   * @param uploadUrlRequest
   */
  getUploadUrl(uploadUrlRequest?: IUploadUrlRequest): Promise<UploadUrlResponse> {
    return this.httpClient
      .get<RawResponse<IUploadUrlResponse>>(this.apiUrl + '/url', uploadUrlRequest)
      .then((response) => {
        return new UploadUrlResponse(response.payload);
      }, (error) => {
        return Promise.reject(error);
      });
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadRequest
   */
  uploadFile(path: string, file: string | Buffer | Stream, uploadRequest: UploadFileRequest): Promise<FileDescriptor[]> {
    let calledBack = false;
    let stream: UploadFileStream;
    let size: number | null = null;
    let streamErrorPromise = new Promise(() => {
    }); // never resolving;

    if (file instanceof Stream && typeof file.pipe === 'function') {
      stream = file;
      streamErrorPromise = new Promise((resolve, reject) => {
        (stream as Stream).once('error', (error) => {
          reject(error);
        });
      });

    } else if (typeof file === 'string') {
      try {
        size = fs.statSync(file).size;
      } catch (error) {
        return Promise.reject(error);
      }
      stream = fs.createReadStream(file);
      streamErrorPromise = new Promise((resolve, reject) => {
        (stream as Stream).once('error', (error) => {
          reject(error);
        });
      });
    } else if (file instanceof Buffer) {
      // noinspection JSUnresolvedVariable
      size = file.byteLength;
      stream = {
        value: file,
        options: {
          filename: 'filename'
        }
      };
    } else {
      const error = new Error('unsupported source type: ' + typeof file);
      return Promise.reject(error);
    }

    let uploadUrlRequest: UploadUrlRequest | undefined = undefined;

    if (uploadRequest) {
      uploadUrlRequest = new UploadUrlRequest({
        acl: uploadRequest.acl,
        mimeType: uploadRequest.mimeType,
        path: path,
        size: size
      });
    }

    return Promise.race([this.getUploadUrl(uploadUrlRequest), streamErrorPromise])
      .then((response: UploadUrlResponse) => {

          let form: { file: UploadFileStream, path: string, uploadToken: string | null } & Partial<UploadFileRequest> = {
            file: stream,
            path: path,
            uploadToken: response.uploadToken
          };

          if (uploadRequest) {
            form = {...form, ...uploadRequest};
          }

          return this.httpClient.postForm<RawResponse<IFileDescriptor[]>>(response.uploadUrl, form);
        }, error => {
          return Promise.reject(error);
        }
      )
      .then(response => {
        return response.payload.map(function (file) {
          return new FileDescriptor(file);
        });
      });
  }
}
