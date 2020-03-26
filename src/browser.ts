import { Image } from './image/image';
import { Destination } from './platform/management/job/destination';
import { ExtractPosterSpecification } from './platform/management/job/extract-poster-specification';
import { ExtractStoryboardSpecification } from './platform/management/job/extract-storyboard-specification';
import { ImageOperationSpecification } from './platform/management/job/image-operation-specification';
import { QualityRange } from './platform/management/job/quality-range';
import { Source } from './platform/management/job/source';
import { TranscodeSpecification } from './platform/management/job/transcode-specification';
import { Flow } from './platform/management/metadata/flow';
import { FlowComponent } from './platform/management/metadata/flow-component';
import { Invocation } from './platform/management/metadata/invocation';
import { LiveStream } from './platform/management/metadata/live-stream';
import { CreateArchiveRequest } from './platform/management/requests/create-archive-request';
import { CreateFlowRequest } from './platform/management/requests/create-flow-request';
import { ExtractArchiveRequest } from './platform/management/requests/extract-archive-request';
import { ExtractPosterRequest } from './platform/management/requests/extract-poster-request';
import { ExtractStoryboardRequest } from './platform/management/requests/extract-storyboard-request';
import { ImageOperationRequest } from './platform/management/requests/image-operation-request';
import { ImportFileRequest } from './platform/management/requests/import-file-request';
import { ListFilesRequest } from './platform/management/requests/list-files-request';
import { LiveStreamListRequest } from './platform/management/requests/live-stream-list-request';
import { LiveStreamRequest } from './platform/management/requests/live-stream-request';
import { SearchJobsRequest } from './platform/management/requests/search-jobs-request';
import { TranscodeRequest } from './platform/management/requests/transcode-request';
import { UploadFileRequest } from './platform/management/requests/upload-file-request';
import { UploadUrlRequest } from './platform/management/requests/upload-url-request';
import { Configuration } from './public/platform/configuration/configuration';
import { MediaPlatform } from './public/platform/media-platform';
import { UploadJob } from './public/platform/uploader/upload-job';
import { ExportedPublicMediaPlatform } from './types/media-platform/public-media-platform';
import { MediaType } from './types/media-platform/media-platform';

// export  { ExportedPublicMediaPlatform } from './types/media-platform/media-platform';

export { Configuration };
export { MediaPlatform };
export { Image };
export { Source };
export { Destination };
export { QualityRange };
export { MediaType };

export const image = {
  Image,
  ImageOperationSpecification,
  ImageOperationRequest,
};
export const upload = {
  UploadJob,
};
export const file = {
  UploadUrlRequest,
  UploadFileRequest,
  ImportFileRequest,
  ListFilesRequest,
  Source,
  Destination,
};
export const job = {
  SearchJobsRequest,
};
export const live = {
  LivestreamRequest: LiveStreamRequest,
  LiveStreamListRequest,
  LiveStream,
};
export const flow = {
  CreateFlowRequest,
  Flow,
  Invocation,
  FlowComponent,
};
export const archive = {
  CreateArchiveRequest,
  ExtractArchiveRequest,
};
export const transcode = {
  TranscodeRequest,
  TranscodeSpecification,
  ExtractPosterRequest,
  ExtractStoryboardRequest,
  ExtractPosterSpecification,
  ExtractStoryboardSpecification,
  QualityRange,
};

export { ExportedPublicMediaPlatform };

export const MP: ExportedPublicMediaPlatform = {
  Configuration,
  MediaPlatform,
  Image,
  image,
  upload,
  file,
  job,
  live,
  flow,
  archive,
  transcode,
  Source,
  Destination,
  QualityRange,
  MediaType,
};
