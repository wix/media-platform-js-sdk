import {WebhookEvent} from './webhook-event';
import {Authenticator} from '../authentication/authenticator';

export class WebhookDeserializer {
  constructor(public authenticator: Authenticator) {
  }

  /**
   * @param {String} signedToken
   * @returns {WebhookEvent|null}
   */
  deserialize(signedToken: string): WebhookEvent | null {
    const claims = this.authenticator.decode(signedToken);
    if (!claims) {
      return null;
    }

    return new WebhookEvent(claims.event);
  }
}
