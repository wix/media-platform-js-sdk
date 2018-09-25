export interface IPlaybackUrl {
  path: string;
  packageName: string;
}

export class PlaybackUrl {
  public path: string | null = null;
  public packageName: string | null = null;

  constructor(data: IPlaybackUrl) {
    this.path = data.path;
    this.packageName = data.packageName;
  }
}
