import {Destination, IDestination} from './destination';

/**
 * Packaging interface
 * @doc Packaging
 */

export enum PackageType {
  HLS = 'hls',
  DASH = 'dash'
}

export interface IPackagingSpecification {
  destination: IDestination;
  chunkDuration: number;
  packageType: PackageType;
}

/**
 * Packaging
 * @doc Packaging
 */
export class PackagingSpecification implements IPackagingSpecification {
  public destination: Destination;
  public chunkDuration: number;
  public packageType: PackageType;

  constructor(data: IPackagingSpecification) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  private deserialize(data: IPackagingSpecification) {
    this.destination = new Destination(data.destination);
    this.chunkDuration = data.chunkDuration;
    this.packageType = data.packageType;
  }
}
