import { Destination, IDestination } from './destination';

export interface IExtractStoryboardSpecification {
  rows: number;
  columns: number;
  tileHeight: number;
  tileWidth: number;
  format: string;
  destination: IDestination;
}

export class ExtractStoryboardSpecification
  implements IExtractStoryboardSpecification {
  public rows: number;
  public columns: number;
  public tileHeight: number;
  public tileWidth: number;
  public format: string;
  public destination: Destination;

  constructor(data: IExtractStoryboardSpecification) {
    this.destination = new Destination(data.destination);
    this.format = data.format;
    this.columns = data.columns;
    this.rows = data.rows;
    this.tileWidth = data.tileWidth;
    this.tileHeight = data.tileHeight;
  }
}
