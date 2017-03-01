var FileDescriptor = require('../management/metadata/file-descriptor');

/**
 * @constructor
 */
function WebhookEvent(data) {

    /**
     * @type {string}
     */
    this.id = null;

    /**
     * @type {string}
     */
    this.type = null;

    /**
     * @type {{}}
     */
    this.body = null;

    if (data) {
        this.deserialize(data);
    }
}

/**
 * @param data
 * @private
 */
WebhookEvent.prototype.deserialize = function (data) {
    this.id = data.id;
    this.type = data.type;
    switch (this.type) {
        case 'file_deleted':
        case 'file_created':
            this.body = new FileDescriptor(data.body);
            break;
        case 'metadata_updated':

            break;
        case 'file_transcode_completed':

            break;
    }
};

/**
 * @type {WebhookEvent}
 */
module.exports = WebhookEvent;