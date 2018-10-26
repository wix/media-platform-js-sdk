import {expect} from 'chai';
import * as fauxJax from 'faux-jax';
import * as sinon from 'sinon';

import {DownloadUrlRequest} from '../../../src/platform/management/requests/download-url-request';
import {FileDownloader} from '../../../src/public/platform/downloader/browser-file-downloader';
import {HTTPClient} from '../../../src/public/platform/http/browser-http-client';


describe('FileDownloader', () => {
  const configuration = {
    domain: 'www.domain.com',
    authenticationUrl: 'https://www.myapp.com/auth'
  };

  let browserHTTPClient;
  let fileDownloader;

  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    fauxJax.install();

    browserHTTPClient = new HTTPClient(configuration.authenticationUrl);
    fileDownloader = new FileDownloader(configuration, browserHTTPClient);
  });

  afterEach(() => {
    fauxJax.restore();

    sandbox.verifyAndRestore();
  });

  it('should download a file', async () => {
    setResponses({
      code: 0,
      message: 'OK',
      payload: {
        downloadUrl: 'download-url'
      }
    });

    fauxJax.on('request', (request) => {
      if (request.requestURL.indexOf('https://www.domain.com/_api/download/secure_url') === 0) {
        expect(request.requestURL).to.be.eql('https://www.domain.com/_api/download/secure_url?path=%2Fimg1.jpg');
      }
    });

    const downloadUrl = await fileDownloader.getDownloadUrl('/img1.jpg');

    expect(downloadUrl.downloadUrl).to.be.eql('download-url');
  });

  it('should download a file with `downloadUrlRequest` params', async () => {
    setResponses({
      code: 0,
      message: 'OK',
      payload: {
        downloadUrl: 'url-with-params'
      }
    });

    fauxJax.on('request', (request) => {
      if (request.requestURL.indexOf('https://www.domain.com/_api/download/secure_url') === 0) {
        expect(request.requestURL).to.be.eql('https://www.domain.com/_api/download/secure_url?path=%2Fimg2.jpg&saveAs=save-as-name&expirationRedirectUrl=redirect-link&expiry=357');
      }
    });

    const downloadUrlRequest = new DownloadUrlRequest({
      expirationRedirectUrl: 'redirect-link',
      expiry: 357,
      saveAs: 'save-as-name',
    });

    const downloadUrl = await fileDownloader.getDownloadUrl('/img2.jpg', downloadUrlRequest);

    expect(downloadUrl.downloadUrl).to.be.eql('url-with-params');
  });

  function setResponses(response) {
    fauxJax.on('request', (request) => {
      if (request.requestURL === 'https://www.myapp.com/auth') {
        request.respond(200, {'Content-Type': 'application/json'},
          JSON.stringify({
            Authorization: 'auth'
          })
        );
        return;
      }

      if (request.requestURL.indexOf('https://www.domain.com/_api/download/secure_url') === 0) {
        setTimeout(() => {
          request.respond(
            200,
            {'Content-Type': 'application/json'},
            JSON.stringify(response)
          );
        }, 100);
      }
    });
  }
});
