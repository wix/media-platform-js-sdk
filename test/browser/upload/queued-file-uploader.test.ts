import {expect} from 'chai';
import * as fauxJax from 'faux-jax';
import * as FileAPI from 'file-api';
import * as sinon from 'sinon';

import {FileManager} from '../../../src/platform/management/file-manager';
import {UploadFileRequest} from '../../../src/platform/management/requests/upload-file-request';
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

  const uploadToken = 'token';

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
      type: '-',
      lifecycle: null
    }]
  };
  const sandbox = sinon.createSandbox();
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

    uploadJob.on('upload-started', () => {
      // handle upload started
    });

    uploadJob.on('upload-progress', () => {
      progress = true;
    });

    uploadJob.on('upload-error', () => {
      // handle error
    });

    uploadJob.on('upload-success', () => {
      // handle success
    });

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

    uploadJob.on('upload-error', () => {
      // handle error
    });
    uploadJob.on('upload-success', () => {
      // handle success
    });

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

  describe('lifecycle(age)', () => {
    it('should upload file with default(none) lifecycle', (done) => {
      setResponse(fileUploadResponse);

      fauxJax.on('request', (request) => {
        if (request.requestURL.indexOf('https://www.domain.com/_api/upload/url') === 0) {
          expect(request.requestURL).to.equal('https://www.domain.com/_api/upload/url?acl=public&mimeType=image%2Fjpeg&path=upload%2Fto%2Fthere%2Fimage.jpg');
          return;
        }

        if (request.requestURL === 'https://www.domain.com/_api/upload') {
          expect(request.requestBody.get('acl')).to.eq('public');
          expect(request.requestBody.get('lifecycle')).to.eq(null);
          expect(request.requestBody.get('mimeType')).to.eq(null);
          expect(request.requestBody.get('path')).to.eql('upload/to/there/image.jpg');
          expect(request.requestBody.get('uploadToken')).to.eql(uploadToken);

          return;
        }
      });

      const file = new FileAPI.File('../files/image.jpg');

      (fileManager.uploadFile('upload/to/there/image.jpg', file) as UploadJob)
        .on('upload-success', () => done())
        .on('upload-error', error => done(error));
    });

    it('should upload file with delete lifecycle', (done) => {
      const uploadFileResponse = {
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
          type: '-',
          lifecycle: {
            action: 'delete',
            age: 33
          }
        }]
      };

      const fileDescriptors = [{
        mimeType: 'text/plain',
        hash: 'd41d8cd98f00b204e9800998ecf8427e',
        dateCreated: '2017-02-20T14:23:42Z',
        dateExpired: '2017-02-20T14:24:15.000Z',
        path: '/place-holder.txt',
        id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
        size: 0,
        acl: 'public',
        dateUpdated: '2017-02-20T14:23:42Z',
        type: '-',
        lifecycle: {
          action: 'delete',
          age: 33
        }
      }];

      setResponse(uploadFileResponse);

      fauxJax.on('request', (request) => {
        if (request.requestURL.indexOf('https://www.domain.com/_api/upload/url') === 0) {
          expect(request.requestURL).to.equal('https://www.domain.com/_api/upload/url?acl=public&mimeType=image%2Fjpeg&path=upload%2Fto%2Fthere%2Fimage.jpg');
          return;
        }

        if (request.requestURL === 'https://www.domain.com/_api/upload') {
          expect(request.requestBody.get('acl')).to.equal('public');
          expect(request.requestBody.get('lifecycle')).to.eq(JSON.stringify({
            action: 'delete',
            age: 33
          }));
          expect(request.requestBody.get('mimeType')).to.eq(null);
          expect(request.requestBody.get('path')).to.eql('upload/to/there/image.jpg');
          expect(request.requestBody.get('uploadToken')).to.eql(uploadToken);

          return;
        }
      });

      const file = new FileAPI.File('../files/image.jpg');
      const uploadFileRequest = new UploadFileRequest({
        age: 33
      });

      (fileManager.uploadFile('upload/to/there/image.jpg', file, uploadFileRequest) as UploadJob)
        .on('upload-success', response => {
          expect(response.response.payload).to.eql(uploadFileResponse.payload);
          expect(response.fileDescriptors).to.eql(fileDescriptors);

          return done();
        })
        .on('upload-error', error => done(error));
    });
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

    uploadJob.on('upload-error', () => {
      // handle error
    });
    uploadJob.on('upload-success', () => {
      // handle success
    });

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
              uploadToken
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
