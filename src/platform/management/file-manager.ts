import * as Stream from 'stream';
import * as Observable from 'zen-observable';

import {UploadJob} from '../../public/platform/uploader/upload-job';
import {ACL} from '../../types/media-platform/media-platform';
import {RawResponse} from '../../types/response/response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';

import {FileUploader, IFileUploader} from './file-uploader';
import {FileImportSpecification} from './job/file-import-specification';
import {IJob, Job} from './job/job';
import {observeJobCreator} from './job/job-observable';
import {FileDescriptor, IFileDescriptor} from './metadata/file-descriptor';
import {FileMetadata, IFileMetadata} from './metadata/file-metadata';
import {ImportFileRequest} from './requests/import-file-request';
import {IListFilesRequest} from './requests/list-files-request';
import {UploadFileRequest} from './requests/upload-file-request';
import {IUploadUrlRequest} from './requests/upload-url-request';
import {IListFilesResponse, ListFilesResponse} from './responses/list-files-response';
import {UploadUrlResponse} from './responses/upload-url-response';


export interface IUpdateFileACLById {
  acl: ACL;
  id: string;
}

export interface IUpdateFileACLByPath {
  acl: ACL;
  path: string;
}

export type UpdateFileACL = IUpdateFileACLById | IUpdateFileACLByPath;

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
   * @param {IUploadUrlRequest} uploadUrlRequest
   * @returns {Promise<UploadUrlResponse>}
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
  getUploadUrl(uploadUrlRequest?: IUploadUrlRequest): Promise<UploadUrlResponse> {
    return this.fileUploader.getUploadUrl(uploadUrlRequest);
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadRequest
   */
  uploadFile(path: string, file: string | Buffer | Stream, uploadRequest?: UploadFileRequest): Promise<FileDescriptor[]> | UploadJob {
    const uploadFileResult = this.fileUploader.uploadFile(path, file, uploadRequest);
    // TODO: do it in a right way
    // Browser file uploader return `UploadJob` instead of promise
    if (!uploadFileResult.then) {
      return uploadFileResult;
    }

    return uploadFileResult
      .then(response => {
        return response;
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * import a file from a source URL, returns a Job Observable
   * @param importFileRequest
   * @returns {Observable<Job<FileImportSpecification>>}
   */
  importFileObservable(importFileRequest: ImportFileRequest): Observable<Job<FileImportSpecification>> {
    return observeJobCreator<FileImportSpecification>(this.configuration, this.httpClient)(
      () => this.importFile(importFileRequest)
    );
  }

  /**
   * @description import a file from a source URL, returns a Job (see job manager)
   * @param {ImportFileRequest} importFileRequest
   * @returns {Promise<Job<FileImportSpecification>>}
   */
  importFile(importFileRequest: ImportFileRequest): Promise<Job<FileImportSpecification>> {
    return this.httpClient
      .post<RawResponse<IJob<FileImportSpecification>>>(`${this.baseUrl}/_api/import/file`, importFileRequest)
      .then((response) => {
        return new Job<FileImportSpecification>(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * @description creates a file descriptor, use this to create an empty directory
   * @param {FileDescriptor} fileDescriptor
   * @returns {Promise<FileDescriptor>}
   */
  createFile(fileDescriptor: FileDescriptor): Promise<FileDescriptor> {
    return this.httpClient.post<RawResponse<IFileDescriptor>>(this.apiUrl, fileDescriptor)
      .then((response) => {
        return new FileDescriptor(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * @param {string} path
   */
  getFile(path: string): Promise<FileDescriptor> {
    const params = {
      path
    };

    return this.httpClient.get<RawResponse<FileDescriptor>>(this.apiUrl, params)
      .then((response) => {
        return new FileDescriptor(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * @param {string} fileId
   * @returns {Promise<FileMetadata>}
   */
  getFileMetadataById(fileId: string): Promise<FileMetadata> {
    return this.httpClient.get<RawResponse<IFileMetadata>>(`${this.apiUrl}/${fileId}/metadata`)
      .then((response) => {
        return new FileMetadata(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * @param {string} path
   * @param {IListFilesRequest?} listFilesRequest
   */
  listFiles(path: string, listFilesRequest?: IListFilesRequest): Promise<ListFilesResponse> {
    const params = {
      path,
      ...listFilesRequest
    };

    return this.httpClient.get<RawResponse<IListFilesResponse>>(`${this.apiUrl}/ls_dir`, params)
      .then((response) => {
        return new ListFilesResponse(response.payload);
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * @param {string} path
   */
  deleteFileByPath(path: string): Promise<void> {
    const params = {
      path
    };

    return this.httpClient.delete(this.apiUrl, params)
      .then(
        () => {
        },
        error => {
          return Promise.reject(error);
        });
  }

  /**
   * @param {string} id
   */
  deleteFileById(id: string): Promise<void> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
      .then(() => {
      }, error => {
        return Promise.reject(error);
      });
  }

  /**
   * @param {UpdateFileACL} params
   * @returns {Promise}
   */
  updateFileACL(params: UpdateFileACL): Promise<FileDescriptor> {
    return this.httpClient.put<RawResponse<FileDescriptor>>(this.apiUrl, params)
      .then(
        response => {
          return new FileDescriptor(response.payload);
        }
      );
  }
}
