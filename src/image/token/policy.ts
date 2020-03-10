interface PolicyParams {
  maxHeight?: number;
  maxWidth?: number;
  path?: string;
}

export class Policy {
  public maxHeight?: number;

  public maxWidth?: number;

  public path?: string;

  constructor(policyParams?: PolicyParams) {
    if (typeof policyParams !== 'undefined') {
      this.path = policyParams.path;
      this.maxWidth = policyParams.maxWidth;
      this.maxHeight = policyParams.maxHeight;
    }
  }

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
