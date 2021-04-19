import { expect } from 'chai';
import * as nock from 'nock';

import { Authenticator } from '../../../../src/platform/authentication/authenticator';
import { Configuration } from '../../../../src/platform/configuration/configuration';
import { HTTPClient } from '../../../../src/platform/http/http-client';
import { VisualSearchManager } from '../../../../src/platform/management/visual-search-manager';
import { IndexImageRequest } from '../../../../src/platform/management/requests/index-image-request';
import { FindSimilarImagesRequest } from '../../../../src/platform/management/requests/find-similar-images-request';

const repliesDir = __dirname + '/replies/';

describe('visualSearchManager', () => {
  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const visualSearchManager = new VisualSearchManager(configuration, httpClient);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json',
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('Index image', async () => {
    const collectionId = 'testCollectionId';
    const source = {path: '/image_for_index.png', fileId: 'e75ce7b7c1b542edade3491675731793'};

    apiServer
      .post(`/_api/visual_search/collections/${collectionId}/index`)
      .once()
      .replyWithFile(200, repliesDir + 'index-image-response.json');

    const indexImageRequest = new IndexImageRequest({source, specification: { collectionId }});

    const job = await visualSearchManager.indexImage(collectionId, indexImageRequest);

    expect(job.id).to.equal('71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f');
    expect(job.status).to.equal('pending');
  });

  it('Find similar images', async () => {
    const collectionId = 'testCollectionId';
    const imageUrl = 'https://example.com/image.png';

    apiServer
      .post(`/_api/visual_search/collections/${collectionId}/search`)
      .once()
      .replyWithFile(200, repliesDir + 'find-similar-images-response.json');

    const findSimilarImagesRequest = new FindSimilarImagesRequest({ imageUrl });

    const images = await visualSearchManager.findSimilarImages(collectionId, findSimilarImagesRequest);

    expect(images.length).to.equal(2);
  });
});
