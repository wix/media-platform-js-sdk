import {Destination} from '../job/destination';

export interface IDvr {
  destination: Destination;
}

export class Dvr {
  public destination: Destination | null = null;

  constructor(data?: IDvr) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IDvr) {
    this.destination = new Destination(data.destination);
  }

  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }
}
