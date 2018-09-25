export interface Coordinates {
  latitude: string | number;
  longitude: string | number;
}

export interface IGeo {
  coordinates?: Coordinates;
  ipAddress?: string;
  city?: string;
  country?: string;
}

export class Geo {
  public coordinates?: Coordinates;
  public ipAddress?: string;
  public city?: string;
  public country?: string;

  constructor(data: IGeo) {
    const coordinates = data.coordinates;

    if (coordinates) {
      this.coordinates = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      };
    }

    this.ipAddress = data.ipAddress;
    this.country = data.country;
    this.city = data.city;
  }
}
