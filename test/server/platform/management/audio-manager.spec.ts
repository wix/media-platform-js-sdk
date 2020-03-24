import { expect } from 'chai';
import * as nock from 'nock';
import * as sinon from 'sinon';

import { Authenticator } from '../../../../src/platform/authentication/authenticator';
import { Configuration } from '../../../../src/platform/configuration/configuration';
import { HTTPClient } from '../../../../src/platform/http/http-client';
import { AudioManager } from '../../../../src/platform/management/audio-manager';
import { AudioBasicMetadata } from '../../../../src/platform/management/metadata/audio-basic-metadata';
import { AudioExtraMetadata } from '../../../../src/platform/management/metadata/audio-extra-metadata';
import { FileDescriptor } from '../../../../src/platform/management/metadata/file-descriptor';
import { FileMetadata } from '../../../../src/platform/management/metadata/file-metadata';
import { MediaType } from '../../../../src/types/media-platform/media-platform';

const repliesDir = __dirname + '/replies/';

describe('Audio Manager', () => {
  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const audioManager = new AudioManager(configuration, httpClient);
  const sandbox = sinon.createSandbox();

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json',
  });

  afterEach(() => {
    nock.cleanAll();
    sandbox.verifyAndRestore();
  });

  it('extracts audio metadata', (done) => {
    apiServer
      .get('/_api/audio/metadata')
      .query(true)
      .once()
      .replyWithFile(200, repliesDir + 'extract-metadata-audio-response.json');

    audioManager
      .extractMetadata('/f.mp3')
      .then((data) => {
        expect(data).to.deep.equal(
          new FileMetadata({
            basic: new AudioBasicMetadata({
              audioStreams: [
                {
                  codecLongName: 'MP3 (MPEG audio layer 3)',
                  index: 0,
                  codecTag: '[0][0][0][0]',
                  duration: 215361,
                  codecName: 'mp3',
                  bitrate: 128000,
                },
              ],
              format: {
                duration: 215361,
                bitrate: 131058,
                formatLongName: 'MP2/3 (MPEG audio layer 2/3)',
                size: 3528120,
              },
            }),
            extra: new AudioExtraMetadata({
              images: [
                {
                  mimeType: null,
                  url: null,
                  type: 'Other',
                },
              ],
              lyrics: {
                description: 'Very good song',
                language: 'english',
                text: 'Song lyrics',
              },
              genre: 'Rock',
              albumName: 'The Very Best Of ACDC',
              trackName: 'TNT',
              artist: 'ACDC',
              trackNumber: '01',
              composer: null,
              year: '1990',
            }),
            fileDescriptor: new FileDescriptor({
              acl: 'public',
              bucket: null,
              dateCreated: '2019-04-16T08:19:37Z',
              dateUpdated: '2019-04-16T08:19:37Z',
              hash: '35df225c1634042f59e85aad37bae506',
              id: '90b78c19d79c439b86fb73ce5aa25a62',
              mimeType: 'audio/mpeg',
              path: '/f.mp3',
              size: 3528120,
              type: '-',
            }),
            mediaType: MediaType.Audio,
          }),
        );

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('extracts audio metadata - without "extra"', (done) => {
    apiServer
      .get('/_api/audio/metadata')
      .query(true)
      .once()
      .replyWithFile(
        200,
        repliesDir + 'extract-metadata-audio-no-extra-response.json',
      );

    audioManager
      .extractMetadata('/f.mp3')
      .then((data) => {
        expect(data).to.deep.equal(
          new FileMetadata({
            basic: new AudioBasicMetadata({
              audioStreams: [
                {
                  codecLongName: 'MP3 (MPEG audio layer 3)',
                  index: 0,
                  codecTag: '[0][0][0][0]',
                  duration: 215361,
                  codecName: 'mp3',
                  bitrate: 128000,
                },
              ],
              format: {
                duration: 215361,
                bitrate: 131058,
                formatLongName: 'MP2/3 (MPEG audio layer 2/3)',
                size: 3528120,
              },
            }),
            mediaType: MediaType.Audio,
            fileDescriptor: new FileDescriptor({
              acl: 'public',
              bucket: null,
              dateCreated: '2019-04-16T08:19:37Z',
              dateUpdated: '2019-04-16T08:19:37Z',
              hash: '35df225c1634042f59e85aad37bae506',
              id: '90b78c19d79c439b86fb73ce5aa25a62',
              mimeType: 'audio/mpeg',
              path: '/f.mp3',
              size: 3528120,
              type: '-',
            }),
          }),
        );

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
