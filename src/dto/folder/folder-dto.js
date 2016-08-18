/**
 * @param {{}} data
 * @constructor
 */
function FolderDTO(data) {

    /**
     * @type {string}
     */
    this.folderId = null;

    /**
     * @type {string}
     */
    this.parentFolderId = null;

    /**
     * @type {string}
     */
    this.folderName = null;

    /**
     * @type {string}
     */
    this.mediaType = null;

    /**
     * @type {number}
     */
    this.dateCreated = null;

    /**
     * @type {number}
     */
    this.dateModified = null;
    
    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param {{}} data
 */
FolderDTO.prototype.deserialize = function (data) {
    this.folderId = data.folder_id;
    this.parentFolderId = data.parent_folder_id;
    this.folderName = data.folder_name;
    this.mediaType = data.media_type; 
    this.dateCreated = data.created_ts;
    this.dateModified = data.modified_ts;
};

/**
 * @type {FolderDTO}
 */
module.exports = FolderDTO;

/*
 {
 "parent_folder_id": "ee8c2138426e40a0844e6a23e8dbd9a9",
 "created_ts": 1467286741,
 "modified_ts": 1467286741,
 "folder_name": "moshe",
 "media_type": "video",
 "folder_id": "ada9137dbfe64a3ca95ac0f4275b6e24",
 "tags": []
 }
 */