import { Image } from '../../image/image';
import { Destination } from '../../platform/management/job/destination';
import { ExtractPosterSpecification } from '../../platform/management/job/extract-poster-specification';
import { ExtractStoryboardSpecification } from '../../platform/management/job/extract-storyboard-specification';
import { ImageOperationSpecification } from '../../platform/management/job/image-operation-specification';
import { QualityRange } from '../../platform/management/job/quality-range';
import { Source } from '../../platform/management/job/source';
import { TranscodeSpecification } from '../../platform/management/job/transcode-specification';
import { Flow } from '../../platform/management/metadata/flow';
import { FlowComponent } from '../../platform/management/metadata/flow-component';
import { Invocation } from '../../platform/management/metadata/invocation';
import { LiveStream } from '../../platform/management/metadata/live-stream';
import { CreateArchiveRequest } from '../../platform/management/requests/create-archive-request';
import { CreateFlowRequest } from '../../platform/management/requests/create-flow-request';
import { ExtractArchiveRequest } from '../../platform/management/requests/extract-archive-request';
import { ExtractPosterRequest } from '../../platform/management/requests/extract-poster-request';
import { ExtractStoryboardRequest } from '../../platform/management/requests/extract-storyboard-request';
import { ImageOperationRequest } from '../../platform/management/requests/image-operation-request';
import { ImportFileRequest } from '../../platform/management/requests/import-file-request';
import { ListFilesRequest } from '../../platform/management/requests/list-files-request';
import { LiveStreamRequest } from '../../platform/management/requests/live-stream-request';
import { SearchJobsRequest } from '../../platform/management/requests/search-jobs-request';
import { TranscodeRequest } from '../../platform/management/requests/transcode-request';
import { UploadFileRequest } from '../../platform/management/requests/upload-file-request';
import { UploadUrlRequest } from '../../platform/management/requests/upload-url-request';
import { UploadJob } from '../../public/platform/uploader/upload-job';

export interface AuthorizationHeader {
  Authorization: string;
}

export interface DownloadURLObject {
  downloadUrl: string;
}

/**
 * @doc Authentication
 */
export type TokenObjects = any[][];

/**
 * @doc Authentication
 */
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
  Image: typeof Image;
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
  LivestreamRequest: typeof LiveStreamRequest;
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



export enum OrderDirection {
  None,
  ASC = 'asc',
  DES = 'des',
}

export enum ACL {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export enum FileType {
  FILE = '-',
  FOLDER = 'd',
}

export enum MediaType {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Font = 'font',
}

export enum DescriptorMimeType {
  Folder = 'application/vnd.wix-media.dir',
}

export enum LiveStreamState {
  CREATED = 'created',
  STREAMING = 'streaming',
  PENDING_RECONNECT = 'pending_reconnect',
  DVR_PROCESSING = 'dvr_processing',
  CLOSED = 'closed',
}

export enum Lifecycle {
  Delete = 'delete',
}
