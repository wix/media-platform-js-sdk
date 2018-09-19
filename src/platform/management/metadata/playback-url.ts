import {deprecated} from 'core-decorators';


export interface IPlaybackUrl {
  path: string;
  packageName: string;
}

export class PlaybackUrl {
  public path: string | null = null;
  public packageName: string | null = null;

  constructor(data: IPlaybackUrl) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IPlaybackUrl) {
    this.path = data.path;
    this.packageName = data.packageName;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param path
   * @returns {PlaybackUrl}
   */
  @deprecated('pass data to constructor instead')
  setPath(path: string): this {
    this.path = path;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param packageName
   * @returns {PlaybackUrl}
   */
  @deprecated('pass data to constructor instead')
  setPackageName(packageName: string): this {
    this.packageName = packageName;
    return this;
  }
}

