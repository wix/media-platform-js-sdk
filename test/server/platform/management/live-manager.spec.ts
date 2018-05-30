import * as nock from 'nock';
import {expect} from 'chai';
import {LiveManager} from '../../../../src/platform/management/live-manager';
import {LivestreamRequest} from '../../../../src/platform/management/requests/livestream-request';
import {Configuration} from '../../../../src/platform/configuration/configuration';
import {Authenticator} from '../../../../src/platform/authentication/authenticator';
import {HTTPClient} from '../../../../src/platform/http/http-client';
import {Destination} from '../../../../src/platform/management/job/destination';
import {PublishEndpoint} from '../../../../src/platform/management/metadata/publish-endpoint';
import {Dvr} from '../../../../src/platform/management/metadata/dvr';
import {Geo} from '../../../../src/platform/management/metadata/geo';
import {ACL} from '../../../../src/types/media-platform/media-platform';

const repliesDir = __dirname + '/replies/';

describe('live manager', () => {

  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const liveManager = new LiveManager(configuration, httpClient);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('Publish Endpoint is parsing properly', done => {
    apiServer.get('/_api/live/stream/stream_id')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    liveManager.getStream('stream_id', (error, data) => {
      expect(data.publishEndpoint).to.be.an.instanceof(PublishEndpoint);
      expect(data.publishEndpoint.protocol).to.equal('rtmp');

      done();
    });
  });

  it('Geo is parsing properly', done => {
    apiServer.get('/_api/live/stream/stream_id')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    liveManager.getStream('stream_id', (error, data) => {
      expect(data.publishEndpoint.geo).to.be.an.instanceof(Geo);
      expect(data.publishEndpoint.geo.ipAddress).to.equal('127.0.0.1');

      done();
    });
  });

  it('DVR is parsing properly', done => {
    apiServer.get('/_api/live/stream/stream_id')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    liveManager.getStream('stream_id', (error, data) => {
      expect(data.dvr).to.be.an.instanceof(Dvr);
      expect(data.dvr.destination).to.be.an.instanceof(Destination);
      expect(data.dvr.destination.path).to.equal('/live');

      done();
    });
  });

  it('Playback URL is parsing properly', done => {
    apiServer.get('/_api/live/stream/stream_id')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    liveManager.getStream('stream_id', (error, data) => {
      expect(data.playbackUrls.length).to.be.greaterThan(0);
      expect(data.playbackUrls[0].packageName).to.equal('hls');

      done();
    });
  });

  it('Create Live Stream', done => {
    apiServer.post('/_api/live/stream')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    const livestreamRequest = new LivestreamRequest({
      protocol: 'rtmp',
      maxStreamingSec: 3600,
      geo: {
        ipAddress: '127.0.0.1'
      },
      connectTimeout: 60,
      reconnectTimeout: 60,
      dvr: {
        destination: {
          acl: ACL.PUBLIC,
          path: '/test'
        }
      }
    });

    liveManager.openStream(livestreamRequest, (error, data) => {
      expect(data.id).to.equal('stream_id');
      done();
    });
  });

  it('Get Live Stream', done => {
    apiServer.get('/_api/live/stream/stream_id')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-response.json');

    liveManager.getStream('stream_id', (error, data) => {
      expect(data.streamType).to.equal('live');
      done();
    });
  });

  it('Close Live Stream', done => {
    apiServer.delete('/_api/live/stream/stream_id')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-close-response.json');

    liveManager.closeStream('stream_id', (error, data) => {
      expect(data.message).to.equal('OK');
      done();
    });
  });

  it('List streams', done => {
    apiServer.get('/_api/live/list_streams')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-list-response.json');

    liveManager.listStreams((error, data) => {
      expect(data.length).to.equal(3);
      expect(data[0].id).to.equal('stream_id1');
      done();
    });
  });

  it('List closed streams', done => {
    apiServer.get('/_api/live/list_streams?closed=1')
      .once()
      .replyWithFile(200, repliesDir + 'livestream-list-closed-response.json');

    liveManager.listClosedStreams((error, data) => {
      expect(data.length).to.equal(3);
      expect(data[0].id).to.equal('stream_id1');
      done();
    });
  });
});
