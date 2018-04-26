import * as nock from 'nock';
import {expect} from 'chai';
import {AVManager} from '../../../../src/platform/management/av-manager';
import {DestinationAcl} from '../../../../src/platform/management/job/destination';
import {PackageType} from '../../../../src/platform/management/job/packaging-specification';
import {TranscodeRequest} from '../../../../src/platform/management/requests/transcode-request';
import {Configuration} from '../../../../src/platform/configuration/configuration';
import {Authenticator} from '../../../../src/platform/authentication/authenticator';
import {HTTPClient} from '../../../../src/platform/http/http-client';
import {ExtractPosterRequest} from '../../../../src/platform/management/requests/extract-poster-request';
import {ExtractStoryboardRequest} from '../../../../src/platform/management/requests/extract-storyboard-request';
import {ExtractPosterJobResponse} from '../../../../src/platform/management/responses/extract-poster-job-response';
import {ExtractStoryboardJobResponse} from '../../../../src/platform/management/responses/extract-storyboard-job-response';
import {PackagingJobResponse} from '../../../../src/platform/management/responses/packaging-job-response';

const repliesDir = __dirname + '/replies/';

describe('AV Manager', () => {
  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const avManager = new AVManager(configuration, httpClient);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('transcodeVideo - default', async () => {
    apiServer.post('/_api/av/transcode')
      .once()
      .replyWithFile(200, repliesDir + 'transcode-response.json');

    const transcodeRequest = new TranscodeRequest({
      sources: [{
        path: '/test/file.mp4'
      }],
      specifications: [{
        destination: {
          directory: '/test/output',
          acl: DestinationAcl.PUBLIC
        },
        qualityRange: {
          minimum: '240p',
          maximum: '1440p'
        }
      }]
    });

    await avManager.transcodeVideo(transcodeRequest, (error, data) => {
      expect(data.groupId).to.equal('fb79405a16434aab87ccbd1384563033');
    });
  });

  describe('extract poster – default', () => {

    it('should call a callback', async () => {
      apiServer.post('/_api/av/poster')
        .once()
        .replyWithFile(200, repliesDir + 'extract-poster-response.json');

      const extractPosterRequest = new ExtractPosterRequest({
        sources: [{
          path: '/test/file.mp4'
        }],
        specifications: [{
          destination: {
            directory: '/test/output/',
            acl: DestinationAcl.PUBLIC
          },
          format: 'jpg',
          second: 5
        }]
      });

      await avManager.extractPoster(extractPosterRequest, (error, data) => {
        expect((data as ExtractPosterJobResponse).groupId).to.equal('31325609b28541e6afea56d0dd7649ba');
      });
    });

    it('should resolve a promise', async () => {
      apiServer.post('/_api/av/poster')
        .once()
        .replyWithFile(200, repliesDir + 'extract-poster-response.json');

      const extractPosterRequest = new ExtractPosterRequest({
        sources: [{
          path: '/test/file.mp4'
        }],
        specifications: [{
          destination: {
            directory: '/test/output/',
            acl: DestinationAcl.PUBLIC
          },
          format: 'jpg',
          second: 5
        }]
      });

      await avManager.extractPoster(extractPosterRequest)
        .then((data) => {
          expect(data.groupId).to.equal('31325609b28541e6afea56d0dd7649ba');
        });
    });
  });

  describe('extractStoryboard - default', () => {
    it('should call a callback', async () => {
      apiServer.post('/_api/av/storyboard')
        .once()
        .replyWithFile(200, repliesDir + 'extract-storyboard-response.json');

      const extractStoryboardRequest = new ExtractStoryboardRequest({
        sources: [{
          path: '/test/file.mp4'
        }],
        specifications: [{
          destination: {
            directory: '/test/output/',
            acl: DestinationAcl.PUBLIC
          },
          format: 'jpg',
          columns: 5,
          rows: 5,
          tileWidth: 100,
          tileHeight: 50
        }]
      });

      await avManager.extractStoryboard(extractStoryboardRequest, (error, data) => {
        expect((data as ExtractStoryboardJobResponse).groupId).to.equal('dd35054a57a0490aa67251777e0f9386');
      });
    });

    it('should resolve a promise', async () => {
      apiServer.post('/_api/av/storyboard')
        .once()
        .replyWithFile(200, repliesDir + 'extract-storyboard-response.json');

      const extractStoryboardRequest = new ExtractStoryboardRequest({
        sources: [{
          path: '/test/file.mp4'
        }],
        specifications: [{
          destination: {
            directory: '/test/output/',
            acl: DestinationAcl.PUBLIC
          },
          format: 'jpg',
          columns: 5,
          rows: 5,
          tileWidth: 100,
          tileHeight: 50
        }]
      });

      await avManager.extractStoryboard(extractStoryboardRequest)
        .then(data => {
          expect(data.groupId).to.equal('dd35054a57a0490aa67251777e0f9386');
        });
    });
  });

  describe('Packaging', () => {
    it('should resolve a promise', async () => {
      apiServer.post('/_api/av/package')
        .once()
        .replyWithFile(200, repliesDir + 'packaging-response.json');

      const requestParams = {
        sources: [
          {
            path: '/sample.mp4',
            name: 'sample'
          }
        ],
        directory: '/demo',
        acl: DestinationAcl.PUBLIC,
        chunkDuration: 2,
        packageType: PackageType.HLS
      };

      await avManager.packageVideo(requestParams)
        .then(data => {
          expect(data).to.deep.equal(new PackagingJobResponse({
            jobs: [
              {
                status: 'pending',
                dateCreated: '2018-04-25T13:00:54Z',
                sources: [
                  {
                    path: '/sample.mp4',
                    fileId: 'ed36df98d3bb4f60bda8062f98700a29'
                  }
                ],
                result: null,
                id: '4837a5af4a224225b1b257b17ef22237_6ef414ff3e9143c49927777a0c518c0a',
                issuer: 'urn:app:48fa9aa3e9d342a3a33e66af08cd7fe3',
                specification: {
                  destination: {
                    directory: '/demo',
                    path: '/demo/sample.4837a5af4a224225b1b257b17ef22237.m3u8',
                    acl: DestinationAcl.PUBLIC
                  },
                  chunkDuration: 2,
                  packageType: PackageType.HLS
                },
                groupId: '4837a5af4a224225b1b257b17ef22237',
                dateUpdated: '2018-04-25T13:00:54Z',
                type: 'urn:job:av.package'
              }
            ],
            groupId: '11111137a5af4a224225b1b257b17ef22237'
          }));
        });
    });
  });
});
