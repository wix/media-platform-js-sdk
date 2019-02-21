import {expect} from 'chai';
import * as fauxJax from 'faux-jax';
import * as sinon from 'sinon';

import {HTTPClient} from '../../../src/public/platform/http/browser-http-client';


describe('browser http client', function () {
  // tslint:disable-next-line
  this.timeout(50000);

  const configuration = {
    domain: 'www.domain.com',
    authenticationUrl: 'https://www.myapp.com/auth'
  };
  let browserHTTPClient;
  const sandbox = sinon.createSandbox();
  const authResponse = 'Authorization: auth';

  beforeEach(() => {
    fauxJax.install();
    browserHTTPClient = new HTTPClient(configuration.authenticationUrl);
  });

  afterEach(() => {
    fauxJax.restore();
    sandbox.verifyAndRestore();
  });

  it('should add authentication header to URL', async () => {
    setResponse(authResponse);
    const url = await browserHTTPClient.addAuthToUrl('http://www.example.com/');
    expect(url).to.contain('?Authorization=');
  });


  function setResponse(responseBody, responseStatus = 200) {
    fauxJax.on('request', (request) => {
      if (request.requestURL === 'https://www.myapp.com/auth') {
        request.respond(200, {'Content-Type': 'application/json'},
          JSON.stringify({
            Authorization: 'auth'
          })
        );
        return;
      }
    });
  }
});
