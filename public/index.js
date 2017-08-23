var Configuration = require('./platform/configuration/configuration');
var MediaPlatform = require('./platform/media-platform');
var UploadJob = require('./platform/uploader/upload-job');
var Image = require('../src/image/image');
var UploadUrlRequest = require('../src/platform/management/requests/upload-url-request');
var UploadFileRequest = require('../src/platform/management/requests/upload-file-request');
var ListFilesRequest = require('../src/platform/management/requests/list-files-request');
var SearchJobsRequest = require('../src/platform/management/requests/search-jobs-request');
var TranscodeSpecification = require('../src/platform/management/job/transcode-specification');
var Source = require('../src/platform/management/job/source');
var Destination = require('../src/platform/management/job/destination');
var TranscodeRequest = require('../src/platform/management/requests/transcode-request');
var ExtractArchiveRequest = require('../src/platform/management/requests/extract-archive-request');
var CreateArchiveRequest = require('../src/platform/management/requests/create-archive-request');
var QualityRange = require('../src/platform/management/job/quality-range');

var MP = {};

/**
 * @type {Configuration}
 */
MP.Configuration = Configuration;

/**
 * @type {MediaPlatform}
 */
MP.MediaPlatform = MediaPlatform;

/**
 * @type {Image}
 */
MP.Image = Image;

MP.upload = {
    /**
     * @type {UploadJob}
     */
    UploadJob: UploadJob
};

MP.file = {
    /**
     * @type {UploadUrlRequest}
     */
    UploadUrlRequest: UploadUrlRequest,

    /**
     * @type {UploadFileRequest}
     */
    UploadFileRequest: UploadFileRequest,

    /**
     * @type {ListFilesRequest}
     */
    ListFilesRequest: ListFilesRequest,

    /**
     * @type {Source}
     */
    Source: Source,

    /**
     * @type {Destination}
     */
    Destination: Destination
};

MP.job = {
    /**
     * @type {SearchJobsRequest}
     */
    SearchJobsRequest: SearchJobsRequest
};

MP.archive = {
    /**
     * @type {CreateArchiveRequest}
     */
    CreateArchiveRequest: CreateArchiveRequest,

    /**
     * @type {ExtractArchiveRequest}
     */
    ExtractArchiveRequest: ExtractArchiveRequest
};

MP.transcode = {
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
};

/**
 * @type {Source}
 */
MP.Source = Source;

/**
 * @type {Destination}
 */
MP.Destination = Destination;

/**
 * @type {QualityRange}
 */
MP.QualityRange = QualityRange;

module.exports = MP;