import {expect} from 'chai';
import * as fauxJax from 'faux-jax';
import * as FileAPI from 'file-api';
import * as _ from 'lodash';
import * as sinon from 'sinon';

import {FileManager} from '../../../src/platform/management/file-manager';
import {HTTPClient} from '../../../src/public/platform/http/browser-http-client';
import {FileUploader} from '../../../src/public/platform/uploader/browser-file-uploader';
import {QueuedFileUploader} from '../../../src/public/platform/uploader/queued-file-uploader';
import {UploadJob} from '../../../src/public/platform/uploader/upload-job';
import {delay} from '../../helpers/delay';

const UPLOAD_TIMEOUT = 100;


describe('queued file uploader', function () {
  // tslint:disable-next-line
  this.timeout(50000);

  const configuration = {
    domain: 'www.domain.com',
    authenticationUrl: 'https://www.myapp.com/auth'
  };
  let browserHTTPClient;
  let fileUploader;
  let queuedFileUploader: QueuedFileUploader;
  const fileUploadResponse = {
    code: 0,
    message: 'OK',
    payload: [{
      mimeType: 'text/plain',
      hash: 'd41d8cd98f00b204e9800998ecf8427e',
      parent: '/',
      dateCreated: '2017-02-20T14:23:42Z',
      path: '/place-holder.txt',
      id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
      size: 0,
      ancestors: ['/'],
      acl: 'public',
      dateUpdated: '2017-02-20T14:23:42Z',
      type: '-'
    }]
  };
  const sandbox = sinon.sandbox.create();
  let fileManager: FileManager;

  beforeEach(() => {
    fauxJax.install();
    browserHTTPClient = new HTTPClient(configuration.authenticationUrl);
    fileUploader = new FileUploader(configuration, browserHTTPClient);
    queuedFileUploader = new QueuedFileUploader(fileUploader);
    fileManager = new FileManager(configuration, browserHTTPClient, fileUploader);
  });

  afterEach(() => {
    fauxJax.restore();
    sandbox.verifyAndRestore();
  });

  it('should upload a file and report progress', async () => {
    setResponse(fileUploadResponse);

    let progress = false;

    const endPromise = new Promise((resolve) => {
      queuedFileUploader.queue.drain = () => {
        resolve();
      };
    });

    const file = new FileAPI.File('../../sources/image.jpg');
    const uploadJob = new UploadJob({
      file,
      path: '/fish/file.mp3'
    });

    uploadJob.on('upload-started', _.noop);

    uploadJob.on('upload-progress', () => {
      progress = true;
    });

    uploadJob.on('upload-error', _.noop);

    uploadJob.on('upload-success', _.noop);

    queuedFileUploader.enqueue(uploadJob);
    await endPromise;
    expect(progress).to.be.true;
  });

  it('should only be able to queue a job once', async () => {
    const consoleWarn = sandbox.stub(console, 'warn');
    setResponse(fileUploadResponse);
    const endPromise = new Promise((resolve) => {
      queuedFileUploader.queue.drain = () => {
        resolve();
      };
    });

    const file = new FileAPI.File('../files/image.jpg');
    const uploadJob = new UploadJob({
      file
    });

    uploadJob.on('upload-error', _.noop);
    uploadJob.on('upload-success', _.noop);

    queuedFileUploader.enqueue(uploadJob);
    queuedFileUploader.enqueue(uploadJob);
    expect(consoleWarn.calledOnce).to.be.true;
    expect(consoleWarn.firstCall.args[0]).to.equal('upload job already queued');
    expect(queuedFileUploader.length()).to.equal(1);
    await endPromise;
  });

  it('should abort when abort() called', async () => {
    setResponse(fileUploadResponse);
    const endPromise = new Promise((resolve) => {
      queuedFileUploader.queue.drain = () => {
        resolve();
      };
    });

    const file = new FileAPI.File('../../sources/image.jpg');
    const uploadJob = new UploadJob({
      file,
      path: '/fish/file.mp3'
    });

    const abortedSpy = sinon.spy();
    uploadJob.on('upload-aborted', abortedSpy);
    queuedFileUploader.enqueue(uploadJob);
    await delay(UPLOAD_TIMEOUT / 2);
    uploadJob.abort();
    await endPromise;
    expect(abortedSpy).to.have.been.called;
  });

  it('should upload', (done) => {
    setResponse(fileUploadResponse);
    const file = new FileAPI.File('../files/image.jpg');

    (fileManager.uploadFile('upload/to/there/image.jpg', file) as UploadJob)
      .on('upload-success', () => done())
      .on('upload-error', error => done(error));
  });

  it('should raise when abort() called, but not run yet', () => {
    setResponse(fileUploadResponse);

    const file = new FileAPI.File('../../sources/image.jpg');
    const uploadJob = new UploadJob({
      file,
      path: '/fish/file.mp3'
    });

    expect(() => uploadJob.abort()).to.throw('Job is not running');
  });

  it('handles errors', async () => {
    setResponse({error: 'fish'}, 500);
    const endPromise = new Promise((resolve) => {
      queuedFileUploader.queue.drain = () => {
        resolve();
      };
    });

    const file = new FileAPI.File('../files/file.json');

    const uploadJob = new UploadJob({
      file
    });

    uploadJob.on('upload-error', _.noop);
    uploadJob.on('upload-success', _.noop);

    queuedFileUploader.enqueue(uploadJob);
    await endPromise;
  });

  function setResponse(responseBody, responseStatus = 200) {

    fauxJax.on('request', (request) => {

      if (request.requestURL === 'https://www.myapp.com/auth') {
        request.respond(200, {'Content-Type': 'application/json'},
          JSON.stringify({
            Authorization: 'auth'
          })
        );
        return;
      }

      if (request.requestURL.indexOf('https://www.domain.com/_api/upload/url') === 0) {
        request.respond(200, {'Content-Type': 'application/json'},
          JSON.stringify({
            code: 0,
            message: 'OK',
            payload: {
              uploadUrl: 'https://www.domain.com/_api/upload',
              uploadToken: 'token'
            }
          }));
        return;
      }

      if (request.requestURL === 'https://www.domain.com/_api/upload') {
        setTimeout(() => {
          request.respond(responseStatus, {'Content-Type': 'application/json'}, JSON.stringify(responseBody));
        }, UPLOAD_TIMEOUT);

      }
    });
  }
});
