import { expect } from 'chai';
import * as nock from 'nock';
import * as sinon from 'sinon';

import { Authenticator } from '../../../../src/platform/authentication/authenticator';
import { Configuration } from '../../../../src/platform/configuration/configuration';
import { FileDownloader } from '../../../../src/platform/management/file-downloader';
import { SignedDownloadUrlRequest } from '../../../../src/platform/management/requests/signed-download-url-request';

describe('File Downloader', () => {
  const configuration = new Configuration(
    'wixmp-thebestever.appspot.com',
    'secret',
    'appId',
  );
  const authenticator = new Authenticator(configuration);
  const fileDownloader = new FileDownloader(configuration, authenticator);
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    nock.cleanAll();
    sandbox.verifyAndRestore();
  });

  it('should return secure download url with token', async () => {
    const testPath = '/some-kind-of/movie.mp4';
    const { downloadUrl } = fileDownloader.getSignedUrl(testPath);

    const url = new URL(downloadUrl);

    expect(url.protocol).to.equal('https:');
    expect(url.hostname).to.equal('wixmp-thebestever.wixmp.com');
    expect(url.pathname).to.equal(testPath);

    expect(url.searchParams.has('token')).to.be.true;
    const token = url.searchParams.get('token');
    const tokenPayload = authenticator.decode(token);
    expect(tokenPayload.sub).to.equal('urn:app:appId');
    expect(tokenPayload.path).to.equal(testPath);
    expect(tokenPayload.aud[0]).to.equal('urn:service:file.download');
  });

  it('should return secure download url with additional settings', () => {
    const testPath = '/some-kind-of/movie.mp4';
    const expirationRedirectUrl = 'http://www.example.com';
    const saveAs = 'myfile.mp4';

    const signedDownloadUrlRequest = new SignedDownloadUrlRequest({
      expirationRedirectUrl,
      saveAs,
    });

    const { downloadUrl } = fileDownloader.getSignedUrl(
      testPath,
      signedDownloadUrlRequest,
    );

    const url = new URL(downloadUrl);

    expect(url.protocol).to.equal('https:');
    expect(url.hostname).to.equal('wixmp-thebestever.wixmp.com');
    expect(url.pathname).to.equal(testPath);

    expect(url.searchParams.has('filename')).to.be.true;
    expect(url.searchParams.get('filename')).to.equal(saveAs);
    expect(url.searchParams.has('token')).to.be.true;

    const token = url.searchParams.get('token');
    const tokenPayload = authenticator.decode(token);

    expect(tokenPayload.sub).to.equal('urn:app:appId');
    expect(tokenPayload.aud[0]).to.equal('urn:service:file.download');
    expect(tokenPayload.path).to.equal(testPath);
    expect(tokenPayload.red).to.equal(expirationRedirectUrl);
  });
});
