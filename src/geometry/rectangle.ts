export class Rectangle {
  constructor(public width: number, public height: number, public x: number, public y: number) {
  }

  /**
   * @param {number} x
   * @returns {Rectangle}
   */
  setX(x: number): Rectangle {
    this.x = x;
    return this;
  }

  /**
   * @param {number} y
   * @returns {Rectangle}
   */
  setY(y: number): Rectangle {
    this.y = y;
    return this;
  }

  /**
   * @param {number} width
   * @returns {Rectangle}
   */
  setWidth(width: number): Rectangle {
    this.width = width;
    return this;
  }

  /**
   * @param {number} height
   * @returns {Rectangle}
   */
  setHeight(height: number): Rectangle {
    this.height = height;
    return this;
  }
}

