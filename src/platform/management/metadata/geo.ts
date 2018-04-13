import {deprecated} from 'core-decorators';

export interface Coordinates {
  latitude: string | number | null;
  longitude: string | number | null;
}

export interface IGeo {
  coordinates?: Coordinates;
  ipAddress: string;
}

export class Geo {
  public coordinates: Coordinates | null = null;
  public ipAddress: string | null = null;

  constructor(data: IGeo) {
    this.deserialize(data);
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IGeo) {
    const coordinates = data.coordinates || null;

    if (coordinates !== null) {
      this.coordinates = {
        latitude: coordinates.latitude || null,
        longitude: coordinates.longitude || null
      };
    }
    this.ipAddress = data.ipAddress;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param coordinates
   * @returns {Geo}
   */
  @deprecated('pass data to constructor instead')
  setCoordinates(coordinates: Coordinates): this {
    this.coordinates = coordinates;
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param ipAddress
   * @returns {Geo}
   */
  @deprecated('pass data to constructor instead')
  setIpAddress(ipAddress: string): this {
    this.ipAddress = ipAddress;
    return this;
  }
}
