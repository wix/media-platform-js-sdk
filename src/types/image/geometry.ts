export interface SerializedGeometry {
  params: string | null;
  error: Error | null;
}

export interface IGeometryBase {
  name: string;
  serialize(): SerializedGeometry;
  width: number;
  height: number;
  size?(width: number, height: number): this;
  coordinates?(x?: number, y?: number): this;
}
