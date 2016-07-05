var sinon = require('sinon');
var expect = require('expect.js');
var AppConfiguration = require('../../../../src/platform/configuration/app-configuration');
var AppCollectionManager = require('../../../../src/platform/collection/app-collection-manager');
var NewCollectionRequest = require('../../../../src/dto/collection/new-collection-request');
var UpdateCollectionRequest = require('../../../../src/dto/collection/update-collection-request');
var NewItemRequest = require('../../../../src/dto/collection/new-item-request');
var MediaType = require('../../../../src/dto/media-type');

describe('app collection manager', function() {

    var configuration = new AppConfiguration('test.com', 'apiKey', 'secret');
    var mockCollectionManager = {
        newCollection: sinon.spy(),
        listCollections: sinon.spy(),
        getCollection: sinon.spy(),
        updateCollection: sinon.spy(),
        deleteCollection: sinon.spy(),
        addItems: sinon.spy(),
        prependItems: sinon.spy(),
        appendItems: sinon.spy(),
        clearItems: sinon.spy()
    };

    //noinspection JSCheckFunctionSignatures
    var collectionManager = new AppCollectionManager(configuration, mockCollectionManager);

    describe('proxies calls to collection manager with apiKey as userId', function () {
        
        var callback = function (error, data) {};

        it('newCollection', function () {
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
            collectionManager.newCollection(newCollectionRequest, callback);

            expect(mockCollectionManager.newCollection.calledWith('apiKey', newCollectionRequest, callback)).to.be(true);
        });

        it('listCollection', function () {
            collectionManager.listCollections(MediaType.AUDIO, callback);

            expect(mockCollectionManager.listCollections.calledWith('apiKey', MediaType.AUDIO, callback)).to.be(true);
        });

        it('getCollection', function () {
            collectionManager.getCollection('collectionId', callback);

            expect(mockCollectionManager.getCollection.calledWith('apiKey', 'collectionId', callback)).to.be(true);
        });

        it('updateCollection', function () {

            var updateCollectionRequest = new UpdateCollectionRequest()
                .setMediaType(MediaType.AUDIO)
                .setPrivateProperties({prop: 'value'})
                .setPublicProperties({prop: 'value'})
                .setTags(['moshe', 'chaim'])
                .setThumbnailUrl('http://this.is.the/bomb')
                .setTitle('olala');
            collectionManager.updateCollection('collectionId', updateCollectionRequest, callback);

            expect(mockCollectionManager.updateCollection.calledWith('apiKey', 'collectionId', updateCollectionRequest, callback)).to.be(true);
        });

        it('deleteCollection', function () {
            collectionManager.deleteCollection('collectionId', callback);

            expect(mockCollectionManager.deleteCollection.calledWith('apiKey', 'collectionId', callback)).to.be(true);
        });

        it('addItems', function () {

            var addItemRequests = [
                new NewItemRequest()
                    .setOrdinal(1)
                    .setMediaType(MediaType.AUDIO)
                    .setPrivateProperties({prop: 'value'})
                    .setPublicProperties({prop: 'value'})
                    .setTags(['moshe', 'chaim'])
                    .setTitle('olala'),
                new NewItemRequest()
                    .setOrdinal(2)
                    .setMediaType(MediaType.AUDIO)
                    .setPrivateProperties({prop: 'value'})
                    .setPublicProperties({prop: 'value'})
                    .setTags(['moshe', 'chaim'])
                    .setTitle('olala')
            ];
            collectionManager.addItems('collectionId', addItemRequests, callback);

            expect(mockCollectionManager.addItems.calledWith('apiKey', 'collectionId', addItemRequests, callback)).to.be(true);
        });

        it('prependItems', function () {

            var addItemRequests = [
                new NewItemRequest()
                    .setOrdinal(1)
                    .setMediaType(MediaType.AUDIO)
                    .setPrivateProperties({prop: 'value'})
                    .setPublicProperties({prop: 'value'})
                    .setTags(['moshe', 'chaim'])
                    .setTitle('olala'),
                new NewItemRequest()
                    .setOrdinal(2)
                    .setMediaType(MediaType.AUDIO)
                    .setPrivateProperties({prop: 'value'})
                    .setPublicProperties({prop: 'value'})
                    .setTags(['moshe', 'chaim'])
                    .setTitle('olala')
            ];
            collectionManager.prependItems('collectionId', addItemRequests, callback);

            expect(mockCollectionManager.prependItems.calledWith('apiKey', 'collectionId', addItemRequests, callback)).to.be(true);
        });

        it('appendItems', function () {

            var addItemRequests = [
                new NewItemRequest()
                    .setOrdinal(1)
                    .setMediaType(MediaType.AUDIO)
                    .setPrivateProperties({prop: 'value'})
                    .setPublicProperties({prop: 'value'})
                    .setTags(['moshe', 'chaim'])
                    .setTitle('olala'),
                new NewItemRequest()
                    .setOrdinal(2)
                    .setMediaType(MediaType.AUDIO)
                    .setPrivateProperties({prop: 'value'})
                    .setPublicProperties({prop: 'value'})
                    .setTags(['moshe', 'chaim'])
                    .setTitle('olala')
            ];
            collectionManager.appendItems('collectionId', addItemRequests, callback);

            expect(mockCollectionManager.appendItems.calledWith('apiKey', 'collectionId', addItemRequests, callback)).to.be(true);
        });

        it('clearItems', function () {
            collectionManager.clearItems('collectionId', callback);

            expect(mockCollectionManager.clearItems.calledWith('apiKey', 'collectionId', callback)).to.be(true);
        });
    })
});