export class Policy {
  constructor(
    public maxHeight?: number,
    public maxWidth?: number,
    public path?: string,
  ) {}

  toClaims(): { obj: { [key: string]: string }[][] } {
    const policy: { [key: string]: string } = {};

    if (typeof this.path !== 'undefined') {
      policy.path = this.path;
    }

    if (typeof this.maxHeight !== 'undefined') {
      policy.height = `<=${this.maxHeight}`;
    }

    if (typeof this.maxWidth !== 'undefined') {
      policy.width = `<=${this.maxWidth}`;
    }

    return {
      obj: [[policy]],
    };
  }
}
