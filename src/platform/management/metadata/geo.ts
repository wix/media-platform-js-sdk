export interface Coordinates {
  latitude: string | number | null;
  // was a typo, leaving it for backward-compatibility, will remove
  longitute: string | number | null;
  longitude: string | number | null;
}

export interface IGeo {
  coordinates?: Coordinates;
  ipAddress: string;
}

export class Geo {
  public coordinates: Coordinates | null = null;
  public ipAddress: string | null = null;

  constructor(data?: IGeo) {
    if (data) {
      this.deserialize(data);
    }
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
        longitute: coordinates.longitude || null,
        longitude: coordinates.longitude || null
      };
    }
    this.ipAddress = data.ipAddress;
  }

  /**
   *
   * @param coordinates
   * @returns {Geo}
   */
  setCoordinates(coordinates: Coordinates): this {
    this.coordinates = coordinates;
    return this;
  }

  /**
   *
   * @param ipAddress
   * @returns {Geo}
   */
  setIpAddress(ipAddress: string): this {
    this.ipAddress = ipAddress;
    return this;
  }
}
