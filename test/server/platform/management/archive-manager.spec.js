import nock from 'nock';
import {expect} from 'chai';
import {Destination} from '../../../../src/platform/management/job/destination';
import {Source} from '../../../../src/platform/management/job/source';
import {ArchiveManager} from '../../../../src/platform/management/archive-manager';
import {Configuration} from '../../../../src/platform/configuration/configuration';
import {Authenticator} from '../../../../src/platform/authentication/authenticator';
import {HTTPClient} from '../../../../src/platform/http/http-client';
import {ExtractArchiveRequest} from '../../../../src/platform/management/requests/extract-archive-request';
import {CreateArchiveRequest} from '../../../../src/platform/management/requests/create-archive-request';

var repliesDir = __dirname + '/replies/';

describe('archive manager', function () {

  var configuration = new Configuration('manager.com', 'secret', 'appId');
  var authenticator = new Authenticator(configuration);
  var httpClient = new HTTPClient(authenticator);
  var archiveManager = new ArchiveManager(configuration, httpClient);

  var apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(function () {
    nock.cleanAll();
  });

  it('create archive', function (done) {
    apiServer.post('/_api/archive/create')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'create-archive-pending-response.json');

    var createArchiveRequest = new CreateArchiveRequest();

    var source = new Source();
    source.fileId = 'archive-file';
    createArchiveRequest.addSource(source);

    var destination = new Destination();
    destination.setDirectory('/fish').setAcl('public');

    createArchiveRequest.setDestination(destination).setSources(source).setArchiveType('zip');

    archiveManager.createArchive(createArchiveRequest, function (error, data) {
      expect(data.id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
      done(error);
    });
  });

  it('extract archive', function (done) {
    apiServer.post('/_api/archive/extract')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'extract-archive-pending-response.json');

    var extractArchiveRequest = new ExtractArchiveRequest();
    var destination = new Destination();
    destination.setDirectory('/fish').setAcl('public');

    var source = new Source();
    source.fileId = 'archive-file';

    extractArchiveRequest.setDestination(destination).setSource(source);

    archiveManager.extractArchive(extractArchiveRequest, function (error, data) {
      expect(data.id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
      done(error);
    });
  });

});

