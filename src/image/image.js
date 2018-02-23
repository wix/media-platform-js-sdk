import {parseUrl} from './parser/image-url-parser';
import {parseFileDescriptor} from './parser/file-descriptor-parser';
import {parseFileMetadata} from './parser/file-metadata-parser';
import {FileDescriptor} from '../platform/management/metadata/file-descriptor';
import {FileMetadata} from '../platform/management/metadata/file-metadata';
import {Crop} from './framing/crop';
import {SmartCrop} from './framing/smartcrop';
import {Fill} from './framing/fill';
import {Fit} from './framing/fit';
import {Rectangle} from '../geometry/rectangle';
import {Dimension} from '../geometry/dimension';
import {UnsharpMask} from './filter/unsharp-mask';
import {Blur} from './filter/blur';
import {Brightness} from './filter/brightness';
import {Contrast} from './filter/contrast';
import {Hue} from './filter/hue';
import {Saturation} from './filter/saturation';
import {JPEG} from './encoder/jpeg';

/**
 * @description a configurable object that supports all the operations, filters and adjustments supported by Wix Media Platform
 * @param {FileDescriptor|FileMetadata|string} data the file descriptor or a previously generated image url
 * @constructor Image
 */

class Image {
  constructor(data) {
    /**
     * @description where the image is hosted
     * @type {string|null}
     */
    this.host = null;

    /**
     * @description the image path in host
     * @type {string}
     */
    this.path = null;

    /**
     * @type {string}
     */
    this.fileName = null;

    /**
     * @description the source image metadata
     * @type {Metadata}
     */
    this.metadata = null;

    /**
     * @description the API version
     * @type {string}
     */
    this.version = 'v1';

    /**
     * @description the selected geometry
     * @type {Object}
     */
    this.geometry = null;

    /**
     * @type {UnsharpMask}
     */
    const unsharpMask = new UnsharpMask(this);
    this.unsharpMask = (function () {
      return unsharpMask.configuration;
    })();

    /**
     * @type {Blur}
     */
    const blur = new Blur(this);
    this.blur = (function () {
      return blur.percentage;
    })();

    /**
     * @type {Brightness}
     */
    const brightness = new Brightness(this);
    this.brightness = (function () {
      return brightness.brightness;
    })();

    /**
     * @type {Contrast}
     */
    const contrast = new Contrast(this);
    this.contrast = (function () {
      return contrast.contrast;
    })();

    /**
     * @type {Hue}
     */
    const hue = new Hue(this);
    this.hue = (function () {
      return hue.hue;
    })();

    /**
     * @type {Saturation}
     */
    const saturation = new Saturation(this);
    this.saturation = (function () {
      return saturation.saturation;
    })();

    /**
     * @type {JPEG}
     */
    const jpeg = new JPEG(this);
    this.jpeg = (function () {
      return jpeg.compression;
    })();

    if (data) {
      if (typeof data === 'string') {
        parseUrl(this, data);
      } else if (data instanceof FileDescriptor) {
        parseFileDescriptor(this, data);
      } else if (data instanceof FileMetadata) {
        parseFileMetadata(this, data);
      }
    }

    this.serializationOrder = [blur, brightness, contrast, hue, jpeg, saturation, unsharpMask];
  }

  /**
   * @summary fills the given width, the height is derived from the region of interest aspect ratio.
   * @param {number} width
   * @param {Rectangle?} regionOfInterest Region of interest, if not provided, the entire image is taken
   * @returns {Image}
   */
  scaleToWidth(width, regionOfInterest) {
    const container = new Dimension().setWidth(width);

    return this.fillContainer(container, regionOfInterest);
  }

  /**
   * @summary fills the given height, the width is derived from the region of interest aspect ratio.
   * @param {number} height
   * @param {Rectangle?} regionOfInterest Region of interest, if not provided, the entire image is taken
   * @returns {Image}
   */
  scaleToHeight(height, regionOfInterest) {
    const container = new Dimension().setHeight(height);

    return this.fillContainer(container, regionOfInterest);
  }

  /**
   * @param {Dimension} container
   * @param {Rectangle?} regionOfInterest
   * @returns {Image}
   */
  fillContainer(container, regionOfInterest) {
    if (!this.metadata) {
      throw new Error('client side manipulation requires image basic metadata');
    }

    if (!regionOfInterest) {
      regionOfInterest = new Rectangle(this.metadata.width, this.metadata.height, 0, 0);
    }

    const roiAspectRatio = regionOfInterest.width / regionOfInterest.height;
    const containerWidth = Math.round(container.width ? container.width : container.height * roiAspectRatio);
    const containerHeight = Math.round(container.height ? container.height : container.width / roiAspectRatio);
    const containerAspectRatio = container.width / container.height;

    let scale;
    if (containerAspectRatio <= 1) {
      //portrait -> portrait, landscape/square -> portrait/square
      scale = containerHeight / regionOfInterest.height;
    } else {
      //portrait/square -> landscape/square, //landscape -> landscape
      scale = containerWidth / regionOfInterest.width;
    }

    let x = Math.floor(regionOfInterest.x * scale);
    let y = Math.floor(regionOfInterest.y * scale);
    let height = Math.floor(regionOfInterest.height * scale);
    let width = Math.floor(regionOfInterest.width * scale);

    //TODO: handle bleeding top, bottom, left, right
    const verticalPadding = containerHeight - height;
    height += verticalPadding;
    const verticalOffset = Math.floor(verticalPadding / 2);
    if (y - verticalOffset < 0) {
      y = 0;
    } else {
      y -= verticalOffset;
    }

    const horizontalPadding = containerWidth - width;
    width += horizontalPadding;
    const horizontalOffset = Math.floor(horizontalPadding / 2);
    if (x - horizontalOffset < 0) {
      x = 0;
    } else {
      x -= horizontalOffset;
    }

    return this.crop(width, height, x, y, scale);
  }

  /**
   * @summary Configures this image using the 'crop' operation.
   * @param {number} width
   * @param {number} height
   * @param {number?} x
   * @param {number?} y
   * @param {number?} scale
   * @returns {Image}
   */
  crop(width, height, x, y, scale) {
    this.geometry = new Crop(width, height, x ? x : 0, y ? y : 0, scale ? scale : 1);
    return this;
  }

  /**
   * @summary Configures this image using the 'scrop' operation.
   * @param {number} width
   * @param {number} height
   * @returns {Image}
   */
  smartCrop(width, height) {
    this.geometry = new SmartCrop(width, height);
    return this;
  }

  /**
   * @summary Configures this image using the 'fill' operation.
   * @param {number} width
   * @param {number} height
   * @returns {Image}
   */
  fill(width, height) {
    this.geometry = new Fill(width, height);
    return this;
  }

  /**
   * @summary Configures this image using the 'fit' operation.
   * @param {number} width
   * @param {number} height
   * @returns {Image}
   */
  fit(width, height) {
    this.geometry = new Fit(width, height);
    return this;
  }

  /**
   * @summary serializes the Image to the URL
   * @param {string?} host where the image is hosted, default to '//'
   * @returns {{url: string|null, error: Error|null}}
   */
  toUrl(host) {
    const command = this.toCommand();

    if (command.error) {
      return {
        url: null,
        error: command.error
      };
    }

    let baseUrl = host || this.host || '';

    let url = '';
    if (baseUrl.length !== 0 && baseUrl.indexOf('http') !== 0 && baseUrl.indexOf('//') !== 0) {
      url += '//';
    }

    if (baseUrl.lastIndexOf('/') === baseUrl.length - 1) {
      baseUrl = baseUrl.slice(0, -1);
    }

    let path = this.path;
    if (path.indexOf('/') === 0) {
      path = path.slice(1);
    }

    url += baseUrl + '/' + path + command.command + '/' + encodeURIComponent(this.fileName);
    if (this.metadata) {
      url += '#' + this.metadata.serialize();
    }
    return {
      url: url,
      error: null
    };
  }

  /**
   * @summary serializes the command part of the URL
   * @returns {{command: string|null, error: Error|null}}
   */
  toCommand() {
    if (!this.geometry) {
      return {
        url: null,
        error: new Error('geometry not defined')
      };
    }

    const geometryParams = this.geometry.serialize();
    if (geometryParams.error) {
      return {
        url: null,
        error: new Error(geometryParams.error)
      };
    }

    const filtersAndEncoderParams = this.collectParams();
    if (filtersAndEncoderParams.errors.length > 0) {
      return {
        url: null,
        error: new Error(filtersAndEncoderParams.errors)
      };
    }
    const command = '/' + this.version + '/' + geometryParams.params + filtersAndEncoderParams.params;

    return {
      command: command,
      error: null
    };
  }

  /**
   * @returns {{params: string, errors: Array<string>}}
   * @private
   */
  collectParams() {
    let out = '';
    let part;
    const errors = [];
    this.serializationOrder.forEach(function concat(op) {
      part = op.serialize();
      if (part.error) {
        errors.push(part.error);
      }
      if (out.length > 0 && part.params && part.params.length > 0) {
        out += ',';
      }
      out += part.params;
    });

    if (out.length > 0) {
      out = ',' + out;
    }
    return {
      params: out,
      errors: errors
    };
  }
}

/**
 * @type {Image}
 */
export default Image;
export {Image};
