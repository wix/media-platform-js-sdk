import _ from 'underscore';
import {FileDescriptor} from './metadata/file-descriptor';
import {FileMetadata} from './metadata/file-metadata';
import {ListFilesResponse} from './responses/list-files-response';
import {Job} from './job/job';

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @param {FileUploader} fileUploader
 * @constructor
 */

class FileManager {
  constructor(configuration, httpClient, fileUploader) {
    /**
     * @type {Configuration}
     */
    this.configuration = configuration;

    /**
     * @type {HTTPClient}
     */
    this.httpClient = httpClient;

    /**
     * @type {string}
     */
    this.baseUrl = 'https://' + configuration.domain;

    /**
     * @type {string}
     */
    this.apiUrl = this.baseUrl + '/_api/files';

    /**
     * @type {FileUploader}
     */
    this.fileUploader = fileUploader;
  }

  /**
   * @param {UploadUrlRequest?} uploadUrlRequest
   * @param {function(Error, UploadUrlResponse)} callback
   */
  getUploadUrl(uploadUrlRequest, callback) {
    this.fileUploader.getUploadUrl(uploadUrlRequest, callback);
  }

  /**
   * @description upload a file
   * @param {string} path the destination to which the file will be uploaded
   * @param {string|Buffer|Stream} file can be one of: string - path to file, memory buffer, stream
   * @param {UploadFileRequest?} uploadRequest
   * @param {function(Error, Array<FileDescriptor>|null)} callback
   */
  uploadFile(path, file, uploadRequest, callback) {
    return this.fileUploader.uploadFile(path, file, uploadRequest, callback);
  }

  /**
   * @description import a file from a source URL, returns a Job (see job manager)
   * @param {ImportFileRequest} importFileRequest
   * @param {function(Error, Job|null)} callback
   */
  importFile(importFileRequest, callback) {
    this.httpClient.request('POST', this.baseUrl + '/_api/import/file', importFileRequest, null, function (error,
                                                                                                           response) {
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
  createFile(fileDescriptor, callback) {
    this.httpClient.request('POST', this.apiUrl, fileDescriptor, null, function (error, response) {
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
  getFile(path, callback) {
    const params = {
      path: path
    };

    this.httpClient.request('GET', this.apiUrl, params, null, function (error, response) {
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
  getFileMetadataById(fileId, callback) {
    this.httpClient.request('GET', this.apiUrl + '/' + fileId + '/metadata', {}, null, function (error, response) {
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
  listFiles(path, listFilesRequest, callback) {
    const params = {
      path: path
    };
    _.extendOwn(params, listFilesRequest);

    this.httpClient.request('GET', this.apiUrl + '/ls_dir', params, null, function (error, response) {
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
  deleteFileByPath(path, callback) {
    const params = {
      path: path
    };

    this.httpClient.request('DELETE', this.apiUrl, params, null, function (error, response) {
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
  deleteFileById(id, callback) {
    this.httpClient.request('DELETE', this.apiUrl + '/' + id, null, null, function (error, response) {
      if (error) {
        callback(error);
        return;
      }

      callback(null);
    });
  }
}

/**
 * @type {FileManager}
 */
export default FileManager;
export {FileManager};
