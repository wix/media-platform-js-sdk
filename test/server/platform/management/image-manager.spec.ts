import * as nock from 'nock';
import {expect} from 'chai';
import {FileDescriptor} from '../../../../src/platform/management/metadata/file-descriptor';
import {Image} from '../../../../src/image/image';
import {ImageManager} from '../../../../src/platform/management/image-manager';
import {ImageOperationRequest} from '../../../../src/platform/management/requests/image-operation-request';
import {Configuration} from '../../../../src/platform/configuration/configuration';
import {Authenticator} from '../../../../src/platform/authentication/authenticator';
import {HTTPClient} from '../../../../src/platform/http/http-client';
import {ACL} from '../../../../src/types/media-platform/media-platform';

const repliesDir = __dirname + '/replies/';

describe('image manager', () => {

  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const imageManager = new ImageManager(configuration, httpClient);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('perform image operation', done => {
    apiServer.post('/_api/images/operations')
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
      dateUpdated: '2017-02-20T14:23:42Z'
    });
    const command = new Image(fileDescriptor).fit(100, 200).toCommand().command as string;
    const request = new ImageOperationRequest({
      path: '/fish.png'
    }, {
      command,
      destination: {
        path: '/orig.thumb.png',
        acl: ACL.PRIVATE
      }
    });

    imageManager.imageOperation(request, (error, data) => {
      expect(data).to.deep.equal(new FileDescriptor({
        id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
        hash: 'd41d8cd98f00b204e9800998ecf8427e',
        path: '/place-holder.txt',
        mimeType: 'text/plain',
        type: '-',
        size: 0,
        acl: 'public',
        dateCreated: '2017-02-20T14:23:42Z',
        dateUpdated: '2017-02-20T14:23:42Z'
      }));
      done(error);
    });
  });
});
