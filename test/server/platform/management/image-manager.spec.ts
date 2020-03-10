import { expect } from 'chai';
import * as nock from 'nock';

import { Image } from '../../../../src/image/image';
import { Authenticator } from '../../../../src/platform/authentication/authenticator';
import { Configuration } from '../../../../src/platform/configuration/configuration';
import { HTTPClient } from '../../../../src/platform/http/http-client';
import { ImageManager } from '../../../../src/platform/management/image-manager';
import { FileDescriptor } from '../../../../src/platform/management/metadata/file-descriptor';
import { ImageOperationRequest } from '../../../../src/platform/management/requests/image-operation-request';
import { ACL } from '../../../../src/types/media-platform/media-platform';
import { ImageWatermarkPosition } from '../../../../src/platform/management/job/image-watermark-specification';
import { WatermarkManifest } from '../../../../src/platform/management/metadata/watermark-manifest';
import { Policy } from '../../../../src/image/token/policy';
import { Gravity, Watermark } from '../../../../src/image/watermark';
import { ImageToken } from '../../../../src/image/token/image-token';

const repliesDir = __dirname + '/replies/';

describe('image manager', () => {
  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const imageManager = new ImageManager(
    configuration,
    httpClient,
    authenticator,
  );

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json',
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('perform image operation', done => {
    apiServer
      .post('/_api/images/operations')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'file-descriptor-response.json');

    const fileDescriptor = new FileDescriptor({
      id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
      hash: 'd41d8cd98f00b204e9800998ecf8427e',
      path: '/orig.png',
      mimeType: 'image/png',
      type: '-',
      size: 0,
      acl: 'private',
      dateCreated: '2017-02-20T14:23:42Z',
      dateUpdated: '2017-02-20T14:23:42Z',
    });

    const command = new Image(fileDescriptor).fit(100, 200).toCommand()
      .command as string;

    const request = new ImageOperationRequest({
      source: {
        path: '/fish.png',
      },
      specification: {
        command,
        destination: {
          path: '/orig.thumb.png',
          acl: ACL.PRIVATE,
        },
      },
    });

    imageManager.imageOperation(request).then(data => {
      expect(data).to.deep.equal(
        new FileDescriptor({
          id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
          hash: 'd41d8cd98f00b204e9800998ecf8427e',
          path: '/place-holder.txt',
          mimeType: 'text/plain',
          type: '-',
          size: 0,
          acl: 'public',
          dateCreated: '2017-02-20T14:23:42Z',
          dateUpdated: '2017-02-20T14:23:42Z',
        }),
      );

      done();
    });
  });

  it('perform watermark manifest request', done => {
    apiServer
      .post('/_api/images/watermark')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'image-watermark.json');

    const request = {
      source: {
        path: '/fish.png',
      },
      specification: {
        opacity: 50,
        position: ImageWatermarkPosition.NORTH,
        scale: 1,
        watermark: {
          path: '/watermark.png',
        },
      },
    };

    // tslint:disable-next-line
    imageManager.createWatermarkManifest(request).then(data => {
      expect(data).to.deep.equal(
        new WatermarkManifest({
          id: 'd252b7d2561e4e79bb79c9b18252cde3',
        }),
      );
      done();
    });
  });

  it('new image token', async () => {
    const imageToken = imageManager.newImageToken();
    const claims = imageToken.toClaims();
    expect(claims.aud).to.deep.equal(['urn:service:image.operations']);
    expect(claims.sub).to.equal('urn:app:appId');
    expect(claims.iss).to.equal('urn:app:appId');
  });

  it('image token exception if authenticator is null (in browser)', async () => {
    const imageManager = new ImageManager(configuration, httpClient);

    try {
      imageManager.newImageToken();
      expect(false).to.equal(true);
    } catch (e) {
      expect(e.message).to.equal(
        'image tokens are not supported in the browser',
      );
    }
  });

  it('sign token should sign an image token', async () => {
    const policy = new Policy(1000, 1500, '/path/to/image.jpg');
    const watermark = new Watermark('/path/to/mark.png', 30, 20, Gravity.SOUTH);

    const imageToken = new ImageToken({ policy, watermark });

    const signed = imageManager.signToken(imageToken);
    expect(signed).to.not.equal(null);
  });

  it('sign token exception if authenticator is null (in browser)', async () => {
    const imageManager = new ImageManager(configuration, httpClient);
    const policy = new Policy(1000, 1500, '/path/to/image.jpg');
    const watermark = new Watermark('/path/to/mark.png', 30, 20, Gravity.SOUTH);

    const imageToken = new ImageToken({ policy, watermark });

    try {
      const signed = imageManager.signToken(imageToken);
      expect(false).to.equal(true);
    } catch (e) {
      expect(e.message).to.equal(
        'image tokens are not supported in the browser',
      );
    }
  });
});
