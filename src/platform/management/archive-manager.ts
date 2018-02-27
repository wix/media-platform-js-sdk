import {Job} from './job/job';
import {Configuration} from '../configuration/configuration';
import {Configuration as BrowserConfiguration} from '../../public/platform/configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {CreateArchiveRequest} from './requests/create-archive-request';
import {ExtractArchiveRequest} from './requests/extract-archive-request';

export type ArchiveCallback = (error: Error | null, job: Job | null) => void;

export class ArchiveManager {
  public baseUrl: string;

  constructor(public configuration: Configuration | BrowserConfiguration, public httpClient: IHTTPClient) {
    this.baseUrl = 'https://' + configuration.domain;
  }

  /**
   * @param {CreateArchiveRequest?} createArchiveRequest
   * @param {function(Error, Job)} callback
   */
  createArchive(createArchiveRequest: CreateArchiveRequest | null | undefined, callback: ArchiveCallback) {
    this.httpClient.request(
      'POST',
      this.baseUrl + '/_api/archive/create',
      createArchiveRequest,
      null,
      function (error, response) {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, new Job(response.payload));
      });
  }

  /**
   * @param {ExtractArchiveRequest?} extractArchiveRequest
   * @param {function(Error, Job)} callback
   */
  extractArchive(extractArchiveRequest: ExtractArchiveRequest, callback: ArchiveCallback) {
    this.httpClient.request('POST', this.baseUrl + '/_api/archive/extract', extractArchiveRequest, null, function (error,
                                                                                                                   response) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new Job(response.payload));
    });
  }
}
