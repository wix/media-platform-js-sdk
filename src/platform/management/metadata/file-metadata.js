import {FileDescriptor} from './file-descriptor';
import {ImageBasicMetadata} from './image-basic-metadata';
import {VideoBasicMetadata} from './video-basic-metadata';
import {ImageFeatures} from './image-features';

/**
 * @param data
 * @constructor
 */

class FileMetadata {
  constructor(data) {
    /**
     * @type {FileDescriptor}
     */
    this.fileDescriptor = null;

    /**
     * @type {Object}
     */
    this.basic = null;

    /**
     * @type {Object}
     */
    this.features = null;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.fileDescriptor = new FileDescriptor(data.fileDescriptor);
    const type = this.fileDescriptor.mimeType.split('/')[0].toLowerCase();
    if (data.basic) {
      switch (type) {
        case 'image':
          this.basic = new ImageBasicMetadata(data.basic);
          break;
        case 'video':
          this.basic = new VideoBasicMetadata(data.basic);
          break;
      }
    }
    if (data.features) {
      switch (type) {
        case 'image':
          this.features = new ImageFeatures(data.features);
          break;
      }
    }
  }
}

/**
 * @type {FileMetadata}
 */
export default FileMetadata;
export {FileMetadata};
