import * as fs from 'fs';
import {UploadUrlRequest} from './requests/upload-url-request';
import {UploadUrlResponse} from './responses/upload-url-response';
import {FileDescriptor} from './metadata/file-descriptor';
import {Configuration, IConfigurationBase} from '../configuration/configuration';
import {HTTPClient, IHTTPClient} from '../http/http-client';
import * as Stream from 'stream';
import {UploadFileRequest} from './requests/upload-file-request';

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

  getUploadUrl(uploadUrlRequest: UploadUrlRequest | null | undefined, callback: GetUploadURLCallback);

  uploadFile(path: string, file: string | Buffer | Stream | File, uploadRequest: UploadFileRequest | null | undefined, callback: UploadFileCallback)
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
   * @param {UploadUrlRequest?} uploadUrlRequest
   * @param {function(Error, UploadUrlResponse)} callback
   */
  getUploadUrl(uploadUrlRequest: UploadUrlRequest | null | undefined, callback: GetUploadURLCallback) {
    this.httpClient.request('GET', this.apiUrl + '/url', uploadUrlRequest, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new UploadUrlResponse(response.payload));
    });
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadRequest
   * @param {function(Error, Array<FileDescriptor>|null)} callback
   */
  uploadFile(path: string, file: string | Buffer | Stream, uploadRequest: UploadFileRequest, callback: UploadFileCallback) {
    let calledBack = false;
    let stream: UploadFileStream;
    let size: number | null = null;

    if (file instanceof Stream && typeof file.pipe === 'function') {
      stream = file;
      stream.once('error', doCallback);
    } else if (typeof file === 'string') {
      try {
        size = fs.statSync(file).size;
      } catch (error) {
        doCallback(error, null);
      }
      stream = fs.createReadStream(file);
      stream.once('error', doCallback);
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
      doCallback(new Error('unsupported source type: ' + typeof file), null);
      return;
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

    this.getUploadUrl(
      uploadUrlRequest,
      (error, response) => {
        if (error || response === null) {
          doCallback(error, null);
          return;
        }

        let form: { file: UploadFileStream, path: string, uploadToken: string | null } & Partial<UploadFileRequest> = {
          file: stream,
          path: path,
          uploadToken: response.uploadToken
        };
        if (uploadRequest) {
          form = {...form, ...uploadRequest};
        }

        this.httpClient.postForm(response.uploadUrl, form, undefined, doCallback);
      }
    );

    function doCallback(error, response) {
      if (!calledBack) {
        let fileDescriptors = null;
        if (response) {
          fileDescriptors = response.payload.map(function (file) {
            return new FileDescriptor(file);
          });
        }
        callback(error, fileDescriptors);
        calledBack = true;
      }
    }
  }
}
