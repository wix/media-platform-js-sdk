import {AudioSpecification, IAudioSpecification} from './audio-specification';

export interface IAudio {
  specification: IAudioSpecification;
}

export class Audio {
  public specification: AudioSpecification | null = null;

  constructor(data?: IAudio) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IAudio) {
    this.specification = new AudioSpecification(data.specification);
  }
}
