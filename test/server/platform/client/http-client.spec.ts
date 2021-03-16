import { expect } from 'chai';
import * as nock from 'nock';

import { Authenticator } from '../../../../src/platform/authentication/authenticator';
import { Configuration } from '../../../../src/platform/configuration/configuration';
import { HTTPClient } from '../../../../src/platform/http/http-client';
import { VisualSearchManager } from '../../../../src/platform/management/visual-search-manager';
import { FindSimilarImagesRequest } from '../../../../src/platform/management/requests/find-similar-images-request';

const repliesDir = __dirname + '/../management/replies/';

describe('HTTP client', () => {
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

  it('should retry on failed http request', async () => {
    const collectionId = 'testCollectionId';
    const imageUrl = 'https://example.com/image.png';

    apiServer
      .post(`/_api/visual_search/collections/${collectionId}/search`)
      .reply(502, 'Connection error');

    apiServer
      .post(`/_api/visual_search/collections/${collectionId}/search`)
      .replyWithFile(200, repliesDir + 'find-similar-images-response.json');

    const findSimilarImagesRequest = new FindSimilarImagesRequest({ imageUrl });

    const images = await visualSearchManager.findSimilarImages(collectionId, findSimilarImagesRequest);

    expect(images.length).to.equal(2);
  });
});
