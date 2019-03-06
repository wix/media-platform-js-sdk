import { IGeometryBase, SerializedGeometry } from '../../types/image/geometry';

export class GeometryBase implements IGeometryBase {
  public name = 'Base';
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.width = Math.round(width);
    this.height = Math.round(height);
  }

  serialize(): SerializedGeometry {
    throw Error('NotImplemented');
  }
}

export class Geometry extends GeometryBase {
  constructor(width: number, height: number) {
    super(width, height);
    this.coordinates(width, height);
  }

  coordinates(x?: number, y?: number): this {
    throw Error('NotImplemented');
  }
}
