import {expect} from 'chai';
import * as nock from 'nock';
import {Authenticator} from '../../../../src/platform/authentication/authenticator';
import {Configuration} from '../../../../src/platform/configuration/configuration';
import {HTTPClient} from '../../../../src/platform/http/http-client';
import {FlowManager} from '../../../../src/platform/management/flow-manager';
import {Flow} from '../../../../src/platform/management/metadata/flow';
import {Invocation} from '../../../../src/platform/management/metadata/invocation';
import {CreateFlowRequest} from '../../../../src/platform/management/requests/create-flow-request';

const repliesDir = __dirname + '/replies/';

describe('flow manager', function () {

  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const flowManager = new FlowManager(configuration, httpClient);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json'
  });

  afterEach(function () {
    nock.cleanAll();
  });


  it('Get flow request is parsing properly', function (done) {
    apiServer.get('/_api/flow_control/flow/flow_id')
      .once()
      .replyWithFile(200, repliesDir + 'get-flow-response.json');

    flowManager.getFlow('flow_id')
      .then(data => {
        expect(data.invocation).to.be.an.instanceof(Invocation);
        expect(data.invocation.entryPoints).to.be.an.instanceof(Array);
        expect(data.invocation.entryPoints[0]).to.equal('import');
        expect(data.flow.import.type).to.equal('file.import');

        done();
      });
  });

  it('Create Flow', function (done) {
    apiServer.post('/_api/flow_control/flow')
      .once()
      .replyWithFile(200, repliesDir + 'get-flow-response.json');

    const createFlowRequest = new CreateFlowRequest({
      invocation: {
        sources: [{
          path: '/to/here/file.mp4'
        }],
        entryPoints: ['import']
      },
      flow: {
        import: {
          type: 'file.import',
          specification: {
            destination: {
              path: '/to/here/file.mp4'
            },
            sourceUrl: 'http://from/here/file.mp4'
          },
          successors: ['transcode']
        },
        transcode: {
          type: 'av.transcode',
          specification: {
            destination: {
              directory: '/test/output/',
              acl: 'public'
            },
            qualityRange: {
              minimum: '240p',
              maximum: '1440p'
            }
          }
        }
      }
    });


    flowManager.createFlow(createFlowRequest)
      .then((data: Flow) => {
        expect(data !== null).to.be.true;
        expect(data.id).to.equal('flow_id');

        done();
      });
  });

  it('Delete Flow', function (done) {
    apiServer.delete('/_api/flow_control/flow/flow_id')
      .once()
      .replyWithFile(200, repliesDir + 'flow-delete-response.json');

    flowManager.deleteFlow('flow_id')
      .then(() => done());
  });

});
