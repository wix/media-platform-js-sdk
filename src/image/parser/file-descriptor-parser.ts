/**
 * @param {Image} image
 * @param {FileDescriptor} fileDescriptor
 * @returns Image
 */
export function parseFileDescriptor(image, fileDescriptor) {
  const type = fileDescriptor.mimeType.split('/')[0].toLowerCase();
  if (type !== 'image') {
    throw new Error('file is not an image');
  }

  image.path = fileDescriptor.path;
  image.fileName = image.path.split('/').pop();
}
