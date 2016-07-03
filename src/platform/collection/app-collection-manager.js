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
AppCollectionManager.prototype.addItems = function (collectionId, newItemRequests, callback) {
    this.collectionManager.addItems(this.userId, collectionId, newItemRequests, callback);
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
 * @param {function(Error)} callback
 */
AppCollectionManager.prototype.clearItems = function (collectionId, callback) {
    this.collectionManager.clearItems(this.userId, collectionId, callback);
};

/**
 * @type {AppCollectionManager}
 */
module.exports = AppCollectionManager;

