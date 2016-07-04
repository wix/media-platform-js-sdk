var nock = require('nock');
var expect = require('expect.js');
var CollectionManager = require('../../../../src/platform/collection/collection-manager');
var ProviderConfiguration = require('../../../../src/platform/configuration/provider-configuration');
var ProviderAuthenticationConfiguration = require('../../../../src/platform/authentication/configuration/provider-authentication-configuration');
var AuthenticationFacade = require('../../../../src/platform/authentication/authentication-facade');
var AuthenticatedHTTPClient = require('../../../../src/platform/http/authenticated-http-client');
var NewCollectionRequest = require('../../../../src/dto/collection/new-collection-request');
var NewItemRequest = require('../../../../src/dto/collection/new-item-request');
var MediaType = require('../../../../src/dto/media-type');

var reply = __dirname + '/replies/';

describe('collection manager', function() {

    var configuration = new ProviderConfiguration('collection.com', 'secret');
    var authenticationConfiguration = new ProviderAuthenticationConfiguration(configuration);
    var authenticationFacade = new AuthenticationFacade(authenticationConfiguration);
    var httpClient = new AuthenticatedHTTPClient(authenticationFacade);
    var collectionManager = new CollectionManager(configuration, httpClient);

    var authServer = nock('https://collection.com/').get('/auth/tenant/token');
    var collectionsServer = nock('https://collection.com/');

    it('newCollection', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        collectionsServer.post('/collections').query(true).replyWithFile(200, reply + 'collection-dto-reply.json');

        var newCollectionRequest = new NewCollectionRequest()
            .setMediaType(MediaType.AUDIO)
            .setPrivateProperties({prop: 'value'})
            .setPublicProperties({prop: 'value'})
            .setTags(['moshe', 'chaim'])
            .setThumbnailUrl('http://this.is.the/bomb')
            .setTitle('olala')
            .setItems([
                new NewItemRequest()
                    .setMediaType(MediaType.AUDIO)
                    .setOrdinal(10)
                    .setPrivateProperties({fish: 'cat'})
                    .setPublicProperties({dog: 'fish'})
                    .setTags(['yap', 'nope'])
                    .setTitle('well well')
            ]);
        collectionManager.newCollection('userId', newCollectionRequest, function (error, data) {
            console.log(JSON.stringify(data, null, 2));
            done(error);
        });
    });

    it('handles auth errors', function (done) {

        authServer.times(1).reply(403, {});

        //noinspection JSAccessibilityCheck
        collectionManager.listCollections('moshe', MediaType.AUDIO, function (error, data) {
            expect(error).to.be.a(Error);
            done();
        });
    });
});