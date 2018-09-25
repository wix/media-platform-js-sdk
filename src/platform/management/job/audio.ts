import {AudioSpecification, IAudioSpecification} from './audio-specification';


export interface IAudio {
  specification: IAudioSpecification;
}

export class Audio implements IAudio {
  public specification: AudioSpecification;

  constructor(data: IAudio) {
    this.specification = new AudioSpecification(data.specification);
  }
}
