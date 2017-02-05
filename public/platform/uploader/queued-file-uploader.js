var async = require('async');

/**
 * @param {FileUploader} fileUploader
 * @param {number?} concurrency
 * @constructor
 */
function QueuedFileUploader(fileUploader, concurrency) {

    /**
     * @type {FileUploader}
     */
    this.fileUploader = fileUploader;

    /**
     * @type {QueueObject}
     */
    this.queue = async.queue(uploadWorker, concurrency ? concurrency : 4);

    function uploadWorker(uploadJob, callback) {
        uploadJob.once('upload-end', callback);
        uploadJob.run(fileUploader);
    }

    this.jobs = [];
}

/**
 * @param {UploadJob} uploadJob
 * @returns {QueuedFileUploader}
 */
QueuedFileUploader.prototype.enqueue = function (uploadJob) {

    if (this.jobs.indexOf(uploadJob) > -1) {
        console.warn('upload job already queued');
        return this;
    }

    this.jobs.push(uploadJob);
    this.queue.push(uploadJob, function () {
        var i = this.jobs.indexOf(uploadJob);
        if (i > -1) {
            this.jobs.splice(i, 1);
        }
    }.bind(this));

    return this;
};

/**
 * @description pauses the queue, in flight request will continue to completion
 * @returns {QueuedFileUploader}
 */
QueuedFileUploader.prototype.pause = function () {
    this.queue.pause();
    return this;
};

/**
 * @description resume a paused queue
 * @returns {QueuedFileUploader}
 */
QueuedFileUploader.prototype.resume = function () {
    this.queue.resume();
    return this;
};

/**
 * @description purges the queue, this will not abort in flight requests
 * @returns {QueuedFileUploader}
 */
QueuedFileUploader.prototype.kill = function () {
    this.queue.kill();
    this.jobs = [];
    return this;
};

/**
 * @description the number of of jobs left in the queue
 * @returns {*}
 */
QueuedFileUploader.prototype.length = function () {
    return this.queue.length();
};

/**
 * @type {QueuedFileUploader}
 */
module.exports = QueuedFileUploader;