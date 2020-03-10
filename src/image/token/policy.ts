export class Policy {
  constructor(
    public maxHeight: number | null = null,
    public maxWidth: number | null = null,
    public path: string | null = null,
  ) {}

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
