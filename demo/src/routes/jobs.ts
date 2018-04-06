import {mediaPlatform} from '../facades/media-platform-facade';

const {jobManager} = mediaPlatform;

export default function (app) {

  app.get('/media-platform/job/:id', function (req, res) {
    jobManager.getJob(req.params.id, function (error, job) {

      if (error) {
        res.status(500).send(error.message);
        return;
      }

      res.send(job);
    });
  });
};
