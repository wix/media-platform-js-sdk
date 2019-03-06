export interface ILiveStreamAnalytics {
  projectId: string;
  streamId: string;
  stats: object[];
}

export class LiveStreamAnalytics {
  projectId: string;
  streamId: string;
  stats: object[];

  constructor(data: ILiveStreamAnalytics) {
    this.projectId = data.projectId;
    this.streamId = data.streamId;
    this.stats = data.stats;
  }
}
