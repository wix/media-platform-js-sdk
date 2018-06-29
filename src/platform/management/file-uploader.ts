import fs from 'fs';
import {IUploadUrlRequest, UploadUrlRequest} from './requests/upload-url-request';
import {IUploadUrlResponse, UploadUrlResponse} from './responses/upload-url-response';
import {FileDescriptor, IFileDescriptor} from './metadata/file-descriptor';
import {Configuration, IConfigurationBase} from '../configuration/configuration';
import {HTTPClient, IHTTPClient} from '../http/http-client';
import Stream from 'stream';
import {UploadFileRequest} from './requests/upload-file-request';
import {deprecatedFn} from '../../utils/deprecated/deprecated';
import {RawResponse} from '../../types/response/response';

export type GetUploadURLCallback = (error: Error | null, response: UploadUrlResponse | null) => void;
export type UploadFileCallback = (error: Error | null, response: FileDescriptor[] | null) => void;

export type UploadFileStream = Stream | {
  value: Buffer;
  options: {
    filename: 'filename';
  };
};

export interface IFileUploader {
  configuration: IConfigurationBase;
  httpClient: IHTTPClient;

  getUploadUrl(uploadUrlRequest: IUploadUrlRequest | null | undefined, callback?: GetUploadURLCallback): Promise<UploadUrlResponse>;

  uploadFile(path: string, file: string | Buffer | Stream | File, uploadRequest: UploadFileRequest | null | undefined, callback?: UploadFileCallback);
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
   * @param callback DEPRECATED! use promise response instead
   */
  getUploadUrl(uploadUrlRequest?: IUploadUrlRequest | null | undefined, callback?: GetUploadURLCallback): Promise<UploadUrlResponse> {
    if (callback) {
      callback = deprecatedFn('use promise response instead')(callback);
    }
    return this.httpClient
      .get<RawResponse<IUploadUrlResponse>>(this.apiUrl + '/url', uploadUrlRequest || undefined)
      .then((response) => {
        const uploadUrlResponse = new UploadUrlResponse(response.payload);
        if (callback) {
          callback(null, uploadUrlResponse);
        }
        return uploadUrlResponse;
      }, (error) => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadRequest
   * @param {function(Error, FileDescriptor[]|null)} callback DEPRECATED! use promise response instead
   */
  uploadFile(path: string, file: string | Buffer | Stream, uploadRequest: UploadFileRequest, callback?: UploadFileCallback): Promise<FileDescriptor[]> {
    let calledBack = false;
    let stream: UploadFileStream;
    let size: number | null = null;
    if (callback) {
      callback = deprecatedFn('FileUploader.uploadFile use promise response instead')(callback);
    }
    let streamErrorPromise = new Promise(() => {}); // never resolving;

    if (file instanceof Stream && typeof file.pipe === 'function') {
      stream = file;
      streamErrorPromise = new Promise((resolve, reject) => {
        (stream as Stream).once('error', (error) => {
          doCallback(error, null);
          reject(error);
        });
      });

    } else if (typeof file === 'string') {
      try {
        size = fs.statSync(file).size;
      } catch (error) {
        doCallback(error, null);
        return Promise.reject(error);
      }
      stream = fs.createReadStream(file);
      streamErrorPromise = new Promise((resolve, reject) => {
        (stream as Stream).once('error', (error) => {
          doCallback(error, null);
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
      doCallback(error, null);
      return Promise.reject(error);
    }

    let uploadUrlRequest: UploadUrlRequest | null = null;
    if (uploadRequest) {
      uploadUrlRequest = new UploadUrlRequest()
        .setMimeType(uploadRequest.mimeType)
        .setPath(path)
        .setAcl(uploadRequest.acl);
      if (size !== null) {
        uploadUrlRequest.setSize(size);
      }
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
          doCallback(error, null);
          return Promise.reject(error);
        }
      )
      .then(response => {
        doCallback(null, response);
        return response.payload.map(function (file) {
          return new FileDescriptor(file);
        });
      });

    function doCallback(error, response) {
      if (calledBack) {
        return;
      }
      let fileDescriptors = null;
      if (response) {
        fileDescriptors = response.payload.map(function (file) {
          return new FileDescriptor(file);
        });
      }
      if (callback) {
        callback(error, fileDescriptors);
      }
      calledBack = true;
    }
  }
}
