import {VideoSpecification} from './video-specification';

export interface IVideo {
  specification: VideoSpecification;
}

export class Video {
  public specification: VideoSpecification | null = null;

  constructor(data?: IVideo) {
    if (data) {
      this.deserialize(data);
    }
  }

  setSpecification(specification: VideoSpecification): this {
    this.specification = specification;
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IVideo) {
    this.specification = new VideoSpecification(data.specification);
  }
}
