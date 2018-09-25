import {ImportFileRequest} from '../../../src/platform/management/requests/import-file-request';
import {ListFilesRequest} from '../../../src/platform/management/requests/list-files-request';
import {ACL} from '../../../src/types/media-platform/media-platform';
import {mediaPlatform} from '../facades/media-platform-facade';


export default function (app) {

  app.get('/media-platform/file/upload/url', function (req, res) {
    const fileManager = mediaPlatform.fileManager;

    fileManager.getUploadUrl()
      .then(
        (uploadCredentials) => {
          res.send(uploadCredentials);
        },
        (error) => {
          res.status(500).send(error.message);
        }
      );
  });

  app.get('/media-platform/file/upload', function (req, res) {
    const fileManager = mediaPlatform.fileManager;
    const rand = Math.floor((Math.random() * 100000) + 1);

    fileManager.uploadFile('/demo/' + rand + '.image.jpg', __dirname + '/../files/image.jpg')
      .then(
        response => {
          res.send(response);
        },
        error => {
          res
            .status(500)
            .send(error.message);
        }
      );
  });

  app.get('/media-platform/files', function (req, res) {
    const fileManager = mediaPlatform.fileManager;
    const listFilesRequest = new ListFilesRequest({
      pageSize: 3
    });

    fileManager.listFiles('/demo', listFilesRequest)
      .then(
        (listFilesResponse) => {
          res.send(listFilesResponse);
        },
        (error) => {
          res
            .status(500)
            .send(error.message);
        });
  });

  app.get('/media-platform/file/:id/metadata', function (req, res) {
    const fileManager = mediaPlatform.fileManager;

    fileManager.getFileMetadataById(req.params.id)
      .then(
        response => {
          res.send(response);
        },
        error => {
          res
            .status(500)
            .send(error.message);
        }
      );
  });

  app.get('/media-platform/file/download/url', function (req, res) {
    const url = mediaPlatform.getDownloadUrl(req.query.path);

    res.send(url);
  });

  app.get('/media-platform/file/import', function (req, res) {
    const rand = Math.floor((Math.random() * 100000) + 1);
    const fileManager = mediaPlatform.fileManager;
    const importFileRequest = new ImportFileRequest({
      sourceUrl: 'https://static.wixstatic.com/media/f31d7d0cfc554aacb1d737757c8d3f1b.jpg',
      destination: {
        path: `/demo/import/${rand}.image.jpg`,
        acl: ACL.PUBLIC
      }
    });

    fileManager.importFile(importFileRequest)
      .then(
        response => {
          res.send(response);
        },
        error => {
          res
            .status(500)
            .send(error.message);
        }
      )
  });
};
