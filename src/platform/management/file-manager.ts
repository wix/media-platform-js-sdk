import * as Stream from 'stream';
import * as Observable from 'zen-observable';

import { UploadJob } from '../../public/platform/uploader/upload-job';
import {
  ACL,
  DescriptorMimeType,
  FileType,
} from '../../types/media-platform/media-platform';
import { RawResponse } from '../../types/response/response';
import { IConfigurationBase } from '../configuration/configuration';
import { IHTTPClient } from '../http/http-client';

import { FileUploader, IFileUploader } from './file-uploader';
import { FileImportSpecification } from './job/file-import-specification';
import { IJob, Job } from './job/job';
import { observeJobCreator } from './job/job-observable';
import { FileDescriptor, IFileDescriptor, ILifecycle } from './metadata/file-descriptor';
import { FileMetadata, IFileMetadata } from './metadata/file-metadata';
import { ImportFileRequest } from './requests/import-file-request';
import { IListFilesRequest } from './requests/list-files-request';
import { UploadFileRequest } from './requests/upload-file-request';
import { IListFilesResponse, ListFilesResponse, } from './responses/list-files-response';
import { UploadConfigurationResponse } from './responses/upload-configuration-response';
import { IUploadConfigurationRequest } from './requests/upload-configuration-request';

export interface IUpdateFileACLById {
  acl: ACL;
  id: string;
}

export interface IUpdateFileACLByPath {
  acl: ACL;
  path: string;
}

export interface FolderDescriptor {
  acl?: ACL;
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
  public queueFileUpload:
    | ((uploadJob: UploadJob) => void)
    | undefined = undefined;

  constructor(
    public configuration: IConfigurationBase,
    public httpClient: IHTTPClient,
    public fileUploader: IFileUploader,
  ) {
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
   * Get Upload Configuration
   * @param {IUploadConfigurationRequest} uploadConfigurationRequest
   * @returns {Promise<UploadConfigurationResponse>}
   * @example
   * fileManager.getUploadConfiguration({
   *   mimeType: 'image/gif',
   *   path: '/path/to',
   *   size: 12345, // in bytes
   *   acl: 'public'
   * }).
   * then(response => {
   *   console.log(response.uploadToken, response.uploadUrl)
   * });
   */
  getUploadConfiguration(
    uploadConfigurationRequest?: IUploadConfigurationRequest,
  ): Promise<UploadConfigurationResponse> {
    return this.fileUploader.getUploadConfiguration(uploadConfigurationRequest);
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadFileRequest
   * @param {string?} uploadUrl
   */
  uploadFile(
    path: string,
    file: string | Buffer | Stream | File,
    uploadFileRequest?: UploadFileRequest,
    uploadUrl?: string,
  ): Promise<FileDescriptor[]> | UploadJob {
    const uploadFileResult = this.fileUploader.uploadFile(
      path,
      file,
      uploadFileRequest,
      uploadUrl,
    );

    // TODO: do it in a right way
    // Browser file uploader return `UploadJob` instead of promise
    if (!uploadFileResult.then) {
      return uploadFileResult;
    }

    return uploadFileResult.then(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  /**
   * import a file from a source URL, returns a Job Observable
   * @param importFileRequest
   * @returns {Observable<Job<FileImportSpecification>>}
   */
  importFileObservable(
    importFileRequest: ImportFileRequest,
  ): Observable<Job<FileImportSpecification>> {
    return observeJobCreator<FileImportSpecification>(
      this.configuration,
      this.httpClient,
    )(() => this.importFile(importFileRequest));
  }

  /**
   * @description import a file from a source URL, returns a Job (see job manager)
   * @param {ImportFileRequest} importFileRequest
   * @returns {Promise<Job<FileImportSpecification>>}
   */
  importFile(
    importFileRequest: ImportFileRequest,
  ): Promise<Job<FileImportSpecification>> {
    return this.httpClient
      .post<RawResponse<IJob<FileImportSpecification>>>(
        `${this.baseUrl}/_api/import/file`,
        importFileRequest,
      )
      .then(
        (response) => {
          return new Job<FileImportSpecification>(response.payload);
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @description creates a file descriptor
   * @param {FileDescriptor} fileDescriptor
   * @returns {Promise<FileDescriptor>}
   */
  createFile(fileDescriptor: FileDescriptor): Promise<FileDescriptor> {
    return this.httpClient
      .post<RawResponse<IFileDescriptor>>(this.apiUrl, fileDescriptor)
      .then(
        (response) => {
          return new FileDescriptor(response.payload);
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @description creates a folder descriptor, use this to create an empty directory
   * @param {FolderDescriptor} folderDescriptor
   * @returns {Promise<FileDescriptor>}
   */
  createFolder({ acl, path }: FolderDescriptor): Promise<FileDescriptor> {
    return this.httpClient
      .post<RawResponse<IFileDescriptor>>(this.apiUrl, {
        acl,
        mimeType: DescriptorMimeType.Folder,
        path,
        size: 0,
        type: FileType.FOLDER,
      })
      .then(
        (response) => {
          return new FileDescriptor(response.payload);
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @param {string} path
   */
  getFile(path: string): Promise<FileDescriptor> {
    const params = {
      path,
    };

    return this.httpClient
      .get<RawResponse<FileDescriptor>>(this.apiUrl, params)
      .then(
        (response) => {
          return new FileDescriptor(response.payload);
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @param {string} fileId
   * @returns {Promise<FileMetadata>}
   */
  getFileMetadataById(fileId: string): Promise<FileMetadata> {
    return this.httpClient
      .get<RawResponse<IFileMetadata>>(`${this.apiUrl}/${fileId}/metadata`)
      .then(
        (response) => {
          return new FileMetadata(response.payload);
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @param {string} path
   * @param {IListFilesRequest?} listFilesRequest
   */
  listFiles(
    path: string,
    listFilesRequest?: IListFilesRequest,
  ): Promise<ListFilesResponse> {
    const params = {
      path,
      ...listFilesRequest,
    };

    return this.httpClient
      .get<RawResponse<IListFilesResponse>>(`${this.apiUrl}/ls_dir`, params)
      .then(
        (response) => {
          return new ListFilesResponse(response.payload);
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

  /**
   * @param {string} path
   */
  deleteFileByPath(path: string): Promise<void> {
    const params = {
      path,
    };

    return this.httpClient.delete(this.apiUrl, params).catch((error) => {
      return Promise.reject(error);
    });
  }

  /**
   * @param {string} id
   */
  deleteFileById(id: string): Promise<void> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`).catch((error) => {
      return Promise.reject(error);
    });
  }

  /**
   * @param {UpdateFileACL} params
   * @returns {Promise<FileDescriptor>}
   */
  updateFileACL(params: UpdateFileACL): Promise<FileDescriptor> {
    return this.httpClient
      .put<RawResponse<FileDescriptor>>(this.apiUrl, params)
      .then((response) => {
        return new FileDescriptor(response.payload);
      });
  }

  /**
   * @param {FileDescriptor} file
   * @param {ILifecycle} lifecycle
   * @returns {Promise<FileDescriptor>}
   */
  addFileLifecycle(file: FileDescriptor, lifecycle: ILifecycle): Promise<FileDescriptor> {
    return this.httpClient
      .post<RawResponse<FileDescriptor>>(`${this.apiUrl}/lifecycle`, {
        id: file.id,
        path: file.path,
        lifecycle,
      })
      .then((response) => new FileDescriptor(response.payload));
  }

  /**
   * @param {string} fileId
   * @param {string} lifecycleId
   * @returns {Promise<FileDescriptor>}
   */
  deleteFileLifecycle(fileId: string, lifecycleId: string): Promise<FileDescriptor> {
    return this.httpClient
      .delete<RawResponse<FileDescriptor>>(`${this.apiUrl}/${fileId}/lifecycle/${lifecycleId}`)
      .then((response) => new FileDescriptor(response.payload));
  }
}
