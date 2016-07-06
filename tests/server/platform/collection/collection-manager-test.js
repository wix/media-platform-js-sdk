var nock = require('nock');
var expect = require('expect.js');
var CollectionManager = require('../../../../src/platform/collection/collection-manager');
var ProviderConfiguration = require('../../../../src/platform/configuration/provider-configuration');
var ProviderAuthenticationConfiguration = require('../../../../src/platform/authentication/configuration/provider-authentication-configuration');
var AuthenticationFacade = require('../../../../src/platform/authentication/authentication-facade');
var AuthenticatedHTTPClient = require('../../../../src/platform/http/authenticated-http-client');
var NewCollectionRequest = require('../../../../src/dto/collection/new-collection-request');
var UpdateCollectionRequest = require('../../../../src/dto/collection/update-collection-request');
var NewItemRequest = require('../../../../src/dto/collection/new-item-request');
var UpdateItemRequest = require('../../../../src/dto/collection/update-item-request');
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
            .setType('collection type')
            .setPrivateProperties({prop: 'value'})
            .setPublicProperties({prop: 'value'})
            .setTags(['moshe', 'chaim'])
            .setThumbnailUrl('http://this.is.the/bomb')
            .setTitle('olala')
            .setItems([
                new NewItemRequest()
                    .setType(MediaType.AUDIO)
                    .setPrivateProperties({fish: 'cat'})
                    .setPublicProperties({dog: 'fish'})
                    .setTags(['yap', 'nope'])
                    .setTitle('well well')
            ]);
        collectionManager.newCollection('userId', newCollectionRequest, function (error, data) {
            done(error);
        });
    });

    it('listCollection', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        collectionsServer.get('/collections').query(true).replyWithFile(200, reply + 'list-collections-reply.json');

        collectionManager.listCollections('userId', MediaType.AUDIO, function (error, data) {
            done(error);
        });
    });

    it('getCollection', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        collectionsServer.get('/collections/collectionId').query(true).replyWithFile(200, reply + 'collection-dto-reply.json');

        collectionManager.getCollection('userId', 'collectionId', function (error, data) {
            done(error);
        });
    });

    it('updateCollection', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        collectionsServer.put('/collections/collectionId').query(true).replyWithFile(200, reply + 'collection-dto-reply.json');

        var updateCollectionRequest = new UpdateCollectionRequest()
            .setPrivateProperties({prop: 'value'})
            .setPublicProperties({prop: 'value'})
            .setTags(['moshe', 'chaim'])
            .setThumbnailUrl('http://this.is.the/bomb')
            .setTitle('olala');
        collectionManager.updateCollection('userId', 'collectionId', updateCollectionRequest, function (error, data) {
            done(error);
        });
    });

    it('publishCollection', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        collectionsServer.post('/collections/collectionId').query(true).replyWithFile(200, reply + 'publish-collection-reply.json');

        collectionManager.publishCollection('userId', 'collectionId', function (error, data) {
            done(error);
        });
    });

    it('deleteCollection', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        collectionsServer.delete('/collections/collectionId').query(true).reply(200, {});

        collectionManager.deleteCollection('userId', 'collectionId', function (error, data) {
            done(error);
        });
    });

    it('prependItems', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        collectionsServer.post('/collections/collectionId/items/prepend').query(true).replyWithFile(200, reply + 'add-items-reply.json');

        var addItemRequests = [
            new NewItemRequest()
                .setType(MediaType.AUDIO)
                .setPrivateProperties({prop: 'value'})
                .setPublicProperties({prop: 'value'})
                .setTags(['moshe', 'chaim'])
                .setTitle('olala'),
            new NewItemRequest()
                .setType(MediaType.AUDIO)
                .setPrivateProperties({prop: 'value'})
                .setPublicProperties({prop: 'value'})
                .setTags(['moshe', 'chaim'])
                .setTitle('olala')
        ];
        collectionManager.prependItems('userId', 'collectionId', addItemRequests, function (error, data) {
            done(error);
        });
    });

    it('appendItems', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        collectionsServer.post('/collections/collectionId/items/append').query(true).replyWithFile(200, reply + 'add-items-reply.json');

        var addItemRequests = [
            new NewItemRequest()
                .setType(MediaType.AUDIO)
                .setPrivateProperties({prop: 'value'})
                .setPublicProperties({prop: 'value'})
                .setTags(['moshe', 'chaim'])
                .setTitle('olala'),
            new NewItemRequest()
                .setType(MediaType.AUDIO)
                .setPrivateProperties({prop: 'value'})
                .setPublicProperties({prop: 'value'})
                .setTags(['moshe', 'chaim'])
                .setTitle('olala')
        ];
        collectionManager.appendItems('userId', 'collectionId', addItemRequests, function (error, data) {
            done(error);
        });
    });

    //TODO: insertBefore

    //TODO: insertAfter

    it('updateItems', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        collectionsServer.put('/collections/collectionId/items').query(true).replyWithFile(200, reply + 'update-items-reply.json');

        var updateItemsRequest = [
            new UpdateItemRequest()
                .setId('id1')
                .setType(MediaType.AUDIO)
                .setPrivateProperties({prop: 'value'})
                .setPublicProperties({prop: 'value'})
                .setTags(['moshe', 'chaim'])
                .setTitle('olala'),
            new UpdateItemRequest()
                .setId('id2')
                .setType(MediaType.AUDIO)
                .setPrivateProperties({prop: 'value'})
                .setPublicProperties({prop: 'value'})
                .setTags(['moshe', 'chaim'])
                .setTitle('olala')
        ];
        collectionManager.updateItems('userId', 'collectionId', updateItemsRequest, function (error, data) {
            done(error);
        });
    });

    //TODO: moveToStart

    //TODO: moveToEnd

    //TODO: moveBefore

    //TODO: moveAfter

    //TODO: deleteItems

    it('clearItems', function (done) {

        authServer.times(1).reply(200, { token: 'token' });
        collectionsServer.delete('/collections/collectionId/items').query(true).reply(200, {});

        collectionManager.clearItems('userId', 'collectionId', function (error, data) {
            done(error);
        });
    });

    it('handles auth errors', function (done) {

        authServer.times(1).reply(403, {});

        collectionManager.listCollections('moshe', MediaType.AUDIO, function (error, data) {
            expect(error).to.be.a(Error);
            done();
        });
    });
});