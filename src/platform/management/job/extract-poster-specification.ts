import {Destination, IDestination} from './destination';

export interface IExtractPosterSpecification {
    second: number;
    format: string;
    destination: IDestination;
}

export class ExtractPosterSpecification {

    public destination = null;

    public second = null;

    /**
     * @type {string}
     */
    public format = null;

    constructor(data?: IExtractPosterSpecification) {
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

    setSecond = function (second) {
        this.second = second;
        return this;
    };

    deserialize = function (data) {
        this.destination = new Destination(data.destination);
        this.format = data.format;
        this.second = data.second;
    };

}