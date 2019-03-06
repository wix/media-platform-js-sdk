import { Metadata } from '../metadata';
import { parseFileDescriptor } from './file-descriptor-parser';

/**
 * @param {Image} image
 * @param {FileMetadata} fileMetadata
 * @returns Image
 */
export function parseFileMetadata(image, fileMetadata) {
  parseFileDescriptor(image, fileMetadata.fileDescriptor);

  if (fileMetadata.basic) {
    image.metadata = new Metadata(
      fileMetadata.basic.width,
      fileMetadata.basic.height,
      fileMetadata.fileDescriptor.mimeType,
    );
  }
}
