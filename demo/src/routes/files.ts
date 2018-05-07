import {mediaPlatform} from '../facades/media-platform-facade';
import {ListFilesRequest} from '../../../src/platform/management/requests/list-files-request';
import {ImportFileRequest} from '../../../src/platform/management/requests/import-file-request';
import {ACL} from '../../../src/types/media-platform/media-platform';


export default function (app) {

  app.get('/media-platform/file/upload/url', function (req, res) {
    var fileManager = mediaPlatform.fileManager;
    fileManager.getUploadUrl(null, function (error, uploadCredentials) {

      if (error) {
        res.status(500).send(error.message);
        return;
      }

      res.send(uploadCredentials);
    });
  });

  app.get('/media-platform/file/upload', function (req, res) {
    var fileManager = mediaPlatform.fileManager;
    var rand = Math.floor((Math.random() * 100000) + 1);
    fileManager.uploadFile('/demo/' + rand + '.image.jpg', __dirname + '/../files/image.jpg', null, function (error, response) {

      if (error) {
        res.status(500).send(error.message);
        return;
      }

      res.send(response);
    });

  });

  app.get('/media-platform/files', function (req, res) {
    var fileManager = mediaPlatform.fileManager;
    var listFilesRequest = new ListFilesRequest({
      pageSize: 3
    });
    fileManager.listFiles('/demo', listFilesRequest, function (error, listFilesResponse) {

      if (error) {
        res.status(500).send(error.message);
        return;
      }

      res.send(listFilesResponse);
    });
  });

  app.get('/media-platform/file/:id/metadata', function (req, res) {
    var fileManager = mediaPlatform.fileManager;
    fileManager.getFileMetadataById(req.params.id, function (error, response) {

      if (error) {
        res.status(500).send(error.message);
        return;
      }

      res.send(response);
    });
  });

  app.get('/media-platform/file/download/url', function (req, res) {
    var url = mediaPlatform.getDownloadUrl(req.query.path, null);

    res.send(url);
  });

  app.get('/media-platform/file/import', function (req, res) {
    var rand = Math.floor((Math.random() * 100000) + 1);
    var fileManager = mediaPlatform.fileManager;
    var importFileRequest = new ImportFileRequest({
      sourceUrl: 'https://static.wixstatic.com/media/f31d7d0cfc554aacb1d737757c8d3f1b.jpg',
      destination: {
        path: `/demo/import/${rand}.image.jpg`,
        acl: ACL.PUBLIC
      }
    });

    fileManager.importFile(importFileRequest, function (error, response) {
      if (error) {
        res.status(500).send(error.message);
        return;
      }

      res.send(response);
    });
  });
};
