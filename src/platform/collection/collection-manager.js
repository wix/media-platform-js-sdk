var CollectionDTO = require('../../dto/collection/collection-dto');
var ItemDTO = require('../../dto/collection/item-dto');

/**
 * @param {ProviderConfiguration} configuration
 * @param {AuthenticatedHTTPClient} authenticatedHttpClient
 * @constructor
 */
function CollectionManager(configuration, authenticatedHttpClient) {

    /**
     * @type {AuthenticatedHTTPClient}
     */
    this.authenticatedHttpClient = authenticatedHttpClient;

    this.configuration = configuration;

    this.baseUrl = 'https://' + this.configuration.domain;
}

/**
 * @param {string} userId
 * @param {NewCollectionRequest} newCollectionRequest
 * @param {function(Error, CollectionDTO)} callback
 */
CollectionManager.prototype.newCollection = function (userId, newCollectionRequest, callback) {

    this.authenticatedHttpClient.jsonRequest('POST', this.baseUrl + '/collections', userId, newCollectionRequest.toParams(),
        function (error, response) {

            if (error) {
                callback(error, null);
                return;
            }

            callback(null, new CollectionDTO(response.collection));
        });
};
//POST /collections

/**
 * @param {string} userId
 * @param {string} mediaType
 * @param {function(Error, Array<CollectionDTO>)} callback
 */
CollectionManager.prototype.listCollections = function (userId, mediaType, callback) {
    this.authenticatedHttpClient.jsonRequest('GET', this.baseUrl + '/collections', userId, {type: mediaType},
        function (error, response) {

            if (error) {
                callback(error, null);
                return;
            }
            
            var collections = response.collections.map(function (item) {
                return new CollectionDTO(item);
            });

            callback(null, collections);
        });
};
//GET /collections

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {function(Error, CollectionDTO)} callback
 */
CollectionManager.prototype.getCollection = function (userId, collectionId, callback) {
    this.authenticatedHttpClient.jsonRequest('GET', this.baseUrl + '/collections/' + collectionId, userId, {},
        function (error, response) {

            if (error) {
                callback(error, null);
                return;
            }

            callback(null, new CollectionDTO(response.collection));
        });
};
//GET /collections/{collectionId}

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {UpdateCollectionRequest} updateCollectionRequest
 * @param {function(Error, CollectionDTO)} callback
 */
CollectionManager.prototype.updateCollection = function (userId, collectionId, updateCollectionRequest, callback) {
    this.authenticatedHttpClient.jsonRequest('PUT', this.baseUrl + '/collections/' + collectionId, userId, updateCollectionRequest.toParams(),
        function (error, response) {

            if (error) {
                callback(error, null);
                return;
            }

            callback(null, new CollectionDTO(response.collection));
        });
};
//PUT /collections/{collectionId}

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {function(Error)} callback
 */
CollectionManager.prototype.deleteCollection = function (userId, collectionId, callback) {
    this.authenticatedHttpClient.jsonRequest('DELETE', this.baseUrl + '/collections/' + collectionId, userId, {},
        function (error, response) {

            if (error) {
                callback(error);
                return;
            }

            callback(null);
        });
};
//DELETE /collections/{collectionId}

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {Array<NewItemRequest>} newItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.addItems = function (userId, collectionId, newItemRequests, callback) {

    var params = newItemRequests.map(function (newItemRequest) {
        return newItemRequest.toParams();
    });

    this.authenticatedHttpClient.jsonRequest('PUT', this.baseUrl + '/collections/' + collectionId + '/items', userId, { items: params },
        function (error, response) {

            if (error) {
                callback(error, null);
                return;
            }

            var items = response.items.map(function (item) {
               return new ItemDTO(item);
            });

            callback(null, items);
        });
};
//PUT /collections/{collectionId}/items

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {Array<NewItemRequest>} newItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.prependItems = function (userId, collectionId, newItemRequests, callback) {

    var params = newItemRequests.map(function (newItemRequest) {
        return newItemRequest.toParams();
    });

    this.authenticatedHttpClient.jsonRequest('POST', this.baseUrl + '/collections/' + collectionId + '/items/prepend', userId, { items: params },
        function (error, response) {

            if (error) {
                callback(error, null);
                return;
            }

            var items = response.items.map(function (item) {
                return new ItemDTO(item);
            });

            callback(null, items);
        });
};
//POST /collections/{collectionId}/items/prepend

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {Array<NewItemRequest>} newItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.appendItems = function (userId, collectionId, newItemRequests, callback) {
    var params = newItemRequests.map(function (newItemRequest) {
        return newItemRequest.toParams();
    });

    this.authenticatedHttpClient.jsonRequest('POST', this.baseUrl + '/collections/' + collectionId + '/items/append', userId, { items: params },
        function (error, response) {

            if (error) {
                callback(error, null);
                return;
            }

            var items = response.items.map(function (item) {
                return new ItemDTO(item);
            });

            callback(null, items);
        });
};
//POST /collections/{collectionId}/items/append

// TODO: delete item from collection
// CollectionManager.prototype.deleteItem = function () {
//
// };

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {function(Error)} callback
 */
CollectionManager.prototype.clearItems = function (userId, collectionId, callback) {
    this.authenticatedHttpClient.jsonRequest('DELETE', this.baseUrl + '/collections/' + collectionId + '/items', userId, {},
        function (error, response) {

            if (error) {
                callback(error);
                return;
            }

            callback(null);
        });
};
//DELETE /collections/{collectionId}/items

/**
 * @type {CollectionManager}
 */
module.exports = CollectionManager;

