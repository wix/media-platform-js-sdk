import { expect } from 'chai';
import * as fs from 'fs';
import * as nock from 'nock';
import * as path from 'path';
import * as sinon from 'sinon';

import { Authenticator } from '../../../../src/platform/authentication/authenticator';
import { Configuration } from '../../../../src/platform/configuration/configuration';
import { HTTPClient } from '../../../../src/platform/http/http-client';
import { FileManager } from '../../../../src/platform/management/file-manager';
import { FileUploader } from '../../../../src/platform/management/file-uploader';
import { Likelihood } from '../../../../src/platform/management/metadata/explicit-content';
import { FileDescriptor } from '../../../../src/platform/management/metadata/file-descriptor';
import { FileMetadata } from '../../../../src/platform/management/metadata/file-metadata';
import { ImageBasicMetadata } from '../../../../src/platform/management/metadata/image-basic-metadata';
import { ImageFeatures } from '../../../../src/platform/management/metadata/image-features';
import { VideoBasicMetadata } from '../../../../src/platform/management/metadata/video-basic-metadata';
import { ImportFileRequest } from '../../../../src/platform/management/requests/import-file-request';
import { UploadFileRequest } from '../../../../src/platform/management/requests/upload-file-request';
import { ListFilesResponse } from '../../../../src/platform/management/responses/list-files-response';
import {
  ACL,
  DescriptorMimeType,
  FileType,
  Lifecycle,
  MediaType,
  OrderDirection,
} from '../../../../src/types/media-platform/media-platform';

const repliesDir = __dirname + '/replies/';
const sourcesDir = __dirname + '/../../../sources/';

describe('File Manager', () => {
  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const fileUploader = new FileUploader(configuration, httpClient);
  const fileManager = new FileManager(configuration, httpClient, fileUploader);
  const sandbox = sinon.createSandbox();

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json',
  });

  afterEach(() => {
    nock.cleanAll();
    sandbox.verifyAndRestore();
  });

  it('listFiles - default', done => {
    apiServer
      .get('/_api/files/ls_dir')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'list-files-response.json');

    fileManager.listFiles('path').then(data => {
      expect(data).to.deep.equal(
        new ListFilesResponse({
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
              bucket: 'bucket-name',
              dateCreated: '2017-02-20T14:23:42Z',
              dateUpdated: '2017-02-20T14:23:42Z',
            },
            {
              id: 'f65c0c70bec44b86bb543cc166800f03',
              hash: null,
              path: '/kb',
              mimeType: DescriptorMimeType.Folder,
              type: 'd',
              size: 0,
              acl: 'public',
              bucket: null,
              dateCreated: '2017-02-20T14:22:51Z',
              dateUpdated: '2017-02-20T14:22:51Z',
            },
          ].map(fileDescriptorData => new FileDescriptor(fileDescriptorData)),
        }),
      );

      done();
    });
  });

  it('listFiles - page', done => {
    apiServer
      .get('/_api/files/ls_dir')
      .once()
      .query({
        path: 'path',
        orderDirection: OrderDirection.ASC,
        nextPageToken: 'c',
        orderBy: 'date',
        pageSize: 10,
        type: FileType.FOLDER,
      })
      .replyWithFile(200, repliesDir + 'list-files-response.json');

    fileManager
      .listFiles('path', {
        orderDirection: OrderDirection.ASC,
        nextPageToken: 'c',
        orderBy: 'date',
        pageSize: 10,
        type: FileType.FOLDER,
      })
      .then(() => {
        done();
      });
  });

  describe('createFolder', () => {
    it('should return resolved promise with public folder(acl set with public by default)', done => {
      apiServer
        .post('/_api/files')
        .once()
        .query(true)
        .replyWithFile(200, repliesDir + 'create-folder-success-response.json');

      fileManager.createFolder({ path: 'bla' }).then(data => {
        expect(data).to.deep.equal(
          new FileDescriptor({
            mimeType: DescriptorMimeType.Folder,
            hash: null,
            dateCreated: '2018-10-08T13:18:17Z',
            id: '3900db2ce3894b53b21e7e73433ffa6c',
            path: '/bla',
            lifecycle: null,
            size: 0,
            urn: 'urn:file:3900db2ce3894b53b21e7e73433ffa6c',
            acl: 'public',
            dateUpdated: '2018-10-08T13:18:17Z',
            type: 'd',
          }),
        );

        done();
      });
    });

    it('should return resolved promise with private folder', done => {
      apiServer
        .post('/_api/files')
        .once()
        .query(true)
        .replyWithFile(
          200,
          repliesDir + 'create-private-folder-success-response.json',
        );

      fileManager
        .createFolder({ acl: ACL.PRIVATE, path: 'path/of/file' })
        .then(data => {
          expect(data).to.deep.equal(
            new FileDescriptor({
              mimeType: DescriptorMimeType.Folder,
              hash: null,
              dateCreated: '2018-10-08T13:39:48Z',
              id: 'df46065dce7b4ae9a54542fc7aa48753',
              path: '/private_folder',
              lifecycle: null,
              size: 0,
              urn: 'urn:file:df46065dce7b4ae9a54542fc7aa48753',
              acl: 'private',
              dateUpdated: '2018-10-08T13:39:48Z',
              type: 'd',
            }),
          );

          done();
        });
    });

    it('should return rejected promise when no `path` passed', done => {
      apiServer
        .post('/_api/files')
        .once()
        .query(true)
        .replyWithFile(
          400,
          repliesDir + 'create-folder-path-error-response.json',
        );

      // use any for execute method with empty arguments
      (fileManager as any).createFolder({}).catch(error => {
        expect(error)
          .to.be.an.instanceOf(Error)
          .with.property(
            'message',
            JSON.stringify({
              message: "'path'",
              code: 400,
              payload: null,
            }),
          );

        done();
      });
    });
  });

  it('getFile', done => {
    apiServer
      .get('/_api/files')
      .once()
      .query(true)
      .replyWithFile(200, repliesDir + 'file-descriptor-response.json');

    fileManager.getFile('path/of/file').then(data => {
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
          bucket: null,
        }),
      );

      done();
    });
  });

  it('getFileMetadata - Image', done => {
    apiServer
      .get('/_api/files/file-id/metadata')
      .once()
      .replyWithFile(200, repliesDir + 'file-metadata-image-response.json');

    fileManager
      .getFileMetadataById('file-id')
      .then(data => {
        expect(data).to.deep.equal(
          new FileMetadata({
            mediaType: MediaType.Image,
            fileDescriptor: new FileDescriptor({
              id: '2145ae56cd5c47c79c05d4cfef5f1078',
              hash: null,
              path: '/images/animals/cat.jpg',
              mimeType: 'image/jpg',
              type: '-',
              size: 15431,
              acl: 'private',
              dateCreated: undefined,
              dateUpdated: undefined,
              bucket: null,
            }),
            extra: null,
            basic: new ImageBasicMetadata({
              height: 600,
              width: 500,
              colorspace: null,
              format: 'jpeg',
            }),
            features: new ImageFeatures({
              colors: [
                {
                  b: 244,
                  g: 218,
                  pixelFraction: 0.38548386,
                  r: 138,
                  score: 0.688166,
                },
              ],
              explicitContent: [
                {
                  likelihood: Likelihood.UNLIKELY,
                  name: 'medical',
                },
                {
                  likelihood: Likelihood.VERY_UNLIKELY,
                  name: 'adult',
                },
              ],
              faces: [
                {
                  height: 180,
                  width: 155,
                  x: 383,
                  y: 393,
                },
                {
                  height: 173,
                  width: 145,
                  x: 460,
                  y: 385,
                },
              ],
              labels: [
                {
                  name: 'cat',
                  score: 0.9,
                },
                {
                  name: 'animal',
                  score: 0.933,
                },
              ],
            }),
          }),
        );

        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('getFileMetadata - Video', done => {
    apiServer
      .get('/_api/files/file-id/metadata')
      .once()
      .replyWithFile(200, repliesDir + 'file-metadata-video-response.json');

    fileManager
      .getFileMetadataById('file-id')
      .then(data => {
        expect(data).to.deep.equal(
          new FileMetadata({
            mediaType: MediaType.Video,
            extra: null,
            basic: new VideoBasicMetadata({
              audioStreams: [
                {
                  bitrate: 128322,
                  codecLongName: 'AAC (Advanced Audio Coding)',
                  codecName: 'aac',
                  codecTag: 'mp4a',
                  duration: 59351,
                  index: 1,
                },
              ],
              format: {
                bitrate: 2085272,
                duration: 59351,
                formatLongName: 'QuickTime / MOV',
                size: 15476893,
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
                  width: 1280,
                },
              ],
            }),
            features: null,
            fileDescriptor: new FileDescriptor({
              acl: 'private',
              bucket: null,
              dateCreated: undefined,
              dateUpdated: undefined,
              hash: null,
              id: '2de4305552004e0b9076183651030646',
              mimeType: 'video/mp4',
              path: '/videos/animals/cat.mp4',
              size: 15431333,
              type: '-',
            }),
          }),
        );

        done();
      })
      .catch(err => {
        done(err);
      });
  });

  describe('file upload', () => {
    it('should accept path (string) as source', done => {
      apiServer
        .post('/_api/v2/upload/configuration')
        .once()
        .query(true)
        .replyWithFile(200, repliesDir + 'get-upload-url-response.json');
      apiServer
        .post('/_api/upload/file')
        .once()
        .replyWithFile(200, repliesDir + 'file-upload-v2-response.json');

      //path, file, uploadRequest
      (fileManager.uploadFile(
        'upload/to/there/image.jpg',
        sourcesDir + 'image.jpg',
      ) as Promise<FileDescriptor[]>).then(() => {
        done();
      });
    });

    it('should handle path (string) errors', done => {
      (fileManager.uploadFile(
        'upload/to/there/image.jpg',
        'nothing here',
      ) as Promise<FileDescriptor[]>).catch(error => {
        expect(error).to.be.an.instanceof(Error);
        expect(error)
          .to.be.an.instanceof(Error)
          .with.property(
            'message',
            "ENOENT: no such file or directory, stat 'nothing here'",
          );

        done();
      });
    });

    it('should accept stream as source', done => {
      apiServer
        .post('/_api/v2/upload/configuration')
        .once()
        .query(true)
        .replyWithFile(200, repliesDir + 'get-upload-url-response.json');
      apiServer
        .post('/_api/upload/file')
        .once()
        .replyWithFile(200, repliesDir + 'file-upload-v2-response.json');

      const stream = fs.createReadStream(sourcesDir + 'audio.mp3');

      (fileManager.uploadFile('upload/to/there/image.jpg', stream) as Promise<
        FileDescriptor[]
      >).then(() => {
        done();
      });
    });

    it('should accept buffer as source', done => {
      apiServer
        .post('/_api/v2/upload/configuration')
        .once()
        .query(true)
        .replyWithFile(200, repliesDir + 'get-upload-url-response.json');
      apiServer
        .post('/_api/upload/file')
        .once()
        .replyWithFile(200, repliesDir + 'file-upload-v2-response.json');

      const buffer = fs.readFileSync(sourcesDir + 'document.xlsx');

      (fileManager.uploadFile('upload/to/there/image.jpg', buffer) as Promise<
        FileDescriptor[]
      >).then(() => {
        done();
      });
    });

    it('should reject unsupported source', done => {
      apiServer
        .get('/_api/upload/url')
        .once()
        .query(true)
        .replyWithFile(200, repliesDir + 'get-upload-url-response.json');
      apiServer
        .post('/_api/upload/file')
        .once()
        .replyWithFile(200, repliesDir + 'file-descriptor-response.json');

      ((fileManager.uploadFile as any)(
        'upload/to/there/image.jpg',
        1111,
        null,
      ) as Promise<FileDescriptor[]>).catch(error => {
        expect(error).to.be.an.instanceof(Error);
        expect(error)
          .to.be.an.instanceof(Error)
          .with.property('message', 'unsupported source type: number');

        done();
      });
    });

    it('should handle auth errors', done => {
      apiServer
        .get('/_api/upload/url')
        .once()
        .query(true)
        .reply(403, {});

      (fileManager.uploadFile(
        'upload/to/there/image.jpg',
        sourcesDir + 'image.jpg',
      ) as Promise<FileDescriptor[]>).catch(error => {
        expect(error).to.be.an.instanceof(Error);

        done();
      });
    });

    it('should handle upload errors', done => {
      apiServer
        .get('/_api/upload/url')
        .once()
        .query(true)
        .replyWithFile(200, repliesDir + 'get-upload-url-response.json');
      apiServer
        .post('/_api/upload/file')
        .once()
        .reply(500, {});

      (fileManager.uploadFile(
        'upload/to/there/image.jpg',
        sourcesDir + 'image.jpg',
      ) as Promise<FileDescriptor[]>).catch(error => {
        expect(error).to.be.an.instanceof(Error);
        done();
      });
    });

    describe('acl', () => {
      it('should upload file with default(public) ACL', done => {
        apiServer
          .post('/_api/v2/upload/configuration')
          .once()
          .query(true)
          .replyWithFile(
            200,
            repliesDir + 'get-upload-configuration-response.json',
          );

        apiServer
          .post('/_api/upload/file')
          .once()
          .replyWithFile(200, repliesDir + 'file-upload-v2-response.json');

        (fileManager.uploadFile(
          'upload/to/there/image.jpg',
          sourcesDir + 'image.jpg',
        ) as Promise<FileDescriptor[]>).then(response => {
          expect(response[0].acl).to.be.eql(ACL.PUBLIC);
          done();
        });
      });

      it('should upload file with public ACL', done => {
        apiServer
          .post('/_api/v2/upload/configuration')
          .once()
          .query(true)
          .replyWithFile(
            200,
            repliesDir + 'get-upload-configuration-response.json',
          );

        apiServer
          .post('/_api/upload/file')
          .once()
          .replyWithFile(200, repliesDir + 'file-upload-v2-response.json');

        const uploadFileRequest = new UploadFileRequest({
          acl: ACL.PUBLIC,
        });

        (fileManager.uploadFile(
          'upload/to/there/image.jpg',
          sourcesDir + 'image.jpg',
          uploadFileRequest,
        ) as Promise<FileDescriptor[]>).then(response => {
          expect(response[0].acl).to.be.eql(ACL.PUBLIC);
          done();
        });
      });

      it('should upload file with private ACL', done => {
        apiServer
          .post('/_api/v2/upload/configuration')
          .once()
          .query(true)
          .replyWithFile(
            200,
            repliesDir + 'get-upload-configuration-response.json',
          );

        apiServer
          .post('/_api/upload/file')
          .once()
          .replyWithFile(200, repliesDir + 'file-upload-private-response.json');

        const uploadFileRequest = new UploadFileRequest({
          acl: ACL.PRIVATE,
        });

        (fileManager.uploadFile(
          'upload/to/there/image.jpg',
          sourcesDir + 'image.jpg',
          uploadFileRequest,
        ) as Promise<FileDescriptor[]>).then(response => {
          expect(response[0].acl).to.be.eql(ACL.PRIVATE);
          done();
        });
      });
    });

    describe('lifecycle(age)', () => {
      it('should upload file with default(none) lifecycle', done => {
        apiServer
          .post('/_api/v2/upload/configuration')
          .once()
          .query(true)
          .replyWithFile(
            200,
            repliesDir + 'get-upload-configuration-response.json',
          );

        apiServer
          .post('/_api/upload/file')
          .once()
          .replyWithFile(200, repliesDir + 'file-upload-v2-response.json');

        (fileManager.uploadFile(
          'upload/to/there/image.jpg',
          sourcesDir + 'image.jpg',
        ) as Promise<FileDescriptor[]>).then(response => {
          expect(response[0].lifecycle).to.be.eql(null);
          done();
        });
      });

      it('should upload file with delete lifecycle', done => {
        apiServer
          .post('/_api/v2/upload/configuration')
          .once()
          .query(true)
          .replyWithFile(
            200,
            repliesDir + 'get-upload-configuration-response.json',
          );

        apiServer
          .post('/_api/upload/file')
          .once()
          .replyWithFile(
            200,
            repliesDir + 'file-upload-lifecycle-delete-response.json',
          );

        const uploadFileRequest = new UploadFileRequest({
          age: 50,
        });

        (fileManager.uploadFile(
          'upload/to/there/image.jpg',
          sourcesDir + 'image.jpg',
          uploadFileRequest,
        ) as Promise<FileDescriptor[]>).then(response => {
          expect(response[0].lifecycle).to.be.eql({
            action: Lifecycle.Delete,
            age: 50,
          });
          done();
        });
      });
    });
  });

  it('file import', done => {
    apiServer
      .post('/_api/import/file')
      .once()
      .replyWithFile(200, repliesDir + 'import-file-pending-response.json');

    const importFileRequest = new ImportFileRequest({
      destination: {
        path: '/to/here/file.txt',
      },
      sourceUrl: 'http://from/here/file.txt',
    });

    fileManager.importFile(importFileRequest).then(data => {
      if (data === null) {
        throw Error('something is wrong');
      }

      expect(data.id).to.equal(
        '71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f',
      );

      done();
    });
  });

  it('file import observable', done => {
    apiServer
      .post('/_api/import/file')
      .once()
      .replyWithFile(
        200,
        path.join(repliesDir, 'import-file-pending-response.json'),
      );

    apiServer
      .get(
        '/_api/jobs/71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f',
      )
      .once()
      .replyWithFile(
        200,
        path.join(repliesDir, 'import-file-success-response.json'),
      );

    const importFileRequest = new ImportFileRequest({
      destination: {
        path: '/to/here/file.txt',
      },
      sourceUrl: 'http://from/here/file.txt',
    });

    const progressSpy = sandbox.spy();

    fileManager.importFileObservable(importFileRequest).subscribe(
      progressSpy,
      error => done(error),
      () => {
        expect(progressSpy).to.have.been.calledTwice;
        expect(progressSpy.firstCall.args[0].id).to.equal(
          '71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f',
        );
        expect(progressSpy.firstCall.args[0].status).to.equal('pending');
        expect(progressSpy.secondCall.args[0].id).to.equal(
          '71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f',
        );
        expect(progressSpy.secondCall.args[0].status).to.equal('success');
        done();
      },
    );
  });

  it('file import observable error', done => {
    apiServer
      .post('/_api/import/file')
      .once()
      .replyWithFile(
        200,
        path.join(repliesDir, 'import-file-pending-response.json'),
      );

    apiServer
      .get(
        '/_api/jobs/71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f',
      )
      .once()
      .replyWithFile(
        200,
        path.join(repliesDir, 'import-file-error-response.json'),
      );

    const importFileRequest = new ImportFileRequest({
      destination: {
        path: '/to/here/file.txt',
      },
      sourceUrl: 'http://from/here/file.txt',
    });

    const progressSpy = sandbox.spy();

    fileManager.importFileObservable(importFileRequest).subscribe(
      progressSpy,
      error => {
        expect(progressSpy).to.have.been.calledOnce;
        expect(progressSpy.firstCall.args[0].id).to.equal(
          '71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f',
        );
        expect(progressSpy.firstCall.args[0].status).to.equal('pending');
        expect(error.id).to.equal(
          '71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f',
        );
        expect(error.status).to.equal('error');
        done();
      },
      done,
    );
  });

  describe('updateFileACL', () => {
    describe('by id', () => {
      it('should return public file', done => {
        apiServer
          .put('/_api/files')
          .once()
          .query(true)
          .replyWithFile(200, repliesDir + 'file-descriptor-response.json');

        fileManager
          .updateFileACL({
            acl: ACL.PUBLIC,
            id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
          })
          .then(data => {
            expect(data).to.deep.equal(
              new FileDescriptor({
                id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
                hash: 'd41d8cd98f00b204e9800998ecf8427e',
                path: '/place-holder.txt',
                mimeType: 'text/plain',
                type: '-',
                size: 0,
                acl: 'public',
                bucket: null,
                dateCreated: '2017-02-20T14:23:42Z',
                dateUpdated: '2017-02-20T14:23:42Z',
              }),
            );

            done();
          });
      });

      it('should return private file', done => {
        apiServer
          .put('/_api/files')
          .once()
          .query(true)
          .replyWithFile(
            200,
            repliesDir + 'file-private-descriptor-response.json',
          );

        fileManager
          .updateFileACL({
            acl: ACL.PRIVATE,
            id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
          })
          .then(data => {
            expect(data).to.deep.equal(
              new FileDescriptor({
                id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
                hash: 'd41d8cd98f00b204e9800998ecf8427e',
                path: '/place-holder.txt',
                mimeType: 'text/plain',
                type: '-',
                size: 0,
                acl: 'private',
                bucket: null,
                dateCreated: '2017-02-20T14:23:42Z',
                dateUpdated: '2017-02-20T14:23:42Z',
              }),
            );

            done();
          });
      });
    });

    describe('by path', () => {
      it('should return public file', done => {
        apiServer
          .put('/_api/files')
          .once()
          .query(true)
          .replyWithFile(200, repliesDir + 'file-descriptor-response.json');

        fileManager
          .updateFileACL({ acl: ACL.PUBLIC, path: '/place-holder.txt' })
          .then(data => {
            expect(data).to.deep.equal(
              new FileDescriptor({
                id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
                hash: 'd41d8cd98f00b204e9800998ecf8427e',
                path: '/place-holder.txt',
                mimeType: 'text/plain',
                type: '-',
                size: 0,
                acl: 'public',
                bucket: null,
                dateCreated: '2017-02-20T14:23:42Z',
                dateUpdated: '2017-02-20T14:23:42Z',
              }),
            );

            done();
          });
      });

      it('should return private file', done => {
        apiServer
          .put('/_api/files')
          .once()
          .query(true)
          .replyWithFile(
            200,
            repliesDir + 'file-private-descriptor-response.json',
          );

        fileManager
          .updateFileACL({ acl: ACL.PRIVATE, path: '/place-holder.txt' })
          .then(data => {
            expect(data).to.deep.equal(
              new FileDescriptor({
                id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
                hash: 'd41d8cd98f00b204e9800998ecf8427e',
                path: '/place-holder.txt',
                mimeType: 'text/plain',
                type: '-',
                size: 0,
                acl: 'private',
                bucket: null,
                dateCreated: '2017-02-20T14:23:42Z',
                dateUpdated: '2017-02-20T14:23:42Z',
              }),
            );

            done();
          });
      });
    });
  });
});
