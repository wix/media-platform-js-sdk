var MediaPlatform = require('./platform/media-platform');
var Image = require('./image/image');
var UploadFileRequest = require('./platform/management/requests/upload-file-request');
var DownloadUrlRequest = require('./platform/management/requests/download-url-request');
var UploadUrlRequest = require('./platform/management/requests/upload-url-request');
var ListFilesRequest = require('./platform/management/requests/list-files-request');
var SearchJobsRequest = require('./platform/management/requests/search-jobs-request');
var ExtractArchiveRequest = require('./platform/management/requests/extract-archive-request');
var CreateArchiveRequest = require('./platform/management/requests/create-archive-request');
var ImportFileRequest = require('./platform/management/requests/import-file-request');
var TranscodeRequest = require('./platform/management/requests/transcode-request');
var LivestreamRequest = require('./platform/management/requests/livestream-request');
var CreateFlowRequest = require('./platform/management/requests/create-flow-request');
var TranscodeSpecification = require('./platform/management/job/transcode-specification');
var QualityRange = require('./platform/management/job/quality-range');
var Destination = require('./platform/management/job/destination');
var Source = require('./platform/management/job/source');
var Token = require('./platform/authentication/token');
var NS = require('./platform/authentication/NS');
var VERB = require('./platform/authentication/VERB');

module.exports = {
    
    /**
     * @type {MediaPlatform}
     */
    MediaPlatform: MediaPlatform,

    /**
     * @type {Image}
     */
    Image: Image,

    file: {
        /**
         * @type {UploadFileRequest}
         */
        UploadFileRequest: UploadFileRequest,

        /**
         * @type {UploadUrlRequest}
         */
        UploadUrlRequest: UploadUrlRequest,

        /**
         * @type {DownloadUrlRequest}
         */
        DownloadUrlRequest: DownloadUrlRequest,

        /**
         * @type {ListFilesRequest}
         */
        ListFilesRequest: ListFilesRequest,

        /**
         * @type {ImportFileRequest}
         */
        ImportFileRequest: ImportFileRequest,

        /**
         *  @type {Source}
         */
        Source: Source,

        /**
         * @type {Destination}
         */
        Destination: Destination
    },

    archive: {
        /**
         * @type {CreateArchiveRequest}
         */
        CreateArchiveRequest: CreateArchiveRequest,

        /**
         * @type {ExtractArchiveRequest}
         */
        ExtractArchiveRequest: ExtractArchiveRequest
    },

    auth: {
        /**
         * @type {Token}
         */
        Token: Token,

        /**
         * @type {{SERVICE: string, MEMBER: string, APPLICATION: string, FILE: string}}
         */
        NS: NS,

        VERB: VERB
    },

    transcode: {
        /**
         * @type {TranscodeRequest}
         */
        TranscodeRequest: TranscodeRequest,

        /**
         * @type {TranscodeSpecification}
         */
        TranscodeSpecification: TranscodeSpecification,

        /**
         * @type {QualityRange}
         */
        QualityRange: QualityRange
    },

    flow: {
        /**
         * @type {CreateFlowRequest}
         */
        CreateFlowRequest: CreateFlowRequest
    },

    live: {
        /**
         * @type {LivestreamRequest}
         */
        LivestreamRequest: LivestreamRequest
    },

    job: {
        /**
         * @type {SearchJobsRequest}
         */
        SearchJobsRequest: SearchJobsRequest
    },

    /**
     *  @type {Source}
     */
    Source: Source,

    /**
     *  @type {Destination}
     */
    Destination: Destination,

    /**
     * @type {QualityRange}
     */
    QualityRange: QualityRange
};
