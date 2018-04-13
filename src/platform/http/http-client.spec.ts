import * as nock from 'nock';
import {sandbox as sinonSandbox} from 'sinon';
import {expect} from 'chai';
import {createHTTPClient, HTTPClient} from './http-client';
import {Token} from '../authentication/token';

describe('HTTP client', () => {
  const domain = 'https://manager.com';
  let apiServer;
  let httpClient: HTTPClient;
  const sandbox = sinonSandbox.create();

  beforeEach(() => {
    httpClient = createHTTPClient({
      domain,
      sharedSecret: 'secret',
      appId: 'appId'
    });
    apiServer = nock(domain).defaultReplyHeaders({
      'Content-Type': 'application/json'
    });
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
    if (!nock.isDone()) {
      console.error('nock is not done', nock.pendingMocks());
    }
    nock.cleanAll();
  });


  it('should send post request', (done) => {
    const uri = '/_api/test-post';
    apiServer
      .post(uri, {})
      .reply(200, JSON.stringify({
        response: 'ok'
      }));

    httpClient.request('POST', `${domain}${uri}`, {}, undefined, (error, response) => {
      expect(response).to.deep.equal({
        response: 'ok'
      });
      done();
    })
  });

  it('should send post request with body', (done) => {
    const uri = '/_api/test-post';
    apiServer
      .post(uri, {
        testPost: 11
      })
      .reply(200, JSON.stringify({
        response: 'ok-post-11'
      }));

    httpClient.request('POST', `${domain}${uri}`, {
      testPost: 11
    }, undefined, (error, response) => {
      expect(response).to.deep.equal({
        response: 'ok-post-11'
      });
      done();
    })
  });

  it('should send get request', (done) => {
    const uri = '/_api/test-get';
    apiServer
      .get(uri)
      .reply(200, JSON.stringify({
        response: 'ok'
      }));

    httpClient.request('GET', `${domain}${uri}`, {}, undefined, (error, response) => {
      expect(response).to.deep.equal({
        response: 'ok'
      });
      done();
    })
  });

  it('should send get request with query', (done) => {
    const uri = '/_api/test-get';
    apiServer
      .get(uri)
      .query({test: 11})
      .reply(200, JSON.stringify({
        response: 'ok-get-11'
      }));

    httpClient.request(
      'GET',
      `${domain}${uri}`,
      {test: 11},
      undefined,
      (error, response) => {
        expect(response).to.deep.equal({
          response: 'ok-get-11'
        });
        done();
      })
  });

  it('should send put request', (done) => {
    const uri = '/_api/test-put';

    apiServer
      .put(uri, {})
      .reply(200, JSON.stringify({
        response: 'ok'
      }));

    httpClient.request('PUT', `${domain}${uri}`, {}, undefined, (error, response) => {
      expect(response).to.deep.equal({
        response: 'ok'
      });
      done();
    })
  });

  it('should send put request with body', (done) => {
    const uri = '/_api/test-put';

    apiServer
      .put(uri, {
        testPost: 11
      })
      .reply(200, JSON.stringify({
        response: 'ok-put-11'
      }));

    httpClient.request('PUT', `${domain}${uri}`, {
      testPost: 11
    }, undefined, (error, response) => {
      expect(response).to.deep.equal({
        response: 'ok-put-11'
      });
      done();
    })
  });

  it('should do \'GET\' request on get()', async () => {
    const uri = '/_api/test-get';
    apiServer
      .get(uri)
      .query({test: 'get'})
      .reply(200, JSON.stringify({
        response: 'ok-get-11'
      }));
    const response = await httpClient
      .get(`${domain}${uri}`, {
        test: 'get'
      });
    expect(response).to.deep.equal({
      response: 'ok-get-11'
    });
  });

  it('should resolve with what server replied', (done) => {
    const uri = '/_api/test-get';
    apiServer
      .get(uri)
      .query({test: 11})
      .reply(200, JSON.stringify({
        response: 'ok-get-11'
      }));

    httpClient
      .get(`${domain}${uri}`, {
        test: 11
      })
      .then(response => {
        expect(response).to.deep.equal({
          response: 'ok-get-11'
        });
        done();
      });
  });

  it('should reject with what server replied', (done) => {
    const uri = '/_api/test-get';
    apiServer
      .get(uri)
      .query({test: 11})
      .reply(500, JSON.stringify({
        response: 'error-get-11'
      }));

    httpClient
      .get(`${domain}${uri}`, {
        test: 11
      })
      .catch(error => {
        expect(JSON.parse(error.message)).to.deep.equal({
          response: 'error-get-11'
        });
        done();
      });
  });

  it('should do \'PUT\' request on put()', async () => {
    const uri = '/_api/test-put';
    apiServer
      .put(uri, {test: 'put'})
      .reply(200, JSON.stringify({
        response: 'ok-put-11'
      }));
    const response = await httpClient
      .put(`${domain}${uri}`, {
        test: 'put'
      });
    expect(response).to.deep.equal({
      response: 'ok-put-11'
    });
  });

  it('should resolve for put with what server replied', (done) => {
    const uri = '/_api/test-put';
    apiServer
      .put(uri, {test: 11})
      .reply(200, JSON.stringify({
        response: 'ok-put-11'
      }));

    httpClient
      .put(`${domain}${uri}`, {
        test: 11
      })
      .then(response => {
        expect(response).to.deep.equal({
          response: 'ok-put-11'
        });
        done();
      });
  });

  it('should reject for PUT with what server replied', (done) => {
    const uri = '/_api/test-put';
    apiServer
      .put(uri, {test: 11})
      .reply(500, JSON.stringify({
        response: 'error-put-11'
      }));

    httpClient
      .put(`${domain}${uri}`, {
        test: 11
      })
      .catch(error => {
        expect(JSON.parse(error.message)).to.deep.equal({
          response: 'error-put-11'
        });
        done();
      });
  });


  it('should do \'POST\' request on post()', async () => {
    const uri = '/_api/test-post';
    apiServer
      .post(uri, {test: 'post'})
      .reply(200, JSON.stringify({
        response: 'ok-post-11'
      }));
    // const token = new Token();
    const response = await httpClient
      .post(`${domain}${uri}`, {
        test: 'post'
      });
    expect(response).to.deep.equal({
      response: 'ok-post-11'
    });
  });

  it('should resolve for post with what server replied', (done) => {
    const uri = '/_api/test-post';
    apiServer
      .post(uri, {test: 11})
      .reply(200, JSON.stringify({
        response: 'ok-post-11'
      }));

    httpClient
      .post(`${domain}${uri}`, {
        test: 11
      })
      .then(response => {
        expect(response).to.deep.equal({
          response: 'ok-post-11'
        });
        done();
      });
  });

  it('should reject for POST with what server replied', (done) => {
    const uri = '/_api/test-post';
    apiServer
      .post(uri, {test: 11})
      .reply(500, JSON.stringify({
        response: 'error-post-11'
      }));

    httpClient
      .post(`${domain}${uri}`, {
        test: 11
      })
      .catch(error => {
        expect(JSON.parse(error.message)).to.deep.equal({
          response: 'error-post-11'
        });
        done();
      });
  });
});
