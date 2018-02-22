import nock from 'nock';
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

var repliesDir = __dirname + '/replies/';

describe('transcode manager', function () {

  var configuration = new Configuration('manager.com', 'secret', 'appId');
  var authenticator = new Authenticator(configuration);
  var httpClient = new HTTPClient(authenticator);
  var transcodeManager = new TranscodeManager(configuration, httpClient);

  var apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(function () {
    nock.cleanAll();
  });

  it('transcodeVideo - default', function (done) {
    apiServer.post('/_api/av/transcode')
      .once()
      .replyWithFile(200, repliesDir + 'transcode-response.json');

    var source = new Source();
    source.path = '/test/file.mp4';

    var transcodeSpecification = new TranscodeSpecification();
    transcodeSpecification.destination = new Destination()
      .setDirectory('/test/output/')
      .setAcl('public');
    transcodeSpecification.qualityRange = new QualityRange({minimum: '240p', maximum: '1440p'});

    var transcodeRequest = new TranscodeRequest()
      .addSource(source)
      .addSpecification(transcodeSpecification);

    transcodeManager.transcodeVideo(transcodeRequest, function (error, data) {
      expect(data.groupId).to.equal('fb79405a16434aab87ccbd1384563033');
      done();
    });
  });
});
