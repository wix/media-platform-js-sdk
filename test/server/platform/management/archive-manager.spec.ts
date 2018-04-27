import * as nock from 'nock';
import {expect} from 'chai';
import {ArchiveManager} from '../../../../src/platform/management/archive-manager';
import {Configuration} from '../../../../src/platform/configuration/configuration';
import {Authenticator} from '../../../../src/platform/authentication/authenticator';
import {HTTPClient} from '../../../../src/platform/http/http-client';
import {CreateArchiveSpecification} from '../../../../src/platform/management/job/create-archive-specification';
import {ExtractArchiveSpecification} from '../../../../src/platform/management/job/extract-archive-specification';
import {ExtractArchiveRequest} from '../../../../src/platform/management/requests/extract-archive-request';
import {CreateArchiveRequest} from '../../../../src/platform/management/requests/create-archive-request';
import {Job} from '../../../../src/platform/management/job/job';
import {ACL} from '../../../../src/types/media-platform/media-platform';

const repliesDir = __dirname + '/replies/';

describe('archive manager', () => {

  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const archiveManager = new ArchiveManager(configuration, httpClient);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('create archive', (done) => {
    apiServer.post('/_api/archive/create')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'create-archive-pending-response.json');

    const createArchiveRequest = new CreateArchiveRequest({
      destination: {
        directory: '/fish',
        acl: ACL.PUBLIC
      },
      sources: [{
        fileId: 'archive-file'
      }],
      archiveType: 'zip'
    });

    archiveManager.createArchive(createArchiveRequest, (error, job) => {
      expect((job as Job<CreateArchiveSpecification>).id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
      done(error);
    });
  });

  it('extract archive', done => {
    apiServer.post('/_api/archive/extract')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'extract-archive-pending-response.json');

    const extractArchiveRequest = new ExtractArchiveRequest({
      source: {
        fileId: 'archive-file'
      },
      destination: {
        directory: '/fish',
        acl: ACL.PUBLIC
      }
    });

    archiveManager.extractArchive(extractArchiveRequest, (error, job) => {
      expect((job as Job<ExtractArchiveSpecification>).id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
      done(error);
    });
  });

});
