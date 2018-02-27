
export interface IImageBasicMetadata {
  height: number;
  width: number;
  colorspace: string;
  format: string;
}

export class ImageBasicMetadata {
  public height: number | null = null;
  public width: number | null = null;
  public colorspace: string | null = null;
  public format: string | null = null;

  constructor(data?: IImageBasicMetadata) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IImageBasicMetadata) {
    this.height = data.height;
    this.width = data.width;
    this.colorspace = data.colorspace;
    this.format = data.format;
  }
}

