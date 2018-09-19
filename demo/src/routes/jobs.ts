import {mediaPlatform} from '../facades/media-platform-facade';


const {jobManager} = mediaPlatform;

export default function (app) {

  app.get('/media-platform/job/:id', function (req, res) {
    jobManager.getJob(req.params.id)
      .then(
        job => {
          res.send(job);
        },
        error => {
          res
            .status(500)
            .send(error.message);
        }
      );
  });
};
