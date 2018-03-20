var Configuration = require('./platform/configuration/configuration');
var MediaPlatform = require('./platform/media-platform');
var UploadJob = require('./platform/uploader/upload-job');
var Image = require('../src/image/image');
var UploadUrlRequest = require('../src/platform/management/requests/upload-url-request');
var UploadFileRequest = require('../src/platform/management/requests/upload-file-request');
var ListFilesRequest = require('../src/platform/management/requests/list-files-request');
var ImportFileRequest = require('../src/platform/management/requests/import-file-request');
var SearchJobsRequest = require('../src/platform/management/requests/search-jobs-request');
var TranscodeSpecification = require('../src/platform/management/job/transcode-specification');
var ExtractPosterSpecification = require('../src/platform/management/job/extract-poster-specification');
var ExtractStoryboardSpecification = require('../src/platform/management/job/extract-storyboard-specification');
var Source = require('../src/platform/management/job/source');
var Destination = require('../src/platform/management/job/destination');
var TranscodeRequest = require('../src/platform/management/requests/transcode-request');
var ExtractPosterRequest = require('../src/platform/management/requests/extract-poster-request');
var ExtractStoryboardRequest = require('../src/platform/management/requests/extract-storyboard-request');
var ExtractArchiveRequest = require('../src/platform/management/requests/extract-archive-request');
var CreateArchiveRequest = require('../src/platform/management/requests/create-archive-request');
var CreateFlowRequest = require('../src/platform/management/requests/create-flow-request');
var LivestreamRequest = require('../src/platform/management/requests/livestream-request');
var Flow = require('../src/platform/management/metadata/flow');
var Invocation = require('../src/platform/management/metadata/invocation');
var FlowComponent = require('../src/platform/management/metadata/flow-component');
var LiveStream = require('../src/platform/management/metadata/live-stream');
var QualityRange = require('../src/platform/management/job/quality-range');
var ImageOperationSpecification = require('../src/platform/management/job/image-operation-specification');
var ImageOperationRequest = require('../src/platform/management/requests/image-operation-request');

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

MP.image = {
    /**
     * @type {Image}
     */
    Image: Image,

    /**
     * @type {ImageOperationSpecification}
     */
    ImageOperationSpecification: ImageOperationSpecification,

    /**
     * @type {ImageOperationRequest}
     */
    ImageOperationRequest: ImageOperationRequest
};

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
     * @type {ImportFileRequest}
     */
    ImportFileRequest: ImportFileRequest,

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

MP.live = {
    /**
     * @type {LivestreamRequest}
     */
    LivestreamRequest: LivestreamRequest,

    /**
     * @type {LiveStream}
     */
    LiveStream: LiveStream,
};

MP.flow = {
    /**
     * @type {CreateFlowRequest}
     */
    CreateFlowRequest: CreateFlowRequest,

    /**
     * @type {Flow}
     */
    Flow: Flow,

    Invocation: Invocation,
    FlowComponent: FlowComponent,

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
     * @type {ExtractPosterRequest}
     */
    ExtractPosterRequest: ExtractPosterRequest,

    /**
     * @type {ExtractPosterSpecification}
     */
    ExtractPosterSpecification: ExtractPosterSpecification,

    /**
     * @type {ExtractStoryboardRequest}
     */
    ExtractStoryboardRequest: ExtractStoryboardRequest,

    /**
     * @type {ExtractStoryboardSpecification}
     */
    ExtractStoryboardSpecification: ExtractStoryboardSpecification,

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