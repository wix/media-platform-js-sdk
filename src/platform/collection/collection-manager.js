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
 * @param {string} type
 * @param {function(Error, Array<CollectionDTO>)} callback
 */
CollectionManager.prototype.listCollections = function (userId, type, callback) {
    this.authenticatedHttpClient.jsonRequest('GET', this.baseUrl + '/collections', userId, {type: type},
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
 * @param {function(Error, CollectionDTO)} callback
 */
CollectionManager.prototype.publishCollection = function (userId, collectionId, callback) {
    this.authenticatedHttpClient.jsonRequest('POST', this.baseUrl + '/collections/' + collectionId, userId, {},
        function (error, response) {

            if (error) {
                callback(error, null);
                return;
            }

            callback(null, response.published_file_path);
        });
};
//POST /collections/{collectionId}

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

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {string} itemId
 * @param {Array<NewItemRequest>} newItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.insertBefore = function (userId, collectionId, itemId, newItemRequests, callback) {
    var params = newItemRequests.map(function (newItemRequest) {
        return newItemRequest.toParams();
    });

    this.authenticatedHttpClient.jsonRequest('POST', this.baseUrl + '/collections/' + collectionId + '/items/insert-before/' + itemId, userId, { items: params },
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
//POST /collections/{collectionId}/items/insert-before/{itemId}

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {string} itemId
 * @param {Array<NewItemRequest>} newItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.insertAfter = function (userId, collectionId, itemId, newItemRequests, callback) {
    var params = newItemRequests.map(function (newItemRequest) {
        return newItemRequest.toParams();
    });

    this.authenticatedHttpClient.jsonRequest('POST', this.baseUrl + '/collections/' + collectionId + '/items/insert-after/' + itemId, userId, { items: params },
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
//POST /collections/{collectionId}/items/insert-after/{itemId}

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {Array<UpdateItemRequest>} newItemRequests
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.updateItems = function (userId, collectionId, newItemRequests, callback) {

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
                return new ItemDTO(item.object);
            });

            callback(null, items);
        });
};
//PUT /collections/{collectionId}/items

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {Array<string>} itemIds
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.moveToStart = function (userId, collectionId, itemIds, callback) {

    this.authenticatedHttpClient.jsonRequest('POST', this.baseUrl + '/collections/' + collectionId + '/items/move-first', userId, { item_ids: itemIds },
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
//POST /collections/{collectionId}/items/move-first

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {Array<string>} itemIds
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.moveToEnd = function (userId, collectionId, itemIds, callback) {

    this.authenticatedHttpClient.jsonRequest('POST', this.baseUrl + '/collections/' + collectionId + '/items/move-last', userId, { item_ids: itemIds },
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
//POST /collections/{collectionId}/items/move-last

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {string} itemId
 * @param {Array<string>} itemIds
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.moveBefore = function (userId, collectionId, itemId, itemIds, callback) {

    this.authenticatedHttpClient.jsonRequest('POST', this.baseUrl + '/collections/' + collectionId + '/items/move-before/' + itemId, userId, { item_ids: itemIds },
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
//POST /collections/{collectionId}/items/move-before/{itemId}

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {string} itemId
 * @param {Array<string>} itemIds
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.moveAfter = function (userId, collectionId, itemId, itemIds, callback) {

    this.authenticatedHttpClient.jsonRequest('POST', this.baseUrl + '/collections/' + collectionId + '/items/move-after/' + itemId, userId, { item_ids: itemIds },
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
//POST /collections/{collectionId}/items/move-after/{itemId}

/**
 * @param {string} userId
 * @param {string} collectionId
 * @param {Array<string>} itemIds
 * @param {function(Error, Array<ItemDTO>)} callback
 */
CollectionManager.prototype.deleteItems = function (userId, collectionId, itemIds, callback) {
    this.authenticatedHttpClient.jsonRequest('DELETE', this.baseUrl + '/collections/' + collectionId + '/items', userId, { item_ids: itemIds },
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
//DELETE /collections/{collectionId}/items

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

