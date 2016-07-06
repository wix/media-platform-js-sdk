var sinon = require('sinon');
var expect = require('expect.js');
var AppConfiguration = require('../../../../src/platform/configuration/app-configuration');
var AppCollectionManager = require('../../../../src/platform/collection/app-collection-manager');
var NewCollectionRequest = require('../../../../src/dto/collection/new-collection-request');
var UpdateCollectionRequest = require('../../../../src/dto/collection/update-collection-request');
var NewItemRequest = require('../../../../src/dto/collection/new-item-request');
var UpdateItemRequest = require('../../../../src/dto/collection/update-item-request');
var MediaType = require('../../../../src/dto/media-type');

describe('app collection manager', function() {

    var configuration = new AppConfiguration('test.com', 'apiKey', 'secret');
    var mockCollectionManager = {
        newCollection: sinon.spy(),
        listCollections: sinon.spy(),
        getCollection: sinon.spy(),
        updateCollection: sinon.spy(),
        publishCollection: sinon.spy(),
        deleteCollection: sinon.spy(),
        prependItems: sinon.spy(),
        appendItems: sinon.spy(),
        insertBefore: sinon.spy(),
        insertAfter: sinon.spy(),
        updateItems: sinon.spy(),
        moveToStart: sinon.spy(),
        moveToEnd: sinon.spy(),
        moveBefore: sinon.spy(),
        moveAfter: sinon.spy(),
        deleteItems: sinon.spy(),
        clearItems: sinon.spy()
    };

    //noinspection JSCheckFunctionSignatures
    var collectionManager = new AppCollectionManager(configuration, mockCollectionManager);

    describe('proxies calls to collection manager with apiKey as userId', function () {

        var callback = function (error, data) {};

        it('newCollection', function () {
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
                .setPrivateProperties({prop: 'value'})
                .setPublicProperties({prop: 'value'})
                .setTags(['moshe', 'chaim'])
                .setThumbnailUrl('http://this.is.the/bomb')
                .setTitle('olala');
            collectionManager.updateCollection('collectionId', updateCollectionRequest, callback);

            expect(mockCollectionManager.updateCollection.calledWith('apiKey', 'collectionId', updateCollectionRequest, callback)).to.be(true);
        });

        it('publishCollection', function () {
            collectionManager.publishCollection('collectionId', callback);

            expect(mockCollectionManager.publishCollection.calledWith('apiKey', 'collectionId', callback)).to.be(true);
        });

        it('deleteCollection', function () {
            collectionManager.deleteCollection('collectionId', callback);

            expect(mockCollectionManager.deleteCollection.calledWith('apiKey', 'collectionId', callback)).to.be(true);
        });

        it('prependItems', function () {

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
            collectionManager.prependItems('collectionId', addItemRequests, callback);

            expect(mockCollectionManager.prependItems.calledWith('apiKey', 'collectionId', addItemRequests, callback)).to.be(true);
        });

        it('appendItems', function () {

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
            collectionManager.appendItems('collectionId', addItemRequests, callback);

            expect(mockCollectionManager.appendItems.calledWith('apiKey', 'collectionId', addItemRequests, callback)).to.be(true);
        });

        it('insertBefore', function () {

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
            collectionManager.insertBefore('collectionId', 'itemId', addItemRequests, callback);

            expect(mockCollectionManager.insertBefore.calledWith('apiKey', 'collectionId', 'itemId', addItemRequests, callback)).to.be(true);
        });

        it('insertAfter', function () {

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
            collectionManager.insertAfter('collectionId', 'itemId', addItemRequests, callback);

            expect(mockCollectionManager.insertAfter.calledWith('apiKey', 'collectionId', 'itemId', addItemRequests, callback)).to.be(true);
        });

        it('updateItems', function () {

            var updateItemRequests = [
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
            collectionManager.updateItems('collectionId', updateItemRequests, callback);

            expect(mockCollectionManager.updateItems.calledWith('apiKey', 'collectionId', updateItemRequests, callback)).to.be(true);
        });

        it('moveToStart', function () {

            collectionManager.moveToStart('collectionId', ['id1', 'id2'], callback);

            expect(mockCollectionManager.moveToStart.calledWith('apiKey', 'collectionId', ['id1', 'id2'], callback)).to.be(true);
        });

        it('moveToEnd', function () {

            collectionManager.moveToEnd('collectionId', ['id1', 'id2'], callback);

            expect(mockCollectionManager.moveToEnd.calledWith('apiKey', 'collectionId', ['id1', 'id2'], callback)).to.be(true);
        });

        it('moveBefore', function () {
            collectionManager.moveBefore('collectionId', 'itemId', ['id1', 'id2'], callback);

            expect(mockCollectionManager.moveBefore.calledWith('apiKey', 'collectionId', 'itemId', ['id1', 'id2'], callback)).to.be(true);
        });

        it('moveAfter', function () {
            collectionManager.moveAfter('collectionId', 'itemId', ['id1', 'id2'], callback);

            expect(mockCollectionManager.moveAfter.calledWith('apiKey', 'collectionId', 'itemId', ['id1', 'id2'], callback)).to.be(true);
        });

        it('deleteItems', function () {
            collectionManager.deleteItems('collectionId', ['id1', 'id2'], callback);

            expect(mockCollectionManager.deleteItems.calledWith('apiKey', 'collectionId', ['id1', 'id2'], callback)).to.be(true);
        });

        it('clearItems', function () {
            collectionManager.clearItems('collectionId', callback);

            expect(mockCollectionManager.clearItems.calledWith('apiKey', 'collectionId', callback)).to.be(true);
        });
    })
});