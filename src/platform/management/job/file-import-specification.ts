import {Destination} from './destination';

export interface IFileImportSpecification {
  sourceUrl: string;
  destination: Destination;
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
    this.destination = data.destination;
  }
}
