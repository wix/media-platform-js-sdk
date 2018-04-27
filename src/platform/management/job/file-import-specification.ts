import {Destination, IDestination} from './destination';

export interface IFileImportSpecification {
  sourceUrl: string;
  destination: IDestination;
}

export class FileImportSpecification implements IFileImportSpecification {
  public sourceUrl: string;
  public destination: Destination;

  constructor(data: IFileImportSpecification) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  private deserialize(data: IFileImportSpecification) {
    this.sourceUrl = data.sourceUrl;
    this.destination = new Destination(data.destination);
  }
}
