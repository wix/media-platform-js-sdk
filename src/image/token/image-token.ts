import { Policy } from './policy';
import { Watermark } from '../watermark';
import { Token } from '../../platform/authentication/token';
import { TokenClaims } from '../../types/media-platform/media-platform';

export interface ImageTokenClaims extends TokenClaims {
  wmk?: {
    path: string | null;
    opacity: number | null;
    proportions: number | null;
    gravity: string | null;
  };
}

export class ImageToken extends Token {
  private static readonly VERB: string = 'urn:service:image.operations';

  constructor(
    private _policy: Policy | null = null,
    private _watermark: Watermark | null = null,
  ) {
    super();
    this.addVerbs(ImageToken.VERB);
  }

  get policy(): Policy | null {
    return this._policy;
  }

  set policy(value: Policy | null) {
    this._policy = value;
  }

  get watermark(): Watermark | null {
    return this._watermark;
  }

  set watermark(value: Watermark | null) {
    this._watermark = value;
  }

  toClaims(): ImageTokenClaims {
    if (this.policy !== null) {
      this.setObjects(this.policy.toClaims().obj);
    }

    const claims: ImageTokenClaims = {
      ...super.toClaims(),
    };

    if (this.watermark !== null) {
      claims.wmk = this.watermark.toClaims().wmk;
    }

    return claims;
  }
}
