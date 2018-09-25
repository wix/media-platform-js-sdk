import {Destination} from '../job/destination';


export interface IDvr {
  destination: Destination;
}

export class Dvr {
  public destination: Destination;

  constructor(data: IDvr) {
    this.destination = new Destination(data.destination);
  }
}
