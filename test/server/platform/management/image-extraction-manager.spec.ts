import * as nock from 'nock';
import {expect} from 'chai';
import { ImageExtractionManager } from '../../../../src/platform/management/image-extraction-manager';
import {Configuration} from '../../../../src/platform/configuration/configuration';
import {Authenticator} from '../../../../src/platform/authentication/authenticator';
import {HTTPClient} from '../../../../src/platform/http/http-client';
import {
  IImageExtractionResponse,
  ImageExtractionResponse
} from '../../../../src/platform/management/responses/image-extraction-response';

const repliesDir = __dirname + '/replies/';

describe('image extraction manager', function () {

  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const imageExtractionManager = new ImageExtractionManager(configuration, httpClient);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it.only('perform image extraction by id', (done) => {
    apiServer.get('/_api/images/features')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'image-extraction.response.json');

    imageExtractionManager.extractImageById('1', null, (error, data: IImageExtractionResponse) => {
      expect(data).to.be.deep.equal(new ImageExtractionResponse({
        colors:[
          {
            pixelFraction: 0.11535452,
            r: 186,
            b: 184,
            score: 0.45849127000000001,
            g: 189
          }
        ],
        labels: [
          {
            score: 0.86025850000000004,
            name: 'head'
          }
        ],
        explicitContent: [
          {
            likelihood: 'VERY_UNLIKELY',
            name: 'medical'
          }
        ],
        faces: []
      }));
    })
  });

  it('perform image extraction by path', () => {
    apiServer.get('/_api/images/features')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'image-extraction.response.json');

    imageExtractionManager.extractImageByFilePath('1', null, (error, data: IImageExtractionResponse) => {
      expect(data).to.be.deep.equal(new ImageExtractionResponse({
        colors:[
          {
            pixelFraction: 0.11535452,
            r: 186,
            b: 184,
            score: 0.45849127000000001,
            g: 189
          }
        ],
        labels: [
          {
            score: 0.86025850000000004,
            name: 'head'
          }
        ],
        explicitContent: [
          {
            likelihood: 'VERY_UNLIKELY',
            name: 'medical'
          }
        ],
        faces: []
      }));
    })
  });
});

