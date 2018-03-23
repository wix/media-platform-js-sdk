import * as nock from 'nock';
import {expect} from 'chai';
import {TranscodeManager} from '../../../../src/platform/management/transcode-manager';
import {TranscodeRequest} from '../../../../src/platform/management/requests/transcode-request';
import {Configuration} from '../../../../src/platform/configuration/configuration';
import {Authenticator} from '../../../../src/platform/authentication/authenticator';
import {HTTPClient} from '../../../../src/platform/http/http-client';
import {Destination} from '../../../../src/platform/management/job/destination';
import {Source} from '../../../../src/platform/management/job/source';
import {TranscodeSpecification} from '../../../../src/platform/management/job/transcode-specification';
import {QualityRange} from '../../../../src/platform/management/job/quality-range';
import {ExtractStoryboardSpecification} from '../../../../src/platform/management/job/extract-storyboard-specification';
import {ExtractPosterSpecification} from '../../../../src/platform/management/job/extract-poster-specification';
import {ExtractPosterRequest} from '../../../../src/platform/management/requests/extract-poster-request';
import {ExtractStoryboardRequest} from '../../../../src/platform/management/requests/extract-storyboard-request';
import {ExtractPosterJobResponse} from '../../../../src/platform/management/responses/extract-poster-job-response';
import {ExtractStoryboardJobResponse} from '../../../../src/platform/management/responses/extract-storyboard-job-response';

const repliesDir = __dirname + '/replies/';

describe('transcode manager', function () {

  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const transcodeManager = new TranscodeManager(configuration, httpClient);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(function () {
    nock.cleanAll();
  });

  it('transcodeVideo - default', function (done) {
    apiServer.post('/_api/av/transcode')
      .once()
      .replyWithFile(200, repliesDir + 'transcode-response.json');

    const source = new Source();
    source.path = '/test/file.mp4';

    const transcodeSpecification = new TranscodeSpecification();
    transcodeSpecification.destination = new Destination()
      .setDirectory('/test/output/')
      .setAcl('public');
    transcodeSpecification.qualityRange = new QualityRange({minimum: '240p', maximum: '1440p'});

    const transcodeRequest = new TranscodeRequest()
      .addSource(source)
      .addSpecification(transcodeSpecification);

    transcodeManager.transcodeVideo(transcodeRequest, function (error, data) {
      expect(data.groupId).to.equal('fb79405a16434aab87ccbd1384563033');
      done();
    });
  });

  describe('extract poster – default', () => {

    it('should call a callback', done => {
      apiServer.post('/_api/av/poster')
        .once()
        .replyWithFile(200, repliesDir + 'extract-poster-response.json');

      const source = new Source();
      source.path = '/test/file.mp4';

      const extractPosterSpecification = new ExtractPosterSpecification();
      extractPosterSpecification.destination = new Destination()
        .setDirectory('/test/output/')
        .setAcl('public');
      extractPosterSpecification.setFormat('jpg');
      extractPosterSpecification.setSecond(5);

      const extractPosterRequest = new ExtractPosterRequest()
        .addSource(source)
        .addSpecification(extractPosterSpecification);

      transcodeManager.extractPoster(extractPosterRequest, function (error, data) {
        expect((data as ExtractPosterJobResponse).groupId).to.equal('31325609b28541e6afea56d0dd7649ba');
        done();
      });
    });

    it('should resolve a promise', () => {
      apiServer.post('/_api/av/poster')
        .once()
        .replyWithFile(200, repliesDir + 'extract-poster-response.json');

      const source = new Source();
      source.path = '/test/file.mp4';

      const extractPosterSpecification = new ExtractPosterSpecification();
      extractPosterSpecification.destination = new Destination()
        .setDirectory('/test/output/')
        .setAcl('public');
      extractPosterSpecification.setFormat('jpg');
      extractPosterSpecification.setSecond(5);

      const extractPosterRequest = new ExtractPosterRequest()
        .addSource(source)
        .addSpecification(extractPosterSpecification);

      return transcodeManager.extractPoster(extractPosterRequest)
        .then((data) => {
          expect(data.groupId).to.equal('31325609b28541e6afea56d0dd7649ba');
        });
    });
  });

  describe('extractStoryboard - default', () => {
    it('should call a callback', done => {
      apiServer.post('/_api/av/storyboard')
        .once()
        .replyWithFile(200, repliesDir + 'extract-storyboard-response.json');

      const source = new Source();
      source.path = '/test/file.mp4';

      const extractStoryboardSpecification = new ExtractStoryboardSpecification();
      extractStoryboardSpecification.destination = new Destination()
        .setDirectory('/test/output/')
        .setAcl('public');
      extractStoryboardSpecification.setFormat('jpg');
      extractStoryboardSpecification.setColumns(5);
      extractStoryboardSpecification.setRows(5);
      extractStoryboardSpecification.setTileWidth(100);
      extractStoryboardSpecification.setTileHeight(50);

      const extractStoryboardRequest = new ExtractStoryboardRequest()
        .addSource(source)
        .addSpecification(extractStoryboardSpecification);

      transcodeManager.extractStoryboard(extractStoryboardRequest, function (error, data) {
        expect((data as ExtractStoryboardJobResponse).groupId).to.equal('dd35054a57a0490aa67251777e0f9386');
        done();
      });
    });

    it('should resolve a promise', () => {
      apiServer.post('/_api/av/storyboard')
        .once()
        .replyWithFile(200, repliesDir + 'extract-storyboard-response.json');

      const source = new Source();
      source.path = '/test/file.mp4';

      const extractStoryboardSpecification = new ExtractStoryboardSpecification();
      extractStoryboardSpecification.destination = new Destination()
        .setDirectory('/test/output/')
        .setAcl('public');
      extractStoryboardSpecification.setFormat('jpg');
      extractStoryboardSpecification.setColumns(5);
      extractStoryboardSpecification.setRows(5);
      extractStoryboardSpecification.setTileWidth(100);
      extractStoryboardSpecification.setTileHeight(50);

      const extractStoryboardRequest = new ExtractStoryboardRequest()
        .addSource(source)
        .addSpecification(extractStoryboardSpecification);

      return transcodeManager.extractStoryboard(extractStoryboardRequest)
        .then(data => {
          expect(data.groupId).to.equal('dd35054a57a0490aa67251777e0f9386');
        });
    });
  });
});
