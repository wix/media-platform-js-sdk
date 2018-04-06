export class Dimension {
  constructor(public width: number = 0, public height: number = 0) {
  }

  setWidth(width: number): Dimension {
    this.width = width;
    return this;
  }

  setHeight(height: number): Dimension {
    this.height = height;
    return this;
  }
}
