import {Destination} from '../../platform/management/job/destination';
import {MediaPlatform} from '../../public/platform/media-platform';
import {Source} from '../../platform/management/job/source';
import {Configuration as PublicConfiguration} from '../../public/platform/configuration/configuration';
import {Image} from '../../image/image';
import {ImageOperationRequest} from '../../platform/management/requests/image-operation-request';
import {ImageOperationSpecification} from '../../platform/management/job/image-operation-specification';
import {UploadJob} from '../../public/platform/uploader/upload-job';
import {UploadUrlRequest} from '../../platform/management/requests/upload-url-request';
import {ListFilesRequest} from '../../platform/management/requests/list-files-request';
import {UploadFileRequest} from '../../platform/management/requests/upload-file-request';
import {ImportFileRequest} from '../../platform/management/requests/import-file-request';
import {SearchJobsRequest} from '../../platform/management/requests/search-jobs-request';
import {LiveStream} from '../../platform/management/metadata/live-stream';
import {LivestreamRequest} from '../../platform/management/requests/livestream-request';
import {CreateFlowRequest} from '../../platform/management/requests/create-flow-request';
import {FlowComponent} from '../../platform/management/metadata/flow-component';
import {Invocation} from '../../platform/management/metadata/invocation';
import {Flow} from '../../platform/management/metadata/flow';
import {CreateArchiveRequest} from '../../platform/management/requests/create-archive-request';
import {ExtractArchiveRequest} from '../../platform/management/requests/extract-archive-request';
import {ExtractPosterSpecification} from '../../platform/management/job/extract-poster-specification';
import {ExtractStoryboardSpecification} from '../../platform/management/job/extract-storyboard-specification';
import {TranscodeSpecification} from '../../platform/management/job/transcode-specification';
import {QualityRange} from '../../platform/management/job/quality-range';
import {TranscodeRequest} from '../../platform/management/requests/transcode-request';
import {ExtractPosterRequest} from '../../platform/management/requests/extract-poster-request';
import {ExtractStoryboardRequest} from '../../platform/management/requests/extract-storyboard-request';

export interface AuthorizationHeader {
  Authorization: string;
}

export interface DownloadURLObject {
  downloadUrl: string;
}

export type TokenObjects = any[][];

export interface TokenClaims {
  sub: string | null;
  obj: string | TokenObjects | null;
  aud: string | string[] | null;
  iss: string | null;
  iat: number | null;
  jti: string | null;
  exp: number | null;
}

// unknown type yet
export type Successor = any;

export interface ExportedImage {
  Image: typeof Image,
  ImageOperationSpecification: typeof ImageOperationSpecification;
  ImageOperationRequest: typeof ImageOperationRequest;
}

export interface ExportedUpload {
  UploadJob: typeof UploadJob;
}

export interface ExportedFile {
  UploadUrlRequest: typeof UploadUrlRequest;
  UploadFileRequest: typeof UploadFileRequest;
  ImportFileRequest: typeof ImportFileRequest;
  ListFilesRequest: typeof ListFilesRequest;
  Source: typeof Source;
  Destination: typeof Destination;
}

export interface ExportedJob {
  SearchJobsRequest: typeof SearchJobsRequest;
}

export interface ExportedLive {
  LivestreamRequest: typeof LivestreamRequest;
  LiveStream: typeof LiveStream;
}

export interface ExportedFlow {
  CreateFlowRequest: typeof CreateFlowRequest;
  Flow: typeof Flow;
  Invocation: typeof Invocation;
  FlowComponent: typeof FlowComponent;
}

export interface ExportedArchive {
  CreateArchiveRequest: typeof CreateArchiveRequest;
  ExtractArchiveRequest: typeof ExtractArchiveRequest;
}

export interface ExportedTranscode {
  TranscodeRequest: typeof TranscodeRequest;
  TranscodeSpecification: typeof TranscodeSpecification;
  ExtractPosterRequest: typeof ExtractPosterRequest;
  ExtractStoryboardRequest: typeof ExtractStoryboardRequest;
  ExtractPosterSpecification: typeof ExtractPosterSpecification;
  ExtractStoryboardSpecification: typeof ExtractStoryboardSpecification;
  QualityRange: typeof QualityRange;
}

export interface ExportedPublicMediaPlatform {
  Configuration: typeof PublicConfiguration;
  MediaPlatform: typeof MediaPlatform;
  Image: typeof Image;
  image: ExportedImage;
  upload: ExportedUpload;
  file: ExportedFile;
  job: ExportedJob;
  live: ExportedLive;
  flow: ExportedFlow;
  archive: ExportedArchive;
  transcode: ExportedTranscode;
  Source: typeof Source;
  Destination: typeof Destination;
  QualityRange: typeof QualityRange;
}
