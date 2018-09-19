import {deprecated} from 'core-decorators';

import {VideoSpecification} from './video-specification';


export interface IVideo {
  specification: VideoSpecification;
}

export class Video {
  public specification: VideoSpecification;

  constructor(data: IVideo) {
    this.deserialize(data);
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {VideoSpecification} specification
   * @returns {this}
   */
  @deprecated('pass data to constructor instead')
  public setSpecification(specification: VideoSpecification): this {
    this.specification = specification;
    return this;
  }

  /**
   * @param data
   * @private
   */
  private deserialize(data: IVideo) {
    this.specification = new VideoSpecification(data.specification);
  }
}
