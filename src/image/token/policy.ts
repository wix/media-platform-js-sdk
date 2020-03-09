export class Policy {
  constructor(
    private _maxHeight: number | null = null,
    private _maxWidth: number | null = null,
    private _path: string | null = null,
  ) {}

  get maxHeight(): number | null {
    return this._maxHeight;
  }

  set maxHeight(value: number | null) {
    this._maxHeight = value;
  }

  get maxWidth(): number | null {
    return this._maxWidth;
  }

  set maxWidth(value: number | null) {
    this._maxWidth = value;
  }

  get path(): string | null {
    return this._path;
  }

  set path(value: string | null) {
    this._path = value;
  }

  toClaims(): { [key: string]: any } {
    const policy: { [key: string]: string } = {};

    if (this.path !== null) {
      policy.path = this.path;
    }

    if (this.maxHeight !== null) {
      policy.height = `<=${this.maxHeight}`;
    }

    if (this.maxWidth !== null) {
      policy.width = `<=${this.maxWidth}`;
    }

    return {
      obj: [[policy]],
    };
  }
}
