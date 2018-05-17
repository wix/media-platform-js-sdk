import * as fs from 'fs';
import * as nock from 'nock';
import {expect} from 'chai';
import {FileUploader} from '../../../../src/platform/management/file-uploader';
import {FileManager} from '../../../../src/platform/management/file-manager';
import {FileMetadata} from '../../../../src/platform/management/metadata/file-metadata';
import {ImageBasicMetadata} from '../../../../src/platform/management/metadata/image-basic-metadata';
import {VideoBasicMetadata} from '../../../../src/platform/management/metadata/video-basic-metadata';
import {ImageFeatures} from '../../../../src/platform/management/metadata/image-features';
import {FileDescriptor} from '../../../../src/platform/management/metadata/file-descriptor';
import {ListFilesResponse} from '../../../../src/platform/management/responses/list-files-response';
import {Configuration} from '../../../../src/platform/configuration/configuration';
import {Authenticator} from '../../../../src/platform/authentication/authenticator';
import {HTTPClient} from '../../../../src/platform/http/http-client';
import {ImportFileRequest} from '../../../../src/platform/management/requests/import-file-request';
import {ACL, FileType, OrderDirection} from '../../../../src/types/media-platform/media-platform';

const repliesDir = __dirname + '/replies/';
const sourcesDir = __dirname + '/../../../sources/';

describe('file manager', function () {

  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const fileUploader = new FileUploader(configuration, httpClient);
  const fileManager = new FileManager(configuration, httpClient, fileUploader);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(function () {
    nock.cleanAll();
  });

  it('listFiles - default', function (done) {
    apiServer.get('/_api/files/ls_dir').once().query(true).replyWithFile(200, repliesDir + 'list-files-response.json');

    fileManager.listFiles('path', null, function (error, data) {
      expect(data).to.deep.equal(new ListFilesResponse({
        nextPageToken: 'next',
        files: [
          {
            id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
            hash: 'd41d8cd98f00b204e9800998ecf8427e',
            path: '/place-holder.txt',
            mimeType: 'text/plain',
            type: '-',
            size: 0,
            acl: 'public',
            dateCreated: '2017-02-20T14:23:42Z',
            dateUpdated: '2017-02-20T14:23:42Z'
          },
          {
            id: 'f65c0c70bec44b86bb543cc166800f03',
            hash: null,
            path: '/kb',
            mimeType: 'application/vnd.wix-media.dir',
            type: 'd',
            size: 0,
            acl: 'public',
            dateCreated: '2017-02-20T14:22:51Z',
            dateUpdated: '2017-02-20T14:22:51Z'
          }
        ].map(fileDescriptorData => new FileDescriptor(fileDescriptorData))
      }));
      done(error);
    });
  });

  it('listFiles - page', function (done) {
    apiServer.get('/_api/files/ls_dir')
      .once()
      .query({
        path: 'path',
        orderDirection: OrderDirection.ASC,
        nextPageToken: 'c',
        orderBy: 'date',
        pageSize: 10,
        type: FileType.FOLDER
      })
      .replyWithFile(200, repliesDir + 'list-files-response.json');

    fileManager.listFiles('path', {
      orderDirection: OrderDirection.ASC,
      nextPageToken: 'c',
      orderBy: 'date',
      pageSize: 10,
      type: FileType.FOLDER
    }, function (error, data) {
      done(error);
    });
  });

  it('getFile', function (done) {

    apiServer.get('/_api/files').once().query(true).replyWithFile(200, repliesDir + 'file-descriptor-response.json');

    fileManager.getFile('path/of/file', function (error, data) {
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

  it('getFileMetadata - Image', function (done) {

    apiServer.get('/_api/files/file-id/metadata')
      .once()
      .replyWithFile(200, repliesDir + 'file-metadata-image-response.json');

    fileManager.getFileMetadataById('file-id', function (error, data) {
      expect(data).to.deep.equal(new FileMetadata({
        fileDescriptor: new FileDescriptor({
          id: '2145ae56cd5c47c79c05d4cfef5f1078',
          hash: null,
          path: '/images/animals/cat.jpg',
          mimeType: 'image/jpg',
          type: '-',
          size: 15431,
          acl: 'private',
          dateCreated: undefined,
          dateUpdated: undefined
        }),
        basic: new ImageBasicMetadata({
          height: 600,
          width: 500,
          colorspace: null,
          format: 'jpeg'
        }),
        features: new ImageFeatures({
          labels: [
            {
              name: 'cat',
              score: 0.9
            },
            {
              name: 'animal',
              score: 0.933
            }
          ],
          faces: [
            {
              height: 180,
              width: 155,
              x: 383,
              y: 393
            },
            {
              height: 173,
              width: 145,
              x: 460,
              y: 385
            }
          ],
          colors: [
            {
              b: 244,
              g: 218,
              pixelFraction: 0.38548386,
              r: 138,
              score: 0.688166
            }
          ]
        })
      }));
      done(error);
    });
  });

  it('getFileMetadata - Video', function (done) {

    apiServer.get('/_api/files/file-id/metadata')
      .once()
      .replyWithFile(200, repliesDir + 'file-metadata-video-response.json');

    fileManager.getFileMetadataById('file-id', function (error, data) {
      expect(data).to.deep.equal(new FileMetadata({
        basic: new VideoBasicMetadata({
          audioStreams: [
            {
              bitrate: 128322,
              codecLongName: 'AAC (Advanced Audio Coding)',
              codecName: 'aac',
              codecTag: 'mp4a',
              duration: 59351,
              index: 1
            }
          ],
          format: {
            bitrate: 2085272,
            duration: 59351,
            formatLongName: 'QuickTime / MOV',
            size: 15476893
          },
          interlaced: false,
          videoStreams: [
            {
              avgFrameRate: '2997/100',
              bitrate: 1950467,
              codecLongName: 'MPEG-4 part 2',
              codecName: 'mpeg4',
              codecTag: 'mp4v',
              displayAspectRatio: '16:9',
              duration: 59351,
              height: 720,
              index: 0,
              rFrameRate: '3000/100',
              sampleAspectRatio: '1:1',
              width: 1280
            }
          ]
        }),
        features: null,
        fileDescriptor: new FileDescriptor({
          acl: 'private',
          dateCreated: undefined,
          dateUpdated: undefined,
          hash: null,
          id: '2de4305552004e0b9076183651030646',
          mimeType: 'video/mp4',
          path: '/videos/animals/cat.mp4',
          size: 15431333,
          type: '-'
        })
      }));
      done(error);
    });
  });

  describe('file upload', () => {

    it('should accept path (string) as source', function (done) {

      apiServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
      apiServer.post('/_api/upload/file').once().replyWithFile(200, repliesDir + 'file-upload-response.json');

      //path, file, uploadRequest, callback
      fileManager.uploadFile('upload/to/there/image.jpg', sourcesDir + 'image.jpg', null, function (error, data) {
        done(error);
      });
    });

    it('should handle path (string) errors', function (done) {
      fileManager.uploadFile('upload/to/there/image.jpg', 'nothing here', null, function (error, data) {
        expect(error).to.be.an.instanceof(Error);
        expect(data).to.equal(null);
        done();
      });
    });

    it('should accept stream as source', function (done) {

      apiServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
      apiServer.post('/_api/upload/file').once().replyWithFile(200, repliesDir + 'file-upload-response.json');

      const stream = fs.createReadStream(sourcesDir + 'audio.mp3');

      fileManager.uploadFile('upload/to/there/image.jpg', stream, null, function (error, data) {
        done(error);
      });
    });

    it('should accept buffer as source', function (done) {

      apiServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
      apiServer.post('/_api/upload/file').once().replyWithFile(200, repliesDir + 'file-upload-response.json');

      const buffer = fs.readFileSync(sourcesDir + 'document.xlsx');

      fileManager.uploadFile('upload/to/there/image.jpg', buffer, null, function (error, data) {
        done(error);
      });
    });

    it('should reject unsupported source', function (done) {

      apiServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
      apiServer.post('/_api/upload/file').once().replyWithFile(200, repliesDir + 'file-descriptor-response.json');

      (fileManager.uploadFile as any)('upload/to/there/image.jpg', 1111, null, function (error, data) {
        expect(error).to.be.an.instanceof(Error);
        expect(data).to.equal(null);
        done();
      });
    });

    it('should handle auth errors', function (done) {

      apiServer.get('/_api/upload/url').once().query(true).reply(403, {});

      fileManager.uploadFile('upload/to/there/image.jpg', sourcesDir + 'image.jpg', null, function (error, data) {
        expect(error).to.be.an.instanceof(Error);
        expect(data).to.equal(null);
        done();
      });
    });

    it('should handle upload errors', function (done) {

      apiServer.get('/_api/upload/url').once().query(true).replyWithFile(200, repliesDir + 'get-upload-url-response.json');
      apiServer.post('/_api/upload/file').once().reply(500, {});

      fileManager.uploadFile('upload/to/there/image.jpg', sourcesDir + 'image.jpg', null, function (error, data) {
        expect(error).to.be.an.instanceof(Error);
        expect(data).to.equal(null);
        done();
      });
    });

  });

  it('file import', function (done) {
    apiServer.post('/_api/import/file')
      .once()
      .replyWithFile(200, repliesDir + 'import-file-pending-response.json');

    const importFileRequest = new ImportFileRequest({
      destination: {
        path: '/to/here/file.txt'
      },
      sourceUrl: 'http://from/here/file.txt'
    });

    fileManager.importFile(importFileRequest, function (error, data) {
      expect(error).to.equal(null);
      if (data === null) {
        throw Error('something is wrong');
      }
      expect(data.id).to.equal('71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f');
      done();
    });
  });

  describe('updateFileACL', () => {
    describe('by id', () => {
      it('should return public file', (done) => {
        apiServer
          .put('/_api/files')
          .once()
          .query(true)
          .replyWithFile(200, repliesDir + 'file-descriptor-response.json');

        fileManager.updateFileACL({acl: ACL.PUBLIC, id: 'd0e18fd468cd4e53bc2bbec3ca4a8676'})
          .then((data) => {
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

            done();
          });
      });

      it('should return private file', (done) => {
        apiServer
          .put('/_api/files')
          .once()
          .query(true)
          .replyWithFile(200, repliesDir + 'file-private-descriptor-response.json');

        fileManager.updateFileACL({acl: ACL.PRIVATE, id: 'd0e18fd468cd4e53bc2bbec3ca4a8676'})
          .then((data) => {
            expect(data).to.deep.equal(new FileDescriptor({
              id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
              hash: 'd41d8cd98f00b204e9800998ecf8427e',
              path: '/place-holder.txt',
              mimeType: 'text/plain',
              type: '-',
              size: 0,
              acl: 'private',
              dateCreated: '2017-02-20T14:23:42Z',
              dateUpdated: '2017-02-20T14:23:42Z'
            }));

            done();
          });
      });
    });

    describe('by path', () => {
      it('should return public file', (done) => {
        apiServer
          .put('/_api/files')
          .once()
          .query(true)
          .replyWithFile(200, repliesDir + 'file-descriptor-response.json');

        fileManager.updateFileACL({acl: ACL.PUBLIC, path: '/place-holder.txt'})
          .then((data) => {
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

            done();
          });
      });

      it('should return private file', (done) => {
        apiServer
          .put('/_api/files')
          .once()
          .query(true)
          .replyWithFile(200, repliesDir + 'file-private-descriptor-response.json');

        fileManager.updateFileACL({acl: ACL.PRIVATE, path: '/place-holder.txt'})
          .then((data) => {
            expect(data).to.deep.equal(new FileDescriptor({
              id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
              hash: 'd41d8cd98f00b204e9800998ecf8427e',
              path: '/place-holder.txt',
              mimeType: 'text/plain',
              type: '-',
              size: 0,
              acl: 'private',
              dateCreated: '2017-02-20T14:23:42Z',
              dateUpdated: '2017-02-20T14:23:42Z'
            }));

            done();
          });
      });
    });
  });
});
