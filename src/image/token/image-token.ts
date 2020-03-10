import { Policy } from './policy';
import { Watermark } from '../watermark';
import { Token } from '../../platform/authentication/token';
import { TokenClaims } from '../../types/media-platform/media-platform';

export interface ImageTokenClaims extends TokenClaims {
  wmk?: {
    path?: string;
    opacity?: number;
    proportions?: number;
    gravity?: string;
  };
}

export class ImageToken extends Token {
  private static readonly VERB: string = 'urn:service:image.operations';

  constructor(public policy?: Policy, public watermark?: Watermark) {
    super();
    this.addVerbs(ImageToken.VERB);
  }

  toClaims(): ImageTokenClaims {
    if (typeof this.policy !== 'undefined') {
      this.setObjects(this.policy.toClaims().obj);
    }

    const claims: ImageTokenClaims = {
      ...super.toClaims(),
    };

    if (typeof this.watermark !== 'undefined') {
      claims.wmk = this.watermark.toClaims().wmk;
    }

    return claims;
  }
}
