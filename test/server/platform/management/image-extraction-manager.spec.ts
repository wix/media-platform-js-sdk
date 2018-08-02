import * as nock from 'nock';
import {expect} from 'chai';
import {ImageExtractionManager} from '../../../../src/platform/management/image-extraction-manager';
import {Configuration} from '../../../../src/platform/configuration/configuration';
import {Authenticator} from '../../../../src/platform/authentication/authenticator';
import {HTTPClient} from '../../../../src/platform/http/http-client';
import {Likelihood} from '../../../../src/platform/management/metadata/explicit-content';
import {
  IImageExtractionResponse,
  ImageExtractionResponse
} from '../../../../src/platform/management/responses/image-extraction-response';

const repliesDir = __dirname + '/replies/';

describe('Image extraction manager', () => {

  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const imageExtractionManager = new ImageExtractionManager(configuration, httpClient);
  const extractImageResponse = {
    colors: [
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
        likelihood: Likelihood.VERY_UNLIKELY,
        name: 'medical'
      }
    ],
    faces: []
  };

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(() => {
    nock.cleanAll();
  });


  describe('image extraction by id', () => {
    it('should extract image and call callback function with extracted data', async () => {
      apiServer.get('/_api/images/features')
        .once()
        .query({
          fileId: 'fileId',
          features: 'colors,labels,explicit_content,faces'
        })
        .replyWithFile(200, repliesDir + 'image-extraction.response.json');

      await imageExtractionManager.extractImageById('fileId', [], (error, data: IImageExtractionResponse) => {
        expect(data).to.be.deep.equal(new ImageExtractionResponse(extractImageResponse));
      });
    });

    it('should extract image and return promise with extracted data', async () => {
      apiServer.get('/_api/images/features')
        .once()
        .query({
          fileId: 'fileId',
          features: 'colors,labels,explicit_content,faces'
        })
        .replyWithFile(200, repliesDir + 'image-extraction.response.json');

      await imageExtractionManager.extractImageById('fileId')
        .then((data: IImageExtractionResponse) => {
        expect(data).to.be.deep.equal(new ImageExtractionResponse(extractImageResponse));
      });
    });
  });

  describe('image extraction by path', () => {
    it('should extract image and call callback function with extracted data', async () => {
      apiServer.get('/_api/images/features')
        .once()
        .query({
          path: 'path',
          features: 'colors,labels,explicit_content,faces'
        })
        .replyWithFile(200, repliesDir + 'image-extraction.response.json');

      await imageExtractionManager.extractImageByFilePath('path', [], (error, data: IImageExtractionResponse) => {
        expect(data).to.be.deep.equal(new ImageExtractionResponse(extractImageResponse));
      });
    });

    it('should extract image and return promise with extracted data', async () => {
      apiServer.get('/_api/images/features')
        .once()
        .query({
          path: 'path',
          features: 'colors,labels,explicit_content,faces'
        })
        .replyWithFile(200, repliesDir + 'image-extraction.response.json');

      await imageExtractionManager.extractImageByFilePath('path', []).then((data: IImageExtractionResponse) => {
        expect(data).to.be.deep.equal(new ImageExtractionResponse(extractImageResponse));
      });
    });
  });
});

