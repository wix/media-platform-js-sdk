import {PublishEndpoint} from './publish-endpoint';
import {PlaybackUrl} from './playback-url';
import {Dvr} from './dvr';

/**
 * @param data
 * @constructor
 */

class LiveStream {
  constructor(data) {
    /**
     *
     * @type {String}
     */
    this.id = null;

    /**
     * @type {PublishEndpoint}
     */
    this.publishEndpoint = null;

    /**
     * @type {Array<PlaybackUrl>}
     */
    this.playbackUrls = null;

    /**
     * @type {String}
     */
    this.streamType = null;

    /**
     * @type {int}
     */
    this.duration = null;

    /**
     * @type {int}
     */
    this.connectTimeout = null;

    /**
     * @type {int}
     */
    this.reconnectTimeout = null;

    /**
     * @type {int}
     */
    this.enforcedWidth = null;

    /**
     * @type {int}
     */
    this.enforcedHeight = null;

    /**
     * @type {int}
     */
    this.maxPublishDuration = null;

    /**
     * @type {String}
     */
    this.state = null;

    /**
     * @type {Dvr}
     */
    this.dvr = null;

    /**
     * @type {String}
     */
    this.dateCreated = null;

    /**
     * @type {String}
     */
    this.dateUpdated = null;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data) {
    this.id = data.id;

    this.publishEndpoint = new PublishEndpoint(data.publishEndpoint);

    this.playbackUrls = [];
    for (var i in data.playbackUrls) {
      this.playbackUrls.push(new PlaybackUrl(data.playbackUrls[i]));
    }

    this.streamType = data.streamType;
    this.duration = data.duration;
    this.connectTimeout = data.connectTimeout;
    this.reconnectTimeout = data.reconnectTimeout;
    this.enforcedWidth = data.enforcedWidth;
    this.enforcedHeight = data.enforcedHeight;
    this.maxPublishDuration = data.maxPublishDuration;
    this.state = data.state;
    this.dvr = new Dvr(data.dvr);
    this.dateCreated = data.dateCreated;
    this.dateUpdated = data.dateUpdated;
  }
}

/**
 * @type {LiveStream}
 */
export default LiveStream;
export {LiveStream};
