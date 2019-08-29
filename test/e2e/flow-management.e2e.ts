import { ICallback } from '../../src/platform/management/job/callback';
import {
  ErrorStrategy,
  IInvocation,
} from '../../src/platform/management/metadata/invocation';
import { Source } from '../../src/platform/management/job/source';
import { CreateFlowRequest } from '../../src/platform/management/requests/create-flow-request';
import { Flow } from '../../src/platform/management/metadata/flow';
import { expect } from 'chai';
import * as guid from 'uuid/v4';
import { MediaPlatform } from '../../src/server';

describe('flow control e2e', function() {
  // demo account credentials
  const configuration = {
    domain: 'wixmp-410a67650b2f46baa5d003c6.appspot.com',
    appId: '48fa9aa3e9d342a3a33e66af08cd7fe3',
    sharedSecret: 'fad475d88786ab720b04f059ac674b0e',
  };

  const mediaPlatform = new MediaPlatform(configuration);

  const { flowManager } = mediaPlatform;

  // tslint:disable-next-line
  this.timeout(60000);

  it('VOD Flow', async () => {
    const baseTestFolder = `/test/js-sdk/${guid()}`;

    const transcodeComponent = {
      type: 'av.transcode',
      specification: {
        destination: {
          directory: `${baseTestFolder}/output-transcode/`,
          acl: 'public',
        },
        qualityRange: {
          minimum: '144p',
          maximum: '2160p',
        },
      },
    };

    const storyboardComponent = {
      type: 'av.transcode',
      specification: {
        destination: {
          path: `${baseTestFolder}/output-storyboard.mp4`,
          acl: 'public',
        },
        video: {
          skip: false,
          specification: {
            frameRate: null,
            frameRateFraction: '40680/1357',
            codec: {
              profile: 'main',
              name: 'h264',
              level: '3.1',
              maxRate: 100000,
              crf: 25,
              gop: {
                bAdapt: 0,
                bFrames: 2,
                bPyramid: 0,
                sceneCut: 0,
                keyInterval: 30,
                refFrame: 3,
                minKeyInterval: 30,
              },
              preset: 'faster',
            },
            resolution: {
              scaling: { algorithm: 'lanczos' },
              width: 108,
              sampleAspectRatio: '1:1',
              height: 144,
            },
            filters: [
              { name: 'unsharp', settings: { value: '5:5:0.5:3:3:0.0' } },
            ],
          },
          copy: false,
          type: 'video',
        },
        audio: { skip: true, specification: null, copy: false, type: 'audio' },
        quality: null,
      },
    };

    const clipComponent = {
      type: 'av.transcode',
      specification: {
        destination: {
          directory: `${baseTestFolder}/output-clip/`,
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
      },
    };

    const postersComponent0 = {
      type: 'av.poster',
      specification: {
        destination: {
          directory: `${baseTestFolder}/output-posters`,
          acl: 'public',
        },
        percentage: 0,
        format: 'jpg',
      },
      successors: ['allPostersCompleteComponent'],
    };

    const postersComponent25 = {
      type: 'av.poster',
      specification: {
        destination: {
          directory: `${baseTestFolder}/output-posters`,
          acl: 'public',
        },
        percentage: 25,
        format: 'jpg',
      },
      successors: ['allPostersCompleteComponent'],
    };

    const postersComponent50 = {
      type: 'av.poster',
      specification: {
        destination: {
          directory: `${baseTestFolder}/output-posters`,
          acl: 'public',
        },
        percentage: 50,
        format: 'jpg',
      },
      successors: ['allPostersCompleteComponent'],
    };

    const postersComponent75 = {
      type: 'av.poster',
      specification: {
        destination: {
          directory: `${baseTestFolder}/output-posters`,
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
        url: 'https://ent1stoh32c9r.x.pipedream.net/',
        attachment: { posters: 'complete' },
        headers: { posters: 'complete' },
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
      url: 'https://endgl2d8dilgk.x.pipedream.net/',
      attachment: { hello: 'world', key1: 'value1' },
      headers: { 'header-name': 'header-value' },
    };

    const invocation: IInvocation = {
      sources: [
        new Source({
          path: '/demo/video.mp4',
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

    let flowState: Flow = await flowManager.createFlow(createFlowRequest);
    expect(flowState).to.not.eql(null);

    await new Promise(resolve =>
      setInterval(async () => {
        flowState = await flowManager.getFlow(flowState.id as string);
        // tslint:disable-next-line:no-console
        console.log(flowState.status);
        if (flowState.status === 'success' || flowState.status === 'error') {
          resolve();
        }
      }, 1000),
    );

    expect(flowState.status).to.equal('success');
    expect(
      flowState.operations.allPostersCompleteComponent.results,
    ).to.have.lengthOf(4);
    expect(
      flowState.operations.allPostersCompleteComponent.sources,
    ).to.have.lengthOf(4);
  });
});
