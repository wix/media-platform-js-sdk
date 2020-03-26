import { Image } from '../../image/image';
import { Destination } from '../../platform/management/job/destination';
import { QualityRange } from '../../platform/management/job/quality-range';
import { Source } from '../../platform/management/job/source';
import { Configuration as PublicConfiguration } from '../../public/platform/configuration/configuration';
import { MediaPlatform } from '../../public/platform/media-platform';
import {
  ExportedArchive,
  ExportedFile,
  ExportedFlow,
  ExportedImage,
  ExportedJob,
  ExportedLive,
  ExportedTranscode,
  ExportedUpload,
  MediaType,
} from './media-platform';

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
  MediaType: typeof MediaType;
}
