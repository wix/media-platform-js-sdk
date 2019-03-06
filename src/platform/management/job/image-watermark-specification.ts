import { ISource } from './source';

export enum ImageWatermarkPosition {
  NORTHWEST = 1,
  NORTH = 2,
  NORTHEAST = 3,
  WEST = 4,
  CENTER = 5, // Default
  EAST = 6,
  SOUTHWEST = 7,
  SOUTH = 8,
  SOUTHEAST = 9,
  TEXTURE = 10, // Tile
}

export interface IImageWatermarkSpecification {
  watermark: ISource;
  position: ImageWatermarkPosition;
  opacity: number;
  scale: number;
}
