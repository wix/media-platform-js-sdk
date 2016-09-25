var nock = require('nock');
var expect = require('expect.js');
var Configuration = require('../../../../src/platform/configuration/configuration');
var AuthenticationConfiguration = require('../../../../src/platform/authentication/configuration/authentication-configuration');
var AuthenticationFacade = require('../../../../src/platform/authentication/authentication-facade');
var AuthenticatedHTTPClient = require('../../../../src/platform/http/authenticated-http-client');
var FileDownloader = require('../../../../src/platform/download/file-downloader');
var GetSecureURLRequest = require('../../../../src/dto/download/get-secure-url-request');

var reply = __dirname + '/replies/';

describe('file downloader', function() {

    var configuration = new Configuration('download.com', 'secret', 'appId');
    var authenticationConfiguration = new AuthenticationConfiguration(configuration);
    var authenticationFacade = new AuthenticationFacade(authenticationConfiguration);
    var httpClient = new AuthenticatedHTTPClient(authenticationFacade);
    var fileDownloader = new FileDownloader(configuration, httpClient);

    describe('get secure download url', function () {

        it('return secure ULRs', function (done) {
            var fileServer = nock('https://download.com/').post('/secure-files/fileId/tickets/create');
            fileServer.replyWithFile(200, reply + 'get-secure-download-url-response.json');


            var getSecureUrlRequest = new GetSecureURLRequest()
                    .setFileId('fileId')
                    .addEncoding('src');
            //noinspection JSAccessibilityCheck
            fileDownloader.getSecureUrls('userId', getSecureUrlRequest, function (error, data) {
                done(error);
            });
        });
    })
});