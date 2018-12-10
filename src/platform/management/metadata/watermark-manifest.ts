/**
 * IWatermarkManifest
 * @doc IWatermarkManifest
 */
export interface IWatermarkManifest {
  id: string;
}

/**
 * WatermarkManifest
 * @doc WatermarkManifest
 */
export class WatermarkManifest implements IWatermarkManifest {
  /**
   * @description a system assigned unique id
   */
  public id: string = '';

  constructor(data: IWatermarkManifest) {
    this.id = data.id;
  }
}
