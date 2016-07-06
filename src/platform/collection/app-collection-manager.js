/**
 * @param {AppConfiguration} configuration
 * @param {CollectionManager} collectionManager
 * @constructor
 */
function AppCollectionManager(configuration, collectionManager) {

    /**
     * @type {CollectionManager}
     */
    this.collectionManager = collectionManager;

    /**
     * @type {string}
     */
    this.userId = configuration.apiKey;
}

/**
 * @param {NewCollectionRequest} newCollectionRequest
 * @param {function(Error, CollectionDTO)} callback
 */
AppCollectionManager.prototype.newCollection = function (newCollectionRequest, callback) {
    this.collectionManager.newCollection(this.userId, newCollectionRequest, callback);
};

/**
 * @param {string} mediaType
 * @param {function(Error, Array<CollectionDTO>)} callback
 */
AppCollectionManager.prototype.listCollections = function (mediaType, callback) {
    this.collectionManager.listCollections(this.userId, mediaType, callback);
};

/**
 * @param {string} collectionId
 * @param {function(Error, CollectionDTO)} callback
 */
AppCollectionManager.prototype.getCollection = function (collectionId, callback) {
    this.collectionManager.getCollection(this.userId, collectionId, callback);
};

/**
 * @param {string} collectionId
 * @param {UpdateCollectionRequest} updateCollectionRequest
 * @param {function(Error, CollectionDTO)} callback
 */
AppCollectionManager.prototype.updateCollection = function (collectionId, updateCollectionRequest, callback) {
    this.collectionManager.updateCollection(this.userId, collectionId, updateCollectionRequest, callback);
};

/**
 * @param {string} collectionId
 * @param {function(Error, CollectionDTO)} callback
 */
AppCollectionManager.prototype.publishCollection = function (collectionId, callback) {
    this.collectionManager.publishCollection(this.userId, collectionId, callback);
};

/**
 * @param {string} collectionId
 * @param {function(Error)} callback
 */
AppCollectionManager.prototype.deleteCollection = function (collectionId, callback) {
    this.collectionManager.deleteCollection(this.userId, collectionId, callback);
};

/**
 * @param {string} collectionId
 * @param {Array<NewItemRequest>} newItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
AppCollectionManager.prototype.prependItems = function (collectionId, newItemRequests, callback) {
    this.collectionManager.prependItems(this.userId, collectionId, newItemRequests, callback);
};

/**
 * @param {string} collectionId
 * @param {Array<NewItemRequest>} newItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
AppCollectionManager.prototype.appendItems = function (collectionId, newItemRequests, callback) {
    this.collectionManager.appendItems(this.userId, collectionId, newItemRequests, callback);
};

/**
 * @param {string} collectionId
 * @param {string} itemId
 * @param {Array<NewItemRequest>} newItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
AppCollectionManager.prototype.insertBefore = function (collectionId, itemId, newItemRequests, callback) {
    this.collectionManager.insertBefore(this.userId, collectionId, itemId, newItemRequests, callback);
};

/**
 * @param {string} collectionId
 * @param {string} itemId
 * @param {Array<NewItemRequest>} newItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
AppCollectionManager.prototype.insertAfter = function (collectionId, itemId, newItemRequests, callback) {
    this.collectionManager.insertAfter(this.userId, collectionId, itemId, newItemRequests, callback);
};

/**
 * @param {string} collectionId
 * @param {Array<UpdateItemRequest>} updateItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
AppCollectionManager.prototype.updateItems = function (collectionId, updateItemRequests, callback) {
    this.collectionManager.updateItems(this.userId, collectionId, updateItemRequests, callback);
};

/**
 * @param {string} collectionId
 * @param {Array<string>} itemIds
 * @param {function(Error, Array<ItemDTO>)} callback
 */
AppCollectionManager.prototype.moveToStart = function (collectionId, itemIds, callback) {
    this.collectionManager.moveToStart(this.userId, collectionId, itemIds, callback);
};

/**
 * @param {string} collectionId
 * @param {Array<string>} itemIds
 * @param {function(Error, Array<ItemDTO>)} callback
 */
AppCollectionManager.prototype.moveToEnd = function (collectionId, itemIds, callback) {
    this.collectionManager.moveToEnd(this.userId, collectionId, itemIds, callback);
};

/**
 * @param {string} collectionId
 * @param {string} itemId
 * @param {Array<string>} itemIds
 * @param {function(Error, Array<ItemDTO>)} callback
 */
AppCollectionManager.prototype.moveBefore = function (collectionId, itemId, itemIds, callback) {
    this.collectionManager.moveBefore(this.userId, collectionId, itemId, itemIds, callback);
};

/**
 * @param {string} collectionId
 * @param {string} itemId
 * @param {Array<string>} itemIds
 * @param {function(Error, Array<ItemDTO>)} callback
 */
AppCollectionManager.prototype.moveAfter = function (collectionId, itemId, itemIds, callback) {
    this.collectionManager.moveAfter(this.userId, collectionId, itemId, itemIds, callback);
};

/**
 * @param {string} collectionId
 * @param {Array<string>} itemIds
 * @param {function(Error, Array<ItemDTO>)} callback
 */
AppCollectionManager.prototype.deleteItems = function (collectionId, itemIds, callback) {
    this.collectionManager.deleteItems(this.userId, collectionId, itemIds, callback);
};

/**
 * @param {string} collectionId
 * @param {function(Error)} callback
 */
AppCollectionManager.prototype.clearItems = function (collectionId, callback) {
    this.collectionManager.clearItems(this.userId, collectionId, callback);
};

/**
 * @type {AppCollectionManager}
 */
module.exports = AppCollectionManager;

