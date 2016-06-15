var fs = require('fs');
var authenticationFacade = require('../authentication/authentication-facade');

/**
 * @summary Data returned from uploading media
 */
function decorate(context, data) {
	Object.defineProperty(context, "fileId", { get: function () { return data.file_url; } });
	Object.defineProperty(context, "iconUrl", { get: function () { return data.icon_url; } });
	Object.defineProperty(context, "fileUrl", { get: function () { return data.file_url; } });
	Object.defineProperty(context, "hash", { get: function () { return data.hash; } });
	Object.defineProperty(context, "labels", { get: function () { return data.labels; } });
	Object.defineProperty(context, "fileSize", { get: function () { return data.file_size; } });
	Object.defineProperty(context, "fileName", { get: function () { return data.file_name; } });
	Object.defineProperty(context, "originalFileName", { get: function () { return data.original_file_name; } });
	Object.defineProperty(context, "rawData", { get: function () { return data; } });
	Object.defineProperty(context, "faces", {
		get: function () {
			if(data.file_input && data.file_input.face) {
				return data.file_input.face;
			}
			return [];
		}
	});
}

/**
 * Information about an image that was uploaded
 * @alias ImageMedia
 * @constructor
 * @property {string} fileId - The id of the uploaded file
 * @property {string} imageId - The id of the uploaded image
 * @property {string} fileUrl - The url of the uploaded file. This is the same as the fileId
 * @property {string} fileSize - The size of the uploaded file
 * @property {string} fileName - The name of the uploaded file
 * @property {string} originalFileName - The original file name of the uploaded file
 * @property {string} width - If an image, the width of the image
 * @property {string} height - If an image, the height of the image
 * @property {string} rawData - the raw metadata
 * @memberof upload.data
 * @component nodejs
 */
function ImageMedia(data) {
	decorate(this, data);
	Object.defineProperty(this, "imageId", { get: function () { return data.file_url; } });
	Object.defineProperty(this, "width", { get: function () { return data.width; } });
	Object.defineProperty(this, "height", { get: function () { return data.height; } });
}

/**
 * Information about an audio file that was uploaded
 * @alias AudioMedia
 * @constructor
 * @property {string} fileId - The id of the uploaded file
 * @property {string} audioId - The id of the uploaded audio file
 * @property {string} fileUrl - The url of the uploaded file. This is the same as the fileId
 * @property {string} fileSize - The size of the uploaded file
 * @property {string} fileName - The name of the uploaded file
 * @property {string} originalFileName - The original file name of the uploaded file
 * @property {string} rawData - the raw metadata
 */
function AudioMedia(data) {
	decorate(this, data);
	Object.defineProperty(this, "audioId", { get: function () { return data.file_url; } });
}

/**
 * Information about a video file that was uploaded
 * @alias VideoMedia
 * @constructor
 * @property {string} fileId - The id of the uploaded file
 * @property {string} videoId - The id of the uploaded video file
 * @property {string} fileUrl - The url of the uploaded file. This is the same as the fileId
 * @property {string} fileSize - The size of the uploaded file
 * @property {string} fileName - The name of the uploaded file
 * @property {string} originalFileName - The original file name of the uploaded file
 * @property {string} rawData - the raw metadata
 */
function VideoMedia(data) {
	decorate(this, data);
	Object.defineProperty(this, "videoId", { get: function () { return data.file_url; } });
}

var ImageMode = {
	toMetadata : function(data) {
		return new ImageMedia(data);
	},
	getUrl : function() {
		return '/files/upload/url';
	},
	getMediaType : function() {
		return 'picture';
	}

};

var VideoMode = {
	toMetadata : function(data) {
		return new VideoMedia(data);
	},
	getUrl : function() {
		return '/files/video/upload/url';
	},
	getMediaType: function() {
		return 'video';
	}
};

var AudioMode = {
	toMetadata : function(data) {
		return new AudioMedia(data);
	},
	getUrl : function() {
		return '/files/upload/url';
	},
	getMediaType: function() {
		return 'music';
	}
};

/**
 * @param config
 * @constructor
 */
function UploadClient(config) {
	authenticationFacade.call(this, config);
}

UploadClient.prototype = authenticationFacade.prototype;

UploadClient.prototype.getUploadUrl = function(mode) {
	var that = this;
	return new Promise(function (resolve, reject) {
		that.getAuthToken().then(function (authToken) {
			var options = {
				headers: that.getAuthHeaders(authToken),
				path: mode.getUrl(),
				host: that.config.url
			};
			mediaHttp.request(options).then(function (data) {
				resolve(data.data.upload_url);
			}, function (error) {
				reject(error);
			});
		}, function (error) {
			reject(error);
		});
	});
};

function MediaFile(path) {
	this.path = path;
}

MediaFile.prototype.getUploadData = function() {
	var that = this;
	return new Promise(function (resolve, reject) {
		fs.statAsync(that.path).then(function (stats) {
			resolve(rest.file(that.path, null, stats.size));
		}, function (error) {
			reject(error);
		});
	});
};

function B64Data(imageName, data) {
	this.data = data;
	this.imageName = imageName;
}

B64Data.prototype.getUploadData = function() {
	var that = this;
	return new Promise(function (resolve, reject) {
		try {
			var matches = that.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

			if (matches === null || matches.length < 2) {
				reject('Bad image Base64 header');
			} else {
				resolve(rest.data(that.imageName, null, new Buffer(matches[2], 'base64')));
			}
		}catch(e) {
			reject('Bad image Base64 header');
		}
	});
};

function handleReject(error, callback, reject) {
	if(typeof callback === "function") {
		callback(error, null);
	}
	reject(error);
}

function uploadMedia(client, mode, mediaData, callback) {
	var p = new Promise(function (resolve, reject) {
		client.getUploadUrl(mode).then(function (uploadUrl) {
			mediaData.getUploadData().then(function (uploadData) {
				"use strict";
				rest.post(uploadUrl, {
					multipart: true,
					headers: client.getAuthHeaders(client.authToken),
					data: {
						"media_type": mode.getMediaType(),
						"file": uploadData
					}

				}).on('complete', function (data) {
					if (data.hasOwnProperty('error_code')) {
						handleReject(data, callback, reject);
					} else {
						var retVal = mode.toMetadata(data[0]);
						if (typeof callback === "function") {
							callback(null, retVal);
						}
						resolve(retVal);
					}
				}).on('error', function (data) {
					handleReject(data, callback, reject);
				});
			}, function (error) {
				handleReject(error, callback, reject);
			});
		}, function (error) {
			handleReject(error, callback, reject);
		});
	});
	if (typeof callback === "function") {
		var ref = setInterval(function () {
			if (p.isFulfilled() || p.isRejected()) {
				clearInterval(ref);
				return;
			}
		}, 100);
	}
	return p;
}

UploadClient.prototype.uploadImageFile = function (path, callback) {
	return uploadMedia(this, ImageMode, new MediaFile(path), callback);
};

UploadClient.prototype.uploadVideoFile = function (path, callback) {
	return uploadMedia(this, VideoMode, new MediaFile(path), callback);
};

UploadClient.prototype.uploadAudioFile = function (path, callback) {
	return uploadMedia(this, AudioMode, new MediaFile(path), callback);
};

UploadClient.prototype.uploadB64 = function (imageName, data, callback) {
	return uploadMedia(this, ImageMode, new B64Data(imageName, data), callback);
};

/**
 * Callback for a successful file upload
 *
 * @callback UploadStatus
 * @param {Object} error - Information about the error that occurred
 * @param {UploadedData} data - Information about the uploaded data
 * @memberof upload
 * @component nodejs
 */

/**
 * Callback for a failing file upload
 *
 * @callback UploadFailure
 * @memberof upload
 * @component nodejs
 */

module.exports = {

	client : function(config) {

		var client = new UploadClient(config);
		/**
		 * @summary Client to upload media to the Wix Media Platform
		 * @module WixUpload
		 * @alias UploadClient
		 * @component nodejs
		 */
		return {
			/**
			 * @summary Creates a new instance of an ImageUploader.
			 * @returns {module:WixUpload.ImageUploader}
			 * @component nodejs
			 */
			images : function() {
				/**
				 * @summary The interface used to upload images to WixMP
				 * @constructor
				 * @alias ImageUploader
				 * @name ImageUploader
				 * @static
				 * @component nodejs
				 */
				return {
					/**
					 * @summary Uploads an image to the Wix Media Platform. Accepts callbacks, or returns a promise. If callbacks are not supplied, a Promise is returned
					 * @param {string} path - The local path to the image
					 * @param {UploadStatus} [success=null] - An optional callback triggered on success
					 * @returns {Promise<upload.data.ImageMedia>} A promise that will yield an {@link upload.data.ImageMedia} object, or null if using callbacks
					 * @memberof module:WixUpload.ImageUploader
					 * @snippet uploadImageCB.js Uploading an image file with callbacks
					 * @snippet uploadImageP.js Uploading an image file with promises
					 * @component nodejs
					 */
					uploadFromFile : function(path, callback) {
						return client.uploadImageFile(path, callback);
					},

					/**
					 * @summary Uploads a base64 encoded image to the Wix Media Platform. Accepts callbacks, or returns a promise. If callbacks are not supplied, a Promise is returned
					 * @memberOf UploadClient
					 * @param {string} name - The name of the image
					 * @param {string} data - The data of the image. Data must start with data:image/{jpg|png|gif|..};base64,
					 * @param {UploadStatus} [success=null] - An optional callback triggered on success
					 * @returns {Promise<upload.data.ImageMedia>} A promise that will yield an {@link upload.data.ImageMedia} object, or null if using callbacks
					 * @memberof module:WixUpload.ImageUploader
					 * @component nodejs
					 */
					uploadFromB64 : function(imageName, data, callback) {
						return client.uploadB64(imageName, data, callback);
					}
				};
			},

			/**
			 * @summary Creates a new instance of a VideoUploader.
			 * @returns {module:WixUpload.VideoUploader}
			 * @component nodejs
			 */
			video : function() {

				/**
				 * @summary The interface used to upload videos to WixMP
				 * @constructor
				 * @alias VideoUploader
				 * @name VideoUploader
				 * @static
				 * @component nodejs
				 */
				return {
					/**
					 * Uploads a video file to the Wix Media Platform. Accepts callbacks, or returns a promise. If callbacks are not supplied, a Promise is returned
					 * @memberOf UploadClient
					 * @param {string} path - The local path to the video file
					 * @param {UploadStatus} [success=null] - An optional callback triggered on success
					 * @returns {Promise<upload.data.VideoMedia>} A promise that will yield an {@link upload.data.VideoMedia} object, or null if using callbacks
					 * @memberof module:WixUpload.VideoUploader
					 * @snippet uploadVideoCB.js Uploading a video file with callbacks
					 * @snippet uploadVideoP.js Uploading a video file with promises
					 * @component nodejs
					 */
					uploadFromFile: function (path, callback) {
						return client.uploadVideoFile(path, callback);
					}
				};
			},

			/**
			 * @summary Creates a new instance of an AudioUploader.
			 * @returns {module:WixUpload.AudioUploader}
			 */
			audio : function() {

				/**
				 * @summary The interface used to upload audio files to WixMP
				 * @constructor
				 * @alias AudioUploader
				 * @name AudioUploader
				 * @static
				 * @component nodejs
				 */
				return {
					/**
					 * Uploads an audio file to the Wix Media Platform. Accepts callbacks, or returns a promise. If callbacks are not supplied, a Promise is returned
					 * @memberOf UploadClient
					 * @param {string} path - The local path to the audio file
					 * @param {UploadStatus} [success=null] - An optional callback triggered on success
					 * @returns {Promise<upload.data.AudioMedia>} A promise that will yield an {@link upload.data.AudioMedia} object, or null if using callbacks
					 * @memberof module:WixUpload.AudioUploader
					 * @snippet uploadAudioCB.js Uploading an audio file with callbacks
					 * @snippet uploadAudioP.js Uploading an audio file with promises
					 * @component nodejs
					 */
					uploadFromFile: function (path, callback) {
						return client.uploadAudioFile(path, callback);
					}
				};
			}
		};
	}
};
