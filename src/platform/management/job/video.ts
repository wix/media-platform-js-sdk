import {VideoSpecification} from './video-specification';


export interface IVideo {
  specification: VideoSpecification;
}

export class Video {
  public specification: VideoSpecification;

  constructor(data: IVideo) {
    this.specification = new VideoSpecification(data.specification);
  }
}
