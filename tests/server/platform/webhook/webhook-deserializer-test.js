var fs = require('fs');
var expect = require('expect.js');
var jwt = require('jsonwebtoken');
var WebhookDeserializer = require('../../../../src/platform/webhook/webhook-deserializer');
var Configuration = require('../../../../src/platform/configuration/configuration');
var Authenticator = require('../../../../src/platform/authentication/authenticator');

describe('webhook deserializer', function() {

    var secret = '38a29b385eea1e889b082b56cca8578a';
    var appId = '74409c75-5b92-4cb1-a8df-0234c558dc6c';
    var configuration = new Configuration('manager.com', secret, appId);
    var authenticator = new Authenticator(configuration);
    var webhookDeserializer = new WebhookDeserializer(authenticator);

    it('file created event', function () {
        var signedToken = jwt.sign({
            'iss': 'urn:app:' + appId,
            'iat': Math.floor(Date.now() / 1000) - 100,
            'exp': Math.floor(Date.now() / 1000) + 100,
            'jti': '0ba342d2cd94',
            'event': {
                'body': {
                    'mimeType': 'text/plain',
                    'hash': 'd41d8cd98f00b204e9800998ecf8427e',
                    'parent': '/',
                    'dateCreated': '2017-02-20T14:23:42Z',
                    'path': '/place-holder.txt',
                    'id': 'd0e18fd468cd4e53bc2bbec3ca4a8676',
                    'size': 0,
                    'ancestors': ['/'],
                    'acl': 'public',
                    'dateUpdated': '2017-02-20T14:23:42Z',
                    'type': '-'
                },
                'type': 'file_created',
                'id': 'asdasDasd'
            }}, secret);

        var event = webhookDeserializer.deserialize(signedToken);

        expect(event).to.eql({
            id: 'asdasDasd',
            type: 'file_created',
            body: {
                id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
                hash: 'd41d8cd98f00b204e9800998ecf8427e',
                path: '/place-holder.txt',
                mimeType: 'text/plain',
                type: '-',
                size: 0,
                acl: 'public',
                dateCreated: '2017-02-20T14:23:42Z',
                dateUpdated: '2017-02-20T14:23:42Z'
            }
        });
    });

    it('file deleted event', function () {
        var signedToken = jwt.sign({
            'iss': 'urn:app:' + appId,
            'iat': Math.floor(Date.now() / 1000) - 100,
            'exp': Math.floor(Date.now() / 1000) + 100,
            'jti': '0ba342d2cd94',
            'event': {
                'body': {
                    'mimeType': 'text/plain',
                    'hash': 'd41d8cd98f00b204e9800998ecf8427e',
                    'parent': '/',
                    'dateCreated': '2017-02-20T14:23:42Z',
                    'path': '/place-holder.txt',
                    'id': 'd0e18fd468cd4e53bc2bbec3ca4a8676',
                    'size': 0,
                    'ancestors': ['/'],
                    'acl': 'public',
                    'dateUpdated': '2017-02-20T14:23:42Z',
                    'type': '-'
                },
                'type': 'file_deleted',
                'id': 'asdasDasd'
            }}, secret);

        var event = webhookDeserializer.deserialize(signedToken);

        expect(event).to.eql({
            id: 'asdasDasd',
            type: 'file_deleted',
            body: {
                id: 'd0e18fd468cd4e53bc2bbec3ca4a8676',
                hash: 'd41d8cd98f00b204e9800998ecf8427e',
                path: '/place-holder.txt',
                mimeType: 'text/plain',
                type: '-',
                size: 0,
                acl: 'public',
                dateCreated: '2017-02-20T14:23:42Z',
                dateUpdated: '2017-02-20T14:23:42Z'
            }
        });
    });
});

