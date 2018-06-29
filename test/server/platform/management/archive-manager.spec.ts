import nock from 'nock';
import sinon from 'sinon';
import path from 'path';
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
  const sandbox = sinon.sandbox.create();

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(() => {
    nock.cleanAll();
    sandbox.verifyAndRestore();
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

  it('should create archive observable', (done) => {
    apiServer.post('/_api/archive/create')
      .once()
      .query(true)
      .replyWithFile(200, path.join(repliesDir, 'create-archive-pending-response.json'));

    apiServer.get('/_api/jobs/6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b')
      .once()
      .replyWithFile(200, path.join(repliesDir, 'create-archive-success-response.json'));

    const progressSpy = sandbox.spy();
    archiveManager
      .createArchiveObservable({
        destination: {
          directory: '/fish',
          acl: ACL.PUBLIC
        },
        sources: [{
          fileId: 'archive-file'
        }],
        archiveType: 'zip'
      })
      .subscribe(progressSpy, done, () => {
        expect(progressSpy).to.have.been.calledTwice;
        expect(progressSpy.firstCall.args[0].id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
        expect(progressSpy.firstCall.args[0].status).to.equal('pending');
        expect(progressSpy.secondCall.args[0].id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
        expect(progressSpy.secondCall.args[0].status).to.equal('success');
        done();
      });
  });

  it('should create archive observable error', (done) => {
    apiServer.post('/_api/archive/create')
      .once()
      .query(true)
      .replyWithFile(200, path.join(repliesDir, 'create-archive-pending-response.json'));

    apiServer.get('/_api/jobs/6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b')
      .once()
      .replyWithFile(200, path.join(repliesDir, 'create-archive-error-response.json'));

    const progressSpy = sandbox.spy();
    archiveManager
      .createArchiveObservable({
        destination: {
          directory: '/fish',
          acl: ACL.PUBLIC
        },
        sources: [{
          fileId: 'archive-file'
        }],
        archiveType: 'zip'
      })
      .subscribe(progressSpy, (error) => {
        expect(progressSpy).to.have.been.calledOnce;
        expect(progressSpy.firstCall.args[0].id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
        expect(progressSpy.firstCall.args[0].status).to.equal('pending');
        expect(error.id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
        expect(error.status).to.equal('error');
        done();
      }, done);
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

  it('should extract archive observable', (done) => {
    apiServer.post('/_api/archive/extract')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'extract-archive-pending-response.json');

    apiServer.get('/_api/jobs/6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b')
      .once()
      .replyWithFile(200, path.join(repliesDir, 'extract-archive-success-response.json'));

    const progressSpy = sandbox.spy();
    archiveManager
      .extractArchiveObservable({
        source: {
          fileId: 'archive-file'
        },
        destination: {
          directory: '/fish',
          acl: ACL.PUBLIC
        }
      })
      .subscribe(progressSpy, done, () => {
        expect(progressSpy).to.have.been.calledTwice;
        expect(progressSpy.firstCall.args[0].id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
        expect(progressSpy.firstCall.args[0].status).to.equal('pending');
        expect(progressSpy.secondCall.args[0].id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
        expect(progressSpy.secondCall.args[0].status).to.equal('success');
        done();
      });
  });
  it('should extract archive observable error', (done) => {
    apiServer.post('/_api/archive/extract')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'extract-archive-pending-response.json');

    apiServer.get('/_api/jobs/6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b')
      .once()
      .replyWithFile(200, path.join(repliesDir, 'extract-archive-error-response.json'));

    const progressSpy = sandbox.spy();
    archiveManager
      .extractArchiveObservable({
        source: {
          fileId: 'archive-file'
        },
        destination: {
          directory: '/fish',
          acl: ACL.PUBLIC
        }
      })
      .subscribe(progressSpy, (error) => {
        expect(progressSpy).to.have.been.calledOnce;
        expect(progressSpy.firstCall.args[0].id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
        expect(progressSpy.firstCall.args[0].status).to.equal('pending');
        expect(error.id).to.equal('6b4da966844d4ae09417300f3811849b_dd0ecc5cbaba4f1b9aba08cc6fa7348b');
        expect(error.status).to.equal('error');
        done();
      }, done);
  });
});
