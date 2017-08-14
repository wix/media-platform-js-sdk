var fs = require('fs');
var nock = require('nock');
var expect = require('expect.js');
var JobManager = require('../../../../src/platform/management/job-manager');
var Configuration = require('../../../../src/platform/configuration/configuration');
var Authenticator = require('../../../../src/platform/authentication/authenticator');
var HTTPClient = require('../../../../src/platform/http/http-client');
var SearchJobsRequest = require('../../../../src/platform/management/requests/search-jobs-request');

var repliesDir = __dirname + '/replies/';

describe('job manager', function() {

    var configuration = new Configuration('manager.com', 'secret', 'appId');
    var authenticator = new Authenticator(configuration);
    var httpClient = new HTTPClient(authenticator);
    var jobManager = new JobManager(configuration, httpClient);

    var apiServer = nock('https://manager.com/').defaultReplyHeaders({
        'Content-Type': 'application/json'
    });

    afterEach(function() {
        nock.cleanAll();
    });

    it('get job', function (done) {

        apiServer.get('/_api/jobs/job-id')
            .once()
            .query(true)
            .replyWithFile(200, repliesDir + 'get-job-response.json');

        jobManager.getJob('job-id', function (error, data) {
            expect(data).to.eql({
                'id': '71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f',
                'type': 'urn:job:import.file',
                'groupId': '71f0d3fde7f348ea89aa1173299146f8',
                'issuer': 'urn:app:app-id-1',
                'status': 'success',
                'specification': {
                    'sourceUrl': 'string',
                    'destination': {
                        'directory': 'string',
                        'path': 'string',
                        'acl': 'public'
                    }
                },
                'sources': [],
                'result': {
                    'code': 0,
                    'message': 'OK',
                    'payload': {
                        'id': 'string',
                        'hash': 'string',
                        'path': 'string',
                        'mimeType': 'string',
                        'type': 'string',
                        'size': 100,
                        'acl': 'private'
                    }
                },
                'dateCreated': '2017-05-23T08:34:43Z',
                'dateUpdated': '2017-05-23T08:34:43Z'
            });
            done(error);
        });
    });

    it('get job group', function (done) {
        apiServer.get('/_api/jobs/groups/group-id')
            .once()
            .query(true)
            .replyWithFile(200, repliesDir + 'get-job-group-response.json');

        jobManager.getJobGroup('group-id', function (error, data) {
            done(error);
        });
    });

    it('search jobs', function (done) {

        apiServer.get('/_api/jobs')
            .once()
            .query(true)
            .replyWithFile(200, repliesDir + 'search-jobs-response.json');

        var searchJobsRequest = new SearchJobsRequest();

        jobManager.searchJobs(searchJobsRequest, function (error, data) {
            expect(data).to.eql({
                'nextPageToken': 'token',
                'jobs': [
                    {
                        'status': 'success',
                        'specification': {
                            'sourceUrl': 'string',
                            'destination': {
                                'directory': 'string',
                                'path': 'string',
                                'acl': 'public'
                            }
                        },
                        'dateCreated': '2017-05-23T08:34:43Z',
                        'sources': [],
                        'result': {
                            'code': 0,
                            'message': 'OK',
                            'payload': {
                                'id': 'string',
                                'hash': 'string',
                                'path': 'string',
                                'mimeType': 'string',
                                'type': 'string',
                                'size': 100,
                                'acl': 'private'
                            }
                        },
                        'id': '71f0d3fde7f348ea89aa1173299146f8_19e137e8221b4a709220280b432f947f',
                        'dateUpdated': '2017-05-23T08:34:43Z',
                        'type': 'urn:job:import.file',
                        'groupId': '71f0d3fde7f348ea89aa1173299146f8',
                        'issuer': 'urn:app:app-id-1'
                    },
                    {
                        'status': 'success',
                        'issuer': 'urn:member:112964201938603253337-ggl',
                        'type': 'urn:job:av.transcode',
                        'id': 'e8e1d5908cde4883ac30176f5ebdd68f_7b99c2ce4b5c46298ec0d02889142aa7',
                        'groupId': 'e8e1d5908cde4883ac30176f5ebdd68f',
                        'dateUpdated': '2017-05-23T23:14:31Z',
                        'dateCreated': '2017-05-23T23:14:20Z',
                        'sources': [{
                            'path': '/_end2end_test/uploaded/49c15451069444889093e8da6b715643.mp4',
                            'fileId': '49c15451069444889093e8da6b715643'
                        }],
                        'specification': {
                            'destination': {
                                'directory': null,
                                'path': '/test/outputs/144p/49c15451069444889093e8da6b715643.mp4',
                                'acl': 'public'
                            },
                            'quality': '144p',
                            'qualityRange': {
                                'maximum': null,
                                'minimum': null
                            },
                            'video': {
                                'specification': {
                                    'frameRate': '29.97',
                                    'codec': {
                                        'profile': 'main',
                                        'maxRate': 250000,
                                        'crf': 20,
                                        'name': 'h.264',
                                        'level': '3.1'
                                    },
                                    'resolution': {
                                        'width': 256,
                                        'height': 144
                                    },
                                    'keyFrame': 60
                                }
                            },
                            'audio': {
                                'specification': {
                                    'channels': 'stereo',
                                    'codec': {
                                        'cbr': 128346,
                                        'name': 'aac'
                                    }
                                }
                            }
                        },
                        'result': {
                            'code': 0,
                            'message': 'OK',
                            'payload': {
                                'info': {
                                    'audioBitrate': 128346,
                                    'format': 'mp4',
                                    'videoBitrate': 250000,
                                    'quality': '144p',
                                    'height': 144,
                                    'width': 256,
                                    'tag': 'Low',
                                    'fps': '29.97',
                                    'duration': 76444,
                                    'type': 'video',
                                    'displayAspectRatio': '16:9'
                                },
                                'file': {
                                    'mimeType': 'video/mp4',
                                    'hash': '3f3fc384df2686c2ede2b610b852a3f6',
                                    'parent': '/test/outputs/144p',
                                    'dateCreated': '2017-05-23T23:14:31Z',
                                    'path': '/test/outputs/144p/49c15451069444889093e8da6b715643.mp4',
                                    'id': '13163e5951ed4cfbaaaf6289a5a03420',
                                    'size': 2963744,
                                    'ancestors': [
                                        '/test',
                                        '/test/outputs',
                                        '/test/outputs/144p'
                                    ],
                                    'acl': 'public',
                                    'dateUpdated': '2017-05-23T23:14:31Z',
                                    'type': '-'
                                }
                            }
                        }
                    }]
            });
            done(error);
        });
    });
});

