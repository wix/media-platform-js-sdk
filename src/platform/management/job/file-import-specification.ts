import {Destination, IDestination} from './destination';

export interface IFileImportSpecification {
  sourceUrl: string;
  destination: IDestination;
}

export class FileImportSpecification {
  public sourceUrl: string | null = null;
  public destination: Destination | null = null;

  constructor(data?: IFileImportSpecification) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IFileImportSpecification) {
    this.sourceUrl = data.sourceUrl;
    this.destination = new Destination(data.destination);
  }
}
