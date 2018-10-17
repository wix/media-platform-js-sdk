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
  destination: IDestination | undefined;
  chunkDuration: number | undefined;
  packageType: PackageType | undefined;
}

/**
 * Packaging
 * @doc Packaging
 */
export class PackagingSpecification implements IPackagingSpecification {
  public destination: Destination | undefined = undefined;
  public chunkDuration: number | undefined = undefined;
  public packageType: PackageType | undefined = undefined;

  constructor(data: IPackagingSpecification) {
    this.chunkDuration = data.chunkDuration;

    if (data.destination) {
      this.destination = new Destination(data.destination);
    }

    this.packageType = data.packageType;
  }
}
