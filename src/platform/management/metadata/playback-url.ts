export interface IPlaybackUrl {
  path: string;
  packageName: string;
}

export class PlaybackUrl {
  public path: string | null = null;
  public packageName: string | null = null;

  constructor(data?: IPlaybackUrl) {
    if (data) {
      this.deserialize(data);
    }
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
   *
   * @param path
   * @returns {PlaybackUrl}
   */
  setPath(path: string): this {
    this.path = path;
    return this;
  }

  /**
   *
   * @param packageName
   * @returns {PlaybackUrl}
   */
  setPackageName(packageName: string): this {
    this.packageName = packageName;
    return this;
  }
}

