var FolderDTO = require('../folder/folder-dto');

/**
 * @param {{}} data
 * @constructor
 */
function ListFoldersResponse(data) {

    /**
     * @type {number}
     */
    this.timeStamp = null;

    /**
     * @type {Array<FolderDTO>}
     */
    this.folders = [];

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param {{}} data
 */
ListFoldersResponse.prototype.deserialize = function (data) {
    
    this.timeStamp = data.ts;
    
    if (data.folders) {
        this.folders = data.folders.map(function (folder) {
            return new FolderDTO(folder);    
        })      
    } 
};

/**
 * @type {ListFoldersResponse}
 */
module.exports = ListFoldersResponse;
/*
 {
 "ts": 1467286745,
 "folders": [{
 "parent_folder_id": "ee8c2138426e40a0844e6a23e8dbd9a9",
 "created_ts": 1467286741,
 "modified_ts": 1467286741,
 "folder_name": "moshe",
 "media_type": "video",
 "folder_id": "ada9137dbfe64a3ca95ac0f4275b6e24"
 }, {
 "parent_folder_id": null,
 "created_ts": 1467286019,
 "modified_ts": 1467286019,
 "folder_name": "/",
 "media_type": "video",
 "folder_id": "dc7cd375ac9699d2de28415abc7081ac"
 }]
 }
 */