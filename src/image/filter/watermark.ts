import {validator} from '../validation/validator';
import {Image} from '../image';
import {autobind} from 'core-decorators';

export interface WatermarkSettings {
  manifest: string | null;
}

/**
 * @param image
 * @constructor
 */

class Watermark {
  public error: string = '';
  public settings: WatermarkSettings = {
    manifest: null
  };

  constructor(public image: Image) {
  }

  /**
   * @summary Applies a watermark from a premade watermark manifest.
   * @param manifest name.
   * @returns {*} the operation
   */
  @autobind
  manifest(manifest?: string): Image {
    this.settings.manifest = manifest || null;
    this.error = '';
    return this.image;
  }

  /**
   * @returns {params: string, error: string}
   */
  serialize() {
    let out = '';

    if (this.settings.manifest) {
      out += 'wm_' + this.settings.manifest;
    }

    return {
      params: out,
      error: this.error
    };
  }
}

/**
 * @type {Watermark}
 */
export {Watermark};
