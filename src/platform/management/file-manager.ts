import {FileDescriptor} from './metadata/file-descriptor';
import {FileMetadata} from './metadata/file-metadata';
import {ListFilesResponse} from './responses/list-files-response';
import {Job} from './job/job';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {FileUploader, GetUploadURLCallback, IFileUploader, UploadFileCallback} from './file-uploader';
import {UploadUrlResponse} from './responses/upload-url-response';
import {UploadUrlRequest} from './requests/upload-url-request';
import * as Stream from 'stream';
import {UploadFileRequest} from './requests/upload-file-request';
import {ImportFileRequest} from './requests/import-file-request';
import {ListFilesRequest} from './requests/list-files-request';
import {UploadJob} from '../../public/platform/uploader/upload-job';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @param {FileUploader} fileUploader
 * @constructor
 */

export class FileManager {
  public baseUrl: string;
  public apiUrl: string;
  public queueFileUpload: (uploadJob: UploadJob) => void;

  constructor(public configuration: IConfigurationBase, public httpClient: IHTTPClient, public fileUploader: IFileUploader) {
    /**
     * @type {string}
     */
    this.baseUrl = 'https://' + configuration.domain;
    /**
     * @type {string}
     */
    this.apiUrl = this.baseUrl + '/_api/files';
  }

  /**
   * @param {UploadUrlRequest?} uploadUrlRequest
   * @param {function(Error, UploadUrlResponse)} callback
   */
  getUploadUrl(uploadUrlRequest: UploadUrlRequest | undefined | null, callback: GetUploadURLCallback) {
    this.fileUploader.getUploadUrl(uploadUrlRequest || null, callback);
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadRequest
   * @param {function(Error, Array<FileDescriptor>|null)} callback
   */
  uploadFile(path: string, file: string | Buffer | Stream, uploadRequest: UploadFileRequest | null | undefined, callback: UploadFileCallback) {
    return this.fileUploader.uploadFile(path, file, uploadRequest, callback);
  }

  /**
   * @description import a file from a source URL, returns a Job (see job manager)
   * @param {ImportFileRequest} importFileRequest
   * @param {function(Error, Job|null)} callback
   */
  importFile(importFileRequest: ImportFileRequest, callback: (error: Error | null, job: Job | null) => void) {
    this.httpClient.request(
      'POST',
      this.baseUrl + '/_api/import/file',
      importFileRequest,
      undefined,
      function (error, response) {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, new Job(response.payload));
      });
  }

  /**
   * @description creates a file descriptor, use this to create an empty directory
   * @param {FileDescriptor} fileDescriptor
   * @param {function(Error, FileDescriptor)} callback
   */
  createFile(fileDescriptor: FileDescriptor, callback: (error: Error | null, fileDescriptor: FileDescriptor | null) => void) {
    this.httpClient.request('POST', this.apiUrl, fileDescriptor, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new FileDescriptor(response.payload));
    });
  }

  /**
   * @param {string} path
   * @param {function(Error, FileDescriptor)} callback
   */
  getFile(path: string, callback: (error: Error | null, fileDescriptor: FileDescriptor | null) => void) {
    const params = {
      path: path
    };

    this.httpClient.request('GET', this.apiUrl, params, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new FileDescriptor(response.payload));
    });
  }

  /**
   * @param {string} fileId
   * @param {function(Error, FileMetadata)} callback
   */
  getFileMetadataById(fileId: string, callback: (error: Error | null, fileMetadata: FileMetadata | null) => void) {
    this.httpClient.request('GET', this.apiUrl + '/' + fileId + '/metadata', {}, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new FileMetadata(response.payload));
    });
  }

  /**
   * @param {string} path
   * @param {ListFilesRequest?} listFilesRequest
   * @param {function(Error, ListFilesResponse)} callback
   */
  listFiles(path: string, listFilesRequest: ListFilesRequest | null, callback: (error: Error | null, listFilesResponse: ListFilesResponse | null) => void) {
    const params = {
      path: path,
      ...listFilesRequest
    };

    this.httpClient.request('GET', this.apiUrl + '/ls_dir', params, undefined, function (error, response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new ListFilesResponse(response.payload));
    });
  }

  /**
   * @param {string} path
   * @param {function(Error)} callback
   */
  deleteFileByPath(path: string, callback: (error: Error | null) => void) {
    const params = {
      path: path
    };

    this.httpClient.request('DELETE', this.apiUrl, params, undefined, function (error, response) {
      if (error) {
        callback(error);
        return;
      }

      callback(null);
    });
  }

  /**
   * @param {string} id
   * @param {function(Error)} callback
   */
  deleteFileById(id: string, callback: (error: Error | null) => void) {
    this.httpClient.request('DELETE', this.apiUrl + '/' + id, null, undefined, function (error, response) {
      if (error) {
        callback(error);
        return;
      }

      callback(null);
    });
  }
}
