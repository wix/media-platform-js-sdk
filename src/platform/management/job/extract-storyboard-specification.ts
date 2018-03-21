import {Destination, IDestination} from './destination';

export interface IExtractStoryboardSpecification {
    rows: number;
    columns: number;
    tileHeight: number;
    tileWidth: number;
    format: string;
    destination: IDestination;
}

export class ExtractStoryboardSpecification {
    public destination = null;

    public format = null;
    
    public rows = null;
    public columns = null;
    
    public tileHeight = null;
    public tileWidth = null;


    constructor(data?: IExtractStoryboardSpecification) {
        if (data) {
            this.deserialize(data);
        }
    }

    setDestination = function (destination) {
        this.destination = destination;
        return this;
    };

    setFormat = function (format) {
        this.format = format;
        return this;
    };

    setTileWidth = function (tileWidth) {
        this.tileWidth = tileWidth;
        return this;
    };

    setTileHeight = function (tileHeight) {
        this.tileHeight = tileHeight;
        return this;
    };

    setRows = function (rows) {
        this.rows = rows;
        return this;
    };

    setColumns = function (columns) {
        this.columns = columns;
        return this;
    };

    deserialize = function (data) {
        this.destination = new Destination(data.destination);
        this.format = data.format;
        this.columns = data.columns;
        this.rows = data.rows;
        this.tileWidth = data.tileWidth;
        this.tileHeight = data.tileHeight;
    };

}
/**
 * @param data
 * @private
 */
ExtractStoryboardSpecification.prototype.deserialize = function (data) {
    this.destination = new Destination(data.destination);
    this.columns = data.columns;
    this.rows = data.rows;
    this.tileWidth = data.tileWidth;
    this.tileHeight = data.tileHeight;
    this.format = data.format;
};
