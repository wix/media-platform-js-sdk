import {Destination, IDestination} from './destination';

export interface IExtractStoryboardSpecification {
  rows: number;
  columns: number;
  tileHeight: number;
  tileWidth: number;
  format: string;
  destination: IDestination;
}

export class ExtractStoryboardSpecification implements IExtractStoryboardSpecification {
  public rows: number;
  public columns: number;
  public tileHeight: number;
  public tileWidth: number;
  public format: string;
  public destination: Destination;

  constructor(data: IExtractStoryboardSpecification) {
    this.deserialize(data);
  }

  public setDestination(destination: Destination): this {
    this.destination = destination;
    return this;
  }

  public setFormat(format: string): this {
    this.format = format;
    return this;
  }

  public setTileWidth(tileWidth: number): this {
    this.tileWidth = tileWidth;
    return this;
  }

  public setTileHeight(tileHeight: number): this {
    this.tileHeight = tileHeight;
    return this;
  }

  public setRows(rows: number): this {
    this.rows = rows;
    return this;
  }

  public setColumns(columns: number): this {
    this.columns = columns;
    return this;
  }

  private deserialize(data: IExtractStoryboardSpecification): void {
    this.destination = new Destination(data.destination);
    this.format = data.format;
    this.columns = data.columns;
    this.rows = data.rows;
    this.tileWidth = data.tileWidth;
    this.tileHeight = data.tileHeight;
  }

}
