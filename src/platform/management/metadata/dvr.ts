import {Destination, IDestination} from '../job/destination';
import {deprecated} from 'core-decorators';

export interface IDvr {
  destination: IDestination;
}

export class Dvr {
  public destination: Destination | null = null;

  constructor(data: IDvr) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IDvr) {
    this.destination = new Destination(data.destination);
  }

  /**
   * @deprecated pass data to constructor instead
   * @param {Destination} destination
   * @returns {this}
   */
  @deprecated('pass data to constructor instead')
  setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }
}
