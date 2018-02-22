import {WebhookEvent} from './webhook-event';

/**
 * @param {Authenticator} authenticator
 * @constructor
 */
function WebhookDeserializer(authenticator) {

  /**
   * @type {Authenticator}
   */
  this.authenticator = authenticator;
}

/**
 * @param {String} signedToken
 * @returns {WebhookEvent|null}
 */
WebhookDeserializer.prototype.deserialize = function (signedToken) {
  var claims = this.authenticator.decode(signedToken);
  if (!claims) {
    return null;
  }

  return new WebhookEvent(claims.event);
};

/**
 * @type {WebhookDeserializer}
 */
export default WebhookDeserializer;
export {WebhookDeserializer};
