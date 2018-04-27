import {FileImportSpecification} from './job/file-import-specification';
import {FileDescriptor, IFileDescriptor} from './metadata/file-descriptor';
import {FileMetadata, IFileMetadata} from './metadata/file-metadata';
import {IListFilesResponse, ListFilesResponse} from './responses/list-files-response';
import {IJob, Job} from './job/job';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {FileUploader, GetUploadURLCallback, IFileUploader, UploadFileCallback} from './file-uploader';
import {UploadUrlResponse} from './responses/upload-url-response';
import {IUploadUrlRequest} from './requests/upload-url-request';
import * as Stream from 'stream';
import {UploadFileRequest} from './requests/upload-file-request';
import {ImportFileRequest} from './requests/import-file-request';
import {IListFilesRequest} from './requests/list-files-request';
import {UploadJob} from '../../public/platform/uploader/upload-job';
import {deprecatedFn} from '../../utils/deprecated/deprecated';
import {RawResponse} from '../../types/response/response';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @param {FileUploader} fileUploader
 * @doc FileManager
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
   * Get Upload URL
   * @param uploadUrlRequest
   * @param callback DEPRECATED! use promise response instead
   * @example
   * fileManager.getUploadUrl({
   *   mimeType: 'Content-Type: image/gif',
   *   path: '/path/to',
   *   size: 12345, // in bytes
   *   acl: 'public'
   * })
   * .then(response => {
   *   console.log(response.uploadToken, response.uploadUrl);
   * });
   */
  getUploadUrl(uploadUrlRequest?: IUploadUrlRequest | undefined | null, callback?: GetUploadURLCallback): Promise<UploadUrlResponse> {
    if (callback) {
      callback = deprecatedFn('FileManager.getUploadUrl: use promise response instead')(callback);
    }
    return this.fileUploader.getUploadUrl(uploadUrlRequest || null, callback);
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadRequest
   * @param {function(Error, Array<FileDescriptor>|null)} callback DEPRECATED! use promise response instead
   */
  uploadFile(path: string, file: string | Buffer | Stream, uploadRequest: UploadFileRequest | null | undefined, callback?: UploadFileCallback): Promise<FileDescriptor[]> | UploadJob {
    if (callback) {
      callback = deprecatedFn('FileManager.uploadFile: use promise response instead')(callback);
    }
    const uploadFileResult = this.fileUploader.uploadFile(path, file, uploadRequest);
    // TODO: do it in a right way
    // Browser file uploader return `UploadJob` instead of promise
    if (!uploadFileResult.then) {
      return uploadFileResult;
    }
    return uploadFileResult
      .then(response => {
        if (callback) {
          callback(null, response);
        }
        return response;
      }, error => {
        if (callback) {
          callback(error, null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * @description import a file from a source URL, returns a Job (see job manager)
   * @param {ImportFileRequest} importFileRequest
   * @param {function(Error, Job|null)} callback DEPRECATED! use promise response instead
   */
  importFile(importFileRequest: ImportFileRequest, callback?: (error: Error | null, job: Job<FileImportSpecification> | null) => void): Promise<Job<FileImportSpecification>> {
    if (callback) {
      callback = deprecatedFn('FileManager.importFile: use promise response instead')(callback);
    }
    return this.httpClient
      .post<RawResponse<IJob<FileImportSpecification>>>(this.baseUrl + '/_api/import/file', importFileRequest)
      .then((response) => {
        const job = new Job(response.payload);

        if (callback) {
          callback(null, job);
        }

        return job;
      }, error => {
        if (callback) {
          callback(error, null);
        }

        return Promise.reject(error);
      });
  }

  /**
   * @description creates a file descriptor, use this to create an empty directory
   * @param {FileDescriptor} fileDescriptor
   * @param {function(Error, FileDescriptor)} callback DEPRECATED! use promise response instead
   */
  createFile(fileDescriptor: FileDescriptor, callback?: (error: Error | null, fileDescriptor: FileDescriptor | null) => void): Promise<FileDescriptor> {
    if (callback) {
      callback = deprecatedFn('FileManager.createFile: use promise response instead')(callback);
    }
    return this.httpClient.post<RawResponse<IFileDescriptor>>(this.apiUrl, fileDescriptor)
      .then((response) => {
        const fileDescriptor = new FileDescriptor(response.payload);

        if (callback) {
          callback(null, fileDescriptor);
        }

        return fileDescriptor;
      }, error => {
        if (callback) {
          callback(error, null);
        }

        return Promise.reject(error);
      });
  }

  /**
   * @param {string} path
   * @param {function(Error, FileDescriptor)} callback DEPRECATED! use promise response instead
   */
  getFile(path: string, callback?: (error: Error | null, fileDescriptor: FileDescriptor | null) => void): Promise<FileDescriptor> {
    const params = {
      path
    };

    if (callback) {
      callback = deprecatedFn('FileManager.getFile: use promise response instead')(callback);
    }

    return this.httpClient.get<RawResponse<FileDescriptor>>(this.apiUrl, params)
      .then((response) => {
        const fileDescriptor = new FileDescriptor(response.payload);

        if (callback) {
          callback(null, fileDescriptor);
        }

        return fileDescriptor;
      }, error => {
        if (callback) {
          callback(error, null);
        }

        return Promise.reject(error);
      });
  }

  /**
   * @param {string} fileId
   * @param {function(Error, FileMetadata)} callback DEPRECATED! use promise response instead
   */
  getFileMetadataById(fileId: string, callback?: (error: Error | null, fileMetadata: FileMetadata | null) => void): Promise<FileMetadata> {
    if (callback) {
      callback = deprecatedFn('FileManager.getFileMetadataById: use promise response instead')(callback);
    }
    return this.httpClient.get<RawResponse<IFileMetadata>>(`${this.apiUrl}/${fileId}/metadata`)
      .then((response) => {
        const fileMetadata = new FileMetadata(response.payload);

        if (callback) {
          callback(null, fileMetadata);
        }

        return fileMetadata;
      }, error => {
        if (callback) {
          callback(error, null);
        }

        return Promise.reject(error);
      });
  }

  /**
   * @param {string} path
   * @param {IListFilesRequest?} listFilesRequest
   * @param {function(Error, ListFilesResponse)} callback DEPRECATED! use promise response instead
   */
  listFiles(path: string, listFilesRequest: IListFilesRequest | null, callback?: (error: Error | null, listFilesResponse: ListFilesResponse | null) => void): Promise<ListFilesResponse> {
    const params = {
      path,
      ...listFilesRequest
    };

    if (callback) {
      callback = deprecatedFn('FileManager.listFiles: use promise response instead')(callback);
    }

    return this.httpClient.get<RawResponse<IListFilesResponse>>(`${this.apiUrl}/ls_dir`, params)
      .then((response) => {
        const listFilesResponse = new ListFilesResponse(response.payload);

        if (callback) {
          callback(null, listFilesResponse);
        }

        return listFilesResponse;
      }, error => {
        if (callback) {
          callback(error, null);
        }

        return Promise.reject(error);
      });
  }

  /**
   * @param {string} path
   * @param {function(Error)} callback DEPRECATED! use promise response instead
   */
  deleteFileByPath(path: string, callback?: (error: Error | null) => void): Promise<void> {
    const params = {
      path
    };

    if (callback) {
      callback = deprecatedFn('FileManager.deleteFileByPath: use promise response instead')(callback);
    }

    return this.httpClient.delete(this.apiUrl, params)
      .then(() => {
        if (callback) {
          callback(null);
        }
      }, error => {
        if (callback) {
          callback(error);
        }

        return Promise.reject(error);
      });
  }

  /**
   * @param {string} id
   * @param {function(Error)} callback DEPRECATED! use promise response instead
   */
  deleteFileById(id: string, callback?: (error: Error | null) => void): Promise<void> {
    if (callback) {
      callback = deprecatedFn('FileManager.deleteFileById: use promise response instead')(callback);
    }

    return this.httpClient.delete(`${this.apiUrl}/${id}`)
      .then(() => {
        if (callback) {
          callback(null);
        }
      }, error => {
        if (callback) {
          callback(error);
        }

        return Promise.reject(error);
      });
  }
}
