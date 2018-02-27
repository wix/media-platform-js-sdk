export class Dimension {
  constructor(public width: number = null, public height: number = null) {
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
