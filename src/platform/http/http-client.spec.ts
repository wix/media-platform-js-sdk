import { expect } from 'chai';
import * as nock from 'nock';
import * as sinon from 'sinon';

import { createHTTPClient, HTTPClient } from './http-client';

describe('HTTP client', () => {
  const domain = 'https://manager.com';
  const sandbox = sinon.createSandbox();
  let apiServer;
  let httpClient: HTTPClient;

  beforeEach(() => {
    httpClient = createHTTPClient({
      domain,
      sharedSecret: 'secret',
      appId: 'appId',
    });
    apiServer = nock(domain).defaultReplyHeaders({
      'Content-Type': 'application/json',
    });
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
    if (!nock.isDone()) {
      // tslint:disable-next-line
      console.error('nock is not done', nock.pendingMocks());
    }
    nock.cleanAll();
  });

  it('should send post request', done => {
    const uri = '/_api/test-post';
    apiServer.post(uri, {}).reply(
      200,
      JSON.stringify({
        response: 'ok',
      }),
    );

    httpClient.post(`${domain}${uri}`, {}).then(response => {
      expect(response).to.deep.equal({
        response: 'ok',
      });

      done();
    });
  });

  it('should send post request with body', done => {
    const uri = '/_api/test-post';
    apiServer
      .post(uri, {
        testPost: 11,
      })
      .reply(
        200,
        JSON.stringify({
          response: 'ok-post-11',
        }),
      );

    httpClient
      .post(`${domain}${uri}`, {
        testPost: 11,
      })
      .then(response => {
        expect(response).to.deep.equal({
          response: 'ok-post-11',
        });
        done();
      });
  });

  it('should send get request', done => {
    const uri = '/_api/test-get';

    apiServer.get(uri).reply(
      200,
      JSON.stringify({
        response: 'ok',
      }),
    );

    httpClient.get(`${domain}${uri}`).then(response => {
      expect(response).to.deep.equal({
        response: 'ok',
      });

      done();
    });
  });

  it('should send get request with query', done => {
    const uri = '/_api/test-get';
    apiServer
      .get(uri)
      .query({ test: 11 })
      .reply(
        200,
        JSON.stringify({
          response: 'ok-get-11',
        }),
      );

    httpClient
      .get(`${domain}${uri}`, {
        test: 11,
      })
      .then(response => {
        expect(response).to.deep.equal({
          response: 'ok-get-11',
        });
        done();
      });
  });

  it('should send put request', done => {
    const uri = '/_api/test-put';

    apiServer.put(uri, {}).reply(
      200,
      JSON.stringify({
        response: 'ok',
      }),
    );

    httpClient.put(`${domain}${uri}`).then(response => {
      expect(response).to.deep.equal({
        response: 'ok',
      });

      done();
    });
  });

  it('should send put request with body', done => {
    const uri = '/_api/test-put';

    apiServer
      .put(uri, {
        testPost: 11,
      })
      .reply(
        200,
        JSON.stringify({
          response: 'ok-put-11',
        }),
      );

    httpClient
      .put(`${domain}${uri}`, {
        testPost: 11,
      })
      .then(response => {
        expect(response).to.deep.equal({
          response: 'ok-put-11',
        });

        done();
      });
  });

  it("should do 'GET' request on get()", async () => {
    const uri = '/_api/test-get';
    apiServer
      .get(uri)
      .query({ test: 'get' })
      .reply(
        200,
        JSON.stringify({
          response: 'ok-get-11',
        }),
      );
    const response = await httpClient.get(`${domain}${uri}`, {
      test: 'get',
    });
    expect(response).to.deep.equal({
      response: 'ok-get-11',
    });
  });

  it('should resolve with what server replied', done => {
    const uri = '/_api/test-get';
    apiServer
      .get(uri)
      .query({ test: 11 })
      .reply(
        200,
        JSON.stringify({
          response: 'ok-get-11',
        }),
      );

    httpClient
      .get(`${domain}${uri}`, {
        test: 11,
      })
      .then(response => {
        expect(response).to.deep.equal({
          response: 'ok-get-11',
        });
        done();
      });
  });

  it('should reject with what server replied', done => {
    const uri = '/_api/test-get';
    apiServer
      .get(uri)
      .query({ test: 11 })
      .reply(
        500,
        JSON.stringify({
          response: 'error-get-11',
        }),
      );

    httpClient
      .get(`${domain}${uri}`, {
        test: 11,
      })
      .catch(error => {
        expect(JSON.parse(error.message)).to.deep.equal({
          response: 'error-get-11',
        });
        done();
      });
  });

  it("should do 'PUT' request on put()", async () => {
    const uri = '/_api/test-put';
    apiServer.put(uri, { test: 'put' }).reply(
      200,
      JSON.stringify({
        response: 'ok-put-11',
      }),
    );
    const response = await httpClient.put(`${domain}${uri}`, {
      test: 'put',
    });
    expect(response).to.deep.equal({
      response: 'ok-put-11',
    });
  });

  it('should resolve for put with what server replied', done => {
    const uri = '/_api/test-put';
    apiServer.put(uri, { test: 11 }).reply(
      200,
      JSON.stringify({
        response: 'ok-put-11',
      }),
    );

    httpClient
      .put(`${domain}${uri}`, {
        test: 11,
      })
      .then(response => {
        expect(response).to.deep.equal({
          response: 'ok-put-11',
        });
        done();
      });
  });

  it('should reject for PUT with what server replied', done => {
    const uri = '/_api/test-put';
    apiServer.put(uri, { test: 11 }).reply(
      500,
      JSON.stringify({
        response: 'error-put-112',
      }),
    );

    httpClient
      .put(`${domain}${uri}`, {
        test: 11,
      })
      .catch(error => {
        expect(JSON.parse(error.message)).to.deep.equal({
          response: 'error-put-112',
        });
        done();
      });
  });

  it("should do 'POST' request on post()", async () => {
    const uri = '/_api/test-post';
    apiServer.post(uri, { test: 'post' }).reply(
      200,
      JSON.stringify({
        response: 'ok-post-11',
      }),
    );
    // const token = new Token();
    const response = await httpClient.post(`${domain}${uri}`, {
      test: 'post',
    });
    expect(response).to.deep.equal({
      response: 'ok-post-11',
    });
  });

  it('should resolve for post with what server replied', done => {
    const uri = '/_api/test-post';
    apiServer.post(uri, { test: 11 }).reply(
      200,
      JSON.stringify({
        response: 'ok-post-11',
      }),
    );

    httpClient
      .post(`${domain}${uri}`, {
        test: 11,
      })
      .then(response => {
        expect(response).to.deep.equal({
          response: 'ok-post-11',
        });
        done();
      });
  });

  it('should reject for POST with what server replied', done => {
    const uri = '/_api/test-post';
    apiServer.post(uri, { test: 11 }).reply(
      500,
      JSON.stringify({
        response: 'error-post-11',
      }),
    );

    httpClient
      .post(`${domain}${uri}`, {
        test: 11,
      })
      .catch(error => {
        expect(JSON.parse(error.message)).to.deep.equal({
          response: 'error-post-11',
        });
        done();
      });
  });

  it('should add auth header to URL', done => {
    const uri = 'http://example.com/_api/test-post';

    httpClient.addAuthToUrl(uri).then(response => {
      expect(response).to.include(
        'http://example.com/_api/test-post?Authorization=',
      );
      done();
    });
  });

  it('should add auth header to URL with existing query', done => {
    const uri = 'http://example.com/_api/test-post?query=value';

    httpClient.addAuthToUrl(uri).then(response => {
      expect(response).to.include(
        'http://example.com/_api/test-post?query=value&Authorization=',
      );
      done();
    });
  });

  it('should add auth header to URL will replace existing Authorization token', done => {
    const uri =
      'http://example.com/_api/test-post?Authorization=shouldnotbehere';

    httpClient.addAuthToUrl(uri).then(response => {
      expect(response).to.not.include('?Authorization=shouldnotbehere');
      expect(response).to.include(
        'http://example.com/_api/test-post?Authorization=',
      );
      done();
    });
  });

  describe('DELETE', () => {
    it('should get 200', done => {
      const uri = '/_api/test-delete';

      apiServer.delete(uri).reply(
        200,
        JSON.stringify({
          response: 'ok',
        }),
      );

      httpClient.delete(`${domain}${uri}`).then(response => {
        expect(response).to.deep.equal({
          response: 'ok',
        });

        done();
      });
    });

    it('should get 400', done => {
      const uri = '/_api/test-delete';

      apiServer.delete(uri).reply(
        400,
        JSON.stringify({
          response: 'delete-error',
        }),
      );

      httpClient.delete(`${domain}${uri}`).catch(error => {
        expect(JSON.parse(error.message)).to.deep.equal({
          response: 'delete-error',
        });

        done();
      });
    });
  });
});
