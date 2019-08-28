import { expect } from 'chai';
import * as nock from 'nock';

import { Authenticator } from '../../../../src/platform/authentication/authenticator';
import { Configuration } from '../../../../src/platform/configuration/configuration';
import { HTTPClient } from '../../../../src/platform/http/http-client';
import { FlowManager } from '../../../../src/platform/management/flow-manager';
import { Flow } from '../../../../src/platform/management/metadata/flow';
import {
  ErrorStrategy,
  IInvocation,
  Invocation,
} from '../../../../src/platform/management/metadata/invocation';
import { CreateFlowRequest } from '../../../../src/platform/management/requests/create-flow-request';
import { ICallback } from '../../../../src/platform/management/job/callback';
import { Source } from '../../../../src/server';

const repliesDir = __dirname + '/replies/';

describe('flow manager', () => {
  const configuration = new Configuration('manager.com', 'secret', 'appId');
  const authenticator = new Authenticator(configuration);
  const httpClient = new HTTPClient(authenticator);
  const flowManager = new FlowManager(configuration, httpClient);

  const apiServer = nock('https://manager.com/').defaultReplyHeaders({
    'Content-Type': 'application/json',
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('Get flow request is parsing properly', done => {
    apiServer
      .get('/_api/flow_control/flow/flow_id')
      .once()
      .replyWithFile(200, repliesDir + 'get-flow-response.json');

    flowManager.getFlow('flow_id').then(data => {
      expect(data.invocation).to.be.an.instanceof(Invocation);
      expect(data.invocation.entryPoints).to.be.an.instanceof(Array);
      expect(data.invocation.entryPoints[0]).to.equal('import');
      expect(data.flow.import.type).to.equal('file.import');

      done();
    });
  });

  it('Create Flow', done => {
    apiServer
      .post('/_api/flow_control/flow')
      .once()
      .replyWithFile(200, repliesDir + 'get-flow-response.json');

    const createFlowRequest = new CreateFlowRequest({
      flow: {
        import: {
          type: 'file.import',
          specification: {
            destination: {
              path: '/to/here/file.mp4',
            },
            sourceUrl: 'http://from/here/file.mp4',
          },
          successors: ['transcode'],
        },
        transcode: {
          type: 'av.transcode',
          specification: {
            destination: {
              directory: '/test/output/',
              acl: 'public',
            },
            qualityRange: {
              minimum: '240p',
              maximum: '1440p',
            },
          },
        },
      },
      invocation: {
        sources: [
          {
            path: '/to/here/file.mp4',
          },
        ],
        entryPoints: ['import'],
      },
    });

    flowManager.createFlow(createFlowRequest).then((data: Flow) => {
      expect(data !== null).to.be.true;
      expect(data.id).to.equal('flow_id');

      done();
    });
  });

  it('VOD Flow', async () => {
    apiServer
      .post('/_api/flow_control/flow')
      .once()
      .replyWithFile(200, repliesDir + 'invoke-vod-flow-response.json');

    const transcodeComponent = {
      type: 'av.transcode',
      specification: {
        destination: {
          directory: '/test/output/',
          acl: 'public',
        },
        qualityRange: {
          minimum: '144p',
          maximum: '2160p',
        },
      },
    };

    const storyboardComponent = {
      type: 'av.transcodeComponent',
      specification: {
        destination: {
          path: '/test/output-storyboard.mp4',
          acl: 'public',
        },
        quality: '144p',
        audio: {
          skip: true,
        },
      },
    };

    const clipComponent = {
      type: 'av.transcodeComponent',
      specification: {
        destination: {
          directory: '/test/output-clip/',
          acl: 'public',
        },
        qualityRange: {
          minimum: '144p',
          maximum: '2160p',
        },
        clipping: {
          start: 0,
          duration: 30,
          fadeInDuration: 5,
          fadeOutDuration: 5,
          fadeInOffset: 5,
          fadeOutOffset: 5,
        },
        audio: {},
      },
    };

    const postersComponent0 = {
      type: 'av.posters',
      specification: {
        destination: {
          directory: '/test/posters',
          acl: 'public',
        },
        percentage: 0,
        format: 'jpg',
      },
      successors: ['allPostersCompleteComponent'],
    };

    const postersComponent25 = {
      type: 'av.posters',
      specification: {
        destination: {
          directory: '/test/posters',
          acl: 'public',
        },
        percentage: 25,
        format: 'jpg',
      },
      successors: ['allPostersCompleteComponent'],
    };

    const postersComponent50 = {
      type: 'av.posters',
      specification: {
        destination: {
          directory: '/test/posters',
          acl: 'public',
        },
        percentage: 50,
        format: 'jpg',
      },
      successors: ['allPostersCompleteComponent'],
    };

    const postersComponent75 = {
      type: 'av.posters',
      specification: {
        destination: {
          directory: '/test/posters',
          acl: 'public',
        },
        percentage: 75,
        format: 'jpg',
      },
      successors: ['allPostersCompleteComponent'],
    };

    const allPostersCompleteComponent = {
      type: 'flow.group_wait',
      specification: {},
      callback: {
        url: 'https://www.example.com/all-posters-complete-handler',
        attachment: { hello: 'world', key1: 'value1' },
        headers: { 'header-name': 'header-value' },
      },
    };

    const flow = {
      transcodeComponent,
      storyboardComponent,
      clipComponent,
      postersComponent0,
      postersComponent25,
      postersComponent50,
      postersComponent75,
      allPostersCompleteComponent,
    };

    const callback: ICallback = {
      url: 'https://www.example.com/flow-complete-handler',
      attachment: { hello: 'world', key1: 'value1' },
      headers: { 'header-name': 'header-value' },
    };

    const invocation: IInvocation = {
      sources: [
        new Source({
          path: '/to/here/file.mp4',
        }),
      ],
      entryPoints: [
        'transcodeComponent',
        'storyboardComponent',
        'clipComponent',
        'postersComponent0',
        'postersComponent25',
        'postersComponent50',
        'postersComponent75',
      ],
      errorStrategy: ErrorStrategy.CONTINUE_ON_ERROR,
      callback,
    };

    const createFlowRequest = new CreateFlowRequest({
      invocation,
      flow,
    });

    const data: Flow = await flowManager.createFlow(createFlowRequest);
    expect(data !== null).to.be.true;
    expect(data.id).to.equal('flow_id');
    expect(data.invocation).to.deep.equal(invocation);
  });

  it('Delete Flow', done => {
    apiServer
      .delete('/_api/flow_control/flow/flow_id')
      .once()
      .replyWithFile(200, repliesDir + 'flow-delete-response.json');

    flowManager.deleteFlow('flow_id').then(() => done());
  });
});
