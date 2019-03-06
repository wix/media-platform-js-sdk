import { expect } from 'chai';
import * as nock from 'nock';

import { Authenticator } from '../../../../src/platform/authentication/authenticator';
import { Configuration } from '../../../../src/platform/configuration/configuration';
import { HTTPClient } from '../../../../src/platform/http/http-client';
import { Destination } from '../../../../src/platform/management/job/destination';
import { LiveManager } from '../../../../src/platform/management/live-manager';
import { Dvr } from '../../../../src/platform/management/metadata/dvr';
import { Geo } from '../../../../src/platform/management/metadata/geo';
import { PublishEndpoint } from '../../../../src/platform/management/metadata/publish-endpoint';
import { LiveStreamListRequest } from '../../../../src/platform/management/requests/live-stream-list-request';
import { LiveStreamRequest } from '../../../../src/platform/management/requests/live-stream-request';
import {
  ACL,
  LiveStreamState,
} from '../../../../src/types/media-platform/media-platform';

const repliesDir = __dirname + '/replies/';

describe('liveManager', () => {
  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const liveManager = new LiveManager(configuration, httpClient);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json',
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('Publish Endpoint is parsing properly', done => {
    apiServer
      .get('/_api/live/stream/stream_id')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    liveManager.getStream('stream_id').then(data => {
      expect(data.publishEndpoint).to.be.an.instanceof(PublishEndpoint);
      expect(data.publishEndpoint && data.publishEndpoint.protocol).to.equal(
        'rtmp',
      );

      done();
    });
  });

  it('Analytics is parsing properly', done => {
    apiServer
      .get('/_api/live/stream/stream_id/analytics')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-analytics-response.json');

    liveManager.getStreamAnalytics('stream_id').then(data => {
      expect(data.streamId).to.equal('stream_id');
      expect(data.stats).to.be.an.instanceof(Array);

      done();
    });
  });

  it('Geo is parsing properly', done => {
    apiServer
      .get('/_api/live/stream/stream_id')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    liveManager.getStream('stream_id').then(data => {
      if (!data.publishEndpoint || !data.publishEndpoint.geo) {
        done('no geo in publishEndpoint');
        return;
      }

      expect(data.publishEndpoint.geo).to.be.an.instanceof(Geo);
      expect(data.publishEndpoint.geo.ipAddress).to.equal('127.0.0.1');

      done();
    });
  });

  it('DVR is parsing properly', done => {
    apiServer
      .get('/_api/live/stream/stream_id')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    liveManager.getStream('stream_id').then(data => {
      if (!data.dvr || !data.dvr.destination) {
        done('no destination in dvr');
        return;
      }

      expect(data.dvr).to.be.an.instanceof(Dvr);
      expect(data.dvr.destination).to.be.an.instanceof(Destination);
      expect(data.dvr.destination.path).to.equal('/live');

      done();
    });
  });

  it('Playback URL is parsing properly', done => {
    apiServer
      .get('/_api/live/stream/stream_id')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    liveManager.getStream('stream_id').then(data => {
      if (!data.playbackUrls) {
        done('no playbackUrls');
        return;
      }

      expect(data.playbackUrls.length).to.be.greaterThan(0);
      expect(data.playbackUrls[0].packageName).to.equal('hls');

      done();
    });
  });

  it('Create Live Stream', done => {
    apiServer
      .post('/_api/live/stream')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    const livestreamRequest = new LiveStreamRequest({
      protocol: 'rtmp',
      maxStreamingSec: 3600,
      geo: {
        ipAddress: '127.0.0.1',
      },
      connectTimeout: 60,
      reconnectTimeout: 60,
      dvr: {
        destination: {
          acl: ACL.PUBLIC,
          path: '/test',
        },
      },
    });

    liveManager.openStream(livestreamRequest).then(data => {
      expect(data.id).to.equal('stream_id');

      done();
    });
  });

  describe('getStream', () => {
    it('should resolve promise', done => {
      apiServer
        .get('/_api/live/stream/stream_id')
        .once()
        .replyWithFile(200, repliesDir + 'livestream-response.json');

      liveManager.getStream('stream_id').then(data => {
        expect(data.streamType).to.equal('live');

        done();
      });
    });
  });

  describe('closeStream', () => {
    it('should resolve promise', done => {
      apiServer
        .delete('/_api/live/stream/stream_id')
        .once()
        .replyWithFile(200, repliesDir + 'livestream-close-response.json');

      liveManager.closeStream('stream_id').then(() => {
        done();
      });
    });
  });

  describe('listStreams', () => {
    it('should return list of streams', done => {
      apiServer
        .get('/_api/live/streams')
        .once()
        .replyWithFile(200, repliesDir + 'livestream-list-response.json');

      const liveStreamListRequest = new LiveStreamListRequest();
      liveManager.listStreams(liveStreamListRequest).then(data => {
        if (!data || !data.streams) {
          done('no streams');
          return;
        }

        expect(data.streams.length).to.equal(3);
        expect(data.streams[0].id).to.equal('stream_id1');

        done();
      });
    });

    it('should return list of closed streams', done => {
      apiServer
        .get('/_api/live/streams?state=closed%2Cdvr_processing')
        .once()
        .replyWithFile(
          200,
          repliesDir + 'livestream-list-closed-response.json',
        );

      const liveStreamListRequest = new LiveStreamListRequest({
        state: [LiveStreamState.CLOSED, LiveStreamState.DVR_PROCESSING],
      });

      liveManager.listStreams(liveStreamListRequest).then(data => {
        if (!data || !data.streams) {
          done('no streams');
          return;
        }

        expect(data.streams.length).to.equal(3);
        expect(data.streams[0].id).to.equal('stream_id1');
        done();
      });
    });
  });

  it('Stream URL Generated successfully', done => {
    liveManager.getStreamCoverUrl('streamId').then(
      response => {
        expect(response).to.match(
          /https:\/\/.*\/_api\/live\/stream\/streamId\/frame\?Authorization=.+/,
        );
        done();
      },
      e => {
        expect(e).to.equal(null);
        done();
      },
    );
  });
});
