import {MediaPlatform} from './platform/media-platform';
import {Image} from './image/image';
import {UploadFileRequest} from './platform/management/requests/upload-file-request';
import {DownloadUrlRequest} from './platform/management/requests/download-url-request';
import {UploadUrlRequest} from './platform/management/requests/upload-url-request';
import {ListFilesRequest} from './platform/management/requests/list-files-request';
import {SearchJobsRequest} from './platform/management/requests/search-jobs-request';
import {ExtractPosterRequest} from './platform/management/requests/extract-poster-request';
import {ExtractStoryboardRequest} from './platform/management/requests/extract-storyboard-request';
import {ExtractArchiveRequest} from './platform/management/requests/extract-archive-request';
import {CreateArchiveRequest} from './platform/management/requests/create-archive-request';
import {ImportFileRequest} from './platform/management/requests/import-file-request';
import {TranscodeRequest} from './platform/management/requests/transcode-request';
import {LivestreamRequest} from './platform/management/requests/livestream-request';
import {CreateFlowRequest} from './platform/management/requests/create-flow-request';
import {ImageOperationSpecification} from './platform/management/job/image-operation-specification';
import {ImageOperationRequest} from './platform/management/requests/image-operation-request';
import {TranscodeSpecification} from './platform/management/job/transcode-specification';
import {QualityRange} from './platform/management/job/quality-range';
import {Destination} from './platform/management/job/destination';
import {Source} from './platform/management/job/source';
import {Token} from './platform/authentication/token';
import {NS} from './platform/authentication/NS';
import {VERB} from './platform/authentication/VERB';
import {ExtractStoryboardSpecification} from './platform/management/job/extract-storyboard-specification';
import {ExtractPosterSpecification} from './platform/management/job/extract-poster-specification';
import {LiveStreamListRequest} from "./platform/management/requests/live-stream-list-request";

export {
  /**
   * @type {MediaPlatform}
   */
    MediaPlatform,
  /**
   * @type {Image}
   */
    Image,
  /**
   *  @type {Source}
   */
    Source,
  /**
   *  @type {Destination}
   */
    Destination,
  /**
   * @type {QualityRange}
   */
    QualityRange
};

export const image = {
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

export const file = {
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
};

export const archive = {
  /**
   * @type {CreateArchiveRequest}
   */
  CreateArchiveRequest: CreateArchiveRequest,

  /**
   * @type {ExtractArchiveRequest}
   */
  ExtractArchiveRequest: ExtractArchiveRequest
};

export const auth = {
  /**
   * @type {Token}
   */
  Token: Token,

  /**
   * @type {{SERVICE: string, MEMBER: string, APPLICATION: string, FILE: string}}
   */
  NS: NS,

  VERB: VERB
};

export const transcode = {
  /**
   * @type {TranscodeRequest}
   */
  TranscodeRequest,

  /**
   * @type {TranscodeSpecification}
   */
  TranscodeSpecification,

  /**
   * @type {ExtractPosterRequest}
   */
  ExtractPosterRequest,

  /**
   * @type {ExtractPosterRequest}
   */
  ExtractStoryboardRequest,
  ExtractPosterSpecification,
  ExtractStoryboardSpecification,
  /**
   * @type {QualityRange}
   */
  QualityRange
};

export const flow = {
  /**
   * @type {CreateFlowRequest}
   */
  CreateFlowRequest: CreateFlowRequest
};

export const live = {
  /**
   * @type {LivestreamRequest}
   */
  LivestreamRequest: LivestreamRequest,
  /**
   * @type {LiveStreamListRequest}
   */
  LiveStreamListRequest: LiveStreamListRequest
};

export const job = {
  /**
   * @type {SearchJobsRequest}
   */
  SearchJobsRequest: SearchJobsRequest
};
