import {TranscodeJobResponse} from './responses/transcode-job-response';
import {IConfigurationBase} from '../configuration/configuration';
import {IHTTPClient} from '../http/http-client';
import {ExtractPosterJobResponse} from "./responses/extract-poster-job-response";
import {ExtractStoryboardJobResponse} from "./responses/extract-storyboard-job-response";

/**
 * @param {Configuration} configuration
 * @param {HTTPClient} httpClient
 * @constructor
 */

export class TranscodeManager {
    public baseUrl: string;
    public apiUrl: string;

    constructor(public configuration: IConfigurationBase, public httpClient: IHTTPClient) {
        /**
         * @type {string}
         */
        this.baseUrl = 'https://' + configuration.domain;

        /**
         * @type {string}
         */
        this.apiUrl = this.baseUrl + '/_api/av';
    }

    transcodeVideo(transcodeRequest, callback) {
        const params = {...transcodeRequest};

        this.httpClient.request('POST', this.apiUrl + '/transcode', params, null, function (error, response) {
            if (error) {
                callback(error, null);
                return;
            }

            callback(null, new TranscodeJobResponse(response.payload));
        });
    }


    extractPoster = function (extractPosterRequest, callback) {
        const params = {...extractPosterRequest};

        this.httpClient.request('POST', this.apiUrl + '/poster', params, null, function (error, response) {

            if (error) {
                callback(error, null);
                return;
            }

            callback(null, new ExtractPosterJobResponse(response.payload));
        });
    };

    extractStoryboard = function (extractStoryboardRequest, callback) {
        const params = {...extractStoryboardRequest};

        this.httpClient.request('POST', this.apiUrl + '/storyboard', params, null, function (error, response) {

            if (error) {
                callback(error, null);
                return;
            }

            callback(null, new ExtractStoryboardJobResponse(response.payload));
        });
    };


}
