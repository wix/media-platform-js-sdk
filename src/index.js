import {Configuration} from './public/platform/configuration/configuration';
import {MediaPlatform} from './public/platform/media-platform';
import {UploadJob} from './public/platform/uploader/upload-job';
import {Image} from './image/image';
import {UploadUrlRequest} from './platform/management/requests/upload-url-request';
import {UploadFileRequest} from './platform/management/requests/upload-file-request';
import {ListFilesRequest} from './platform/management/requests/list-files-request';
import {ImportFileRequest} from './platform/management/requests/import-file-request';
import {SearchJobsRequest} from './platform/management/requests/search-jobs-request';
import {TranscodeSpecification} from './platform/management/job/transcode-specification';
import {Source} from './platform/management/job/source';
import {Destination} from './platform/management/job/destination';
import {TranscodeRequest} from './platform/management/requests/transcode-request';
import {ExtractArchiveRequest} from './platform/management/requests/extract-archive-request';
import {CreateArchiveRequest} from './platform/management/requests/create-archive-request';
import {CreateFlowRequest} from './platform/management/requests/create-flow-request';
import {LivestreamRequest} from './platform/management/requests/livestream-request';
import {Flow} from './platform/management/metadata/flow';
import {Invocation} from './platform/management/metadata/invocation';
import {FlowComponent} from './platform/management/metadata/flow-component';
import {LiveStream} from './platform/management/metadata/live-stream';
import {QualityRange} from './platform/management/job/quality-range';
import {ImageOperationSpecification} from './platform/management/job/image-operation-specification';
import {ImageOperationRequest} from './platform/management/requests/image-operation-request';

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
  LiveStream: LiveStream
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
  FlowComponent: FlowComponent
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

export default MP;
export {MP};
