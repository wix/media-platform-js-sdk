import { expect } from 'chai';
import * as nock from 'nock';
import * as path from 'path';
import * as sinon from 'sinon';

import { Authenticator } from '../../../../src/platform/authentication/authenticator';
import { Configuration } from '../../../../src/platform/configuration/configuration';
import { HTTPClient } from '../../../../src/platform/http/http-client';
import { AVManager } from '../../../../src/platform/management/av-manager';
import { JobStatus } from '../../../../src/platform/management/job/job';
import { PackageType } from '../../../../src/platform/management/job/packaging-specification';
import { ExtractPosterRequest } from '../../../../src/platform/management/requests/extract-poster-request';
import { ExtractStoryboardRequest } from '../../../../src/platform/management/requests/extract-storyboard-request';
import { TranscodeRequest } from '../../../../src/platform/management/requests/transcode-request';
import { ExtractPosterJobResponse } from '../../../../src/platform/management/responses/extract-poster-job-response';
import { ExtractStoryboardJobResponse } from '../../../../src/platform/management/responses/extract-storyboard-job-response';
import { PackagingJobResponse } from '../../../../src/platform/management/responses/packaging-job-response';
import { ACL } from '../../../../src/types/media-platform/media-platform';

const repliesDir = __dirname + '/replies/';

describe('AV Manager', () => {
  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const avManager = new AVManager(configuration, httpClient);
  const sandbox = sinon.createSandbox();

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json',
  });

  afterEach(() => {
    nock.cleanAll();
    sandbox.verifyAndRestore();
  });

  describe('transcodeVideo', () => {
    it('should resolve promise', async () => {
      apiServer
        .post('/_api/av/transcode')
        .once()
        .replyWithFile(200, repliesDir + 'transcode-pending-response.json');

      const transcodeRequest = new TranscodeRequest({
        sources: [
          {
            path: '/test/file.mp4',
          },
        ],
        specifications: [
          {
            destination: {
              directory: '/test/output',
              acl: ACL.PUBLIC,
            },
            qualityRange: {
              minimum: '240p',
              maximum: '1440p',
            },
          },
        ],
      });

      await avManager.transcodeVideo(transcodeRequest).then(data => {
        expect(data.groupId).to.equal('fb79405a16434aab87ccbd1384563033');
      });
    });
  });

  describe('transcodeVideoObservable', () => {
    it('should emit with pending and success statuses', done => {
      apiServer
        .post('/_api/av/transcode')
        .once()
        .replyWithFile(
          200,
          path.join(repliesDir, 'transcode-pending-response.json'),
        );

      apiServer
        .get('/_api/jobs/groups/fb79405a16434aab87ccbd1384563033')
        .once()
        .replyWithFile(
          200,
          path.join(repliesDir, 'transcode-success-response.json'),
        );

      const transcodeRequest = new TranscodeRequest({
        sources: [
          {
            path: '/test/file.mp4',
          },
        ],
        specifications: [
          {
            destination: {
              directory: '/test/output',
              acl: ACL.PUBLIC,
            },
            qualityRange: {
              minimum: '240p',
              maximum: '1440p',
            },
          },
        ],
      });

      const progressSpy = sandbox.spy();
      avManager
        .transcodeVideoObservable(transcodeRequest)
        .subscribe(progressSpy, done, () => {
          expect(progressSpy).to.have.been.calledTwice;
          expect(progressSpy.firstCall.args[0].jobs[0].id).to.equal(
            'fb79405a16434aab87ccbd1384563033_ae7ae8a47b114f45b8a75f53723e53dc',
          );
          expect(progressSpy.firstCall.args[0].jobs[0].status).to.equal(
            'pending',
          );
          expect(progressSpy.secondCall.args[0].jobs[0].id).to.equal(
            'fb79405a16434aab87ccbd1384563033_ae7ae8a47b114f45b8a75f53723e53dc',
          );
          expect(progressSpy.secondCall.args[0].jobs[0].status).to.equal(
            'success',
          );
          done();
        });
    });
  });

  it('should transcode video observable error', done => {
    apiServer
      .post('/_api/av/transcode')
      .once()
      .replyWithFile(
        200,
        path.join(repliesDir, 'transcode-pending-response.json'),
      );

    apiServer
      .get('/_api/jobs/groups/fb79405a16434aab87ccbd1384563033')
      .once()
      .replyWithFile(
        200,
        path.join(repliesDir, 'transcode-error-response.json'),
      );

    const transcodeRequest = new TranscodeRequest({
      sources: [
        {
          path: '/test/file.mp4',
        },
      ],
      specifications: [
        {
          destination: {
            directory: '/test/output',
            acl: ACL.PUBLIC,
          },
          qualityRange: {
            minimum: '240p',
            maximum: '1440p',
          },
        },
      ],
    });

    const progressSpy = sandbox.spy();
    avManager.transcodeVideoObservable(transcodeRequest).subscribe(
      progressSpy,
      error => {
        expect(progressSpy).to.have.been.calledOnce;
        expect(progressSpy.firstCall.args[0].jobs[0].id).to.equal(
          'fb79405a16434aab87ccbd1384563033_ae7ae8a47b114f45b8a75f53723e53dc',
        );
        expect(progressSpy.firstCall.args[0].jobs[0].status).to.equal(
          'pending',
        );
        expect(error.jobs[1].id).to.equal(
          'fb79405a16434aab87ccbd1384563033_e20cde4ae73e4c4098534d8136e17324',
        );
        expect(error.jobs[1].status).to.equal('error');
        done();
      },
      done,
    );
  });

  describe('extract poster – default', () => {
    it('should resolve a promise', async () => {
      apiServer
        .post('/_api/av/poster')
        .once()
        .replyWithFile(200, repliesDir + 'extract-poster-response.json');

      const extractPosterRequest = new ExtractPosterRequest({
        sources: [
          {
            path: '/test/file.mp4',
          },
        ],
        specifications: [
          {
            destination: {
              acl: ACL.PUBLIC,
              directory: '/test/output/',
            },
            format: 'jpg',
            second: 5,
          },
        ],
      });

      await avManager
        .extractPoster(extractPosterRequest)
        .then((data: ExtractPosterJobResponse) => {
          expect(data.groupId).to.equal('31325609b28541e6afea56d0dd7649ba');
        });
    });
  });

  describe('extractStoryboard', () => {
    it('should resolve a promise', async () => {
      apiServer
        .post('/_api/av/storyboard')
        .once()
        .replyWithFile(200, repliesDir + 'extract-storyboard-response.json');

      const extractStoryboardRequest = new ExtractStoryboardRequest({
        sources: [
          {
            path: '/test/file.mp4',
          },
        ],
        specifications: [
          {
            destination: {
              acl: ACL.PUBLIC,
              directory: '/test/output/',
            },
            format: 'jpg',
            columns: 5,
            rows: 5,
            tileWidth: 100,
            tileHeight: 50,
          },
        ],
      });

      await avManager
        .extractStoryboard(extractStoryboardRequest)
        .then((data: ExtractStoryboardJobResponse) => {
          expect(data.groupId).to.equal('dd35054a57a0490aa67251777e0f9386');
        });
    });
  });

  describe('Packaging', () => {
    it('should resolve a promise', async () => {
      apiServer
        .post('/_api/av/package')
        .once()
        .replyWithFile(200, repliesDir + 'packaging-response.json');

      const requestParams = {
        sources: [
          {
            path: '/sample.mp4',
            name: 'sample',
          },
        ],
        directory: '/demo',
        acl: ACL.PUBLIC,
        chunkDuration: 2,
        packageType: PackageType.HLS,
      };

      await avManager.packageVideo(requestParams).then(data => {
        expect(data).to.deep.equal(
          new PackagingJobResponse({
            jobs: [
              {
                status: JobStatus.PENDING,
                dateCreated: '2018-04-25T13:00:54Z',
                sources: [
                  {
                    path: '/sample.mp4',
                    fileId: 'ed36df98d3bb4f60bda8062f98700a29',
                  },
                ],
                result: null,
                id:
                  '4837a5af4a224225b1b257b17ef22237_6ef414ff3e9143c49927777a0c518c0a',
                issuer: 'urn:app:48fa9aa3e9d342a3a33e66af08cd7fe3',
                specification: {
                  destination: {
                    directory: '/demo',
                    path: '/demo/sample.4837a5af4a224225b1b257b17ef22237.m3u8',
                    acl: ACL.PUBLIC,
                  },
                  chunkDuration: 2,
                  packageType: PackageType.HLS,
                },
                groupId: '4837a5af4a224225b1b257b17ef22237',
                dateUpdated: '2018-04-25T13:00:54Z',
                type: 'urn:job:av.package',
              },
            ],
            groupId: '11111137a5af4a224225b1b257b17ef22237',
          }),
        );
      });
    });
  });
});
