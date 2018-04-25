import {Destination, IDestination} from './destination';

export interface IPackagingSpecification {
  destination: IDestination;
  chunkDuration: number;
  packageType: string; // hls | dash
}

export class PackagingSpecification implements IPackagingSpecification {
  public destination: Destination;
  public chunkDuration: number;
  public packageType: string;

  constructor(data: IPackagingSpecification) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IPackagingSpecification) {
    this.destination = new Destination(data.destination);
    this.chunkDuration = data.chunkDuration;
    this.packageType = data.packageType;
  }
}
