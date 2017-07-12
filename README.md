# Wix Media Platform

[![Build Status][travis-image]][travis-url] 
[![NPM version][npm-image]][npm-url] 
[![Downloads][downloads-image]][npm-url]

[Wix Media Platform][wixmp-url] is a collection of services for storing, serving, uploading, and managing media files and any files in general

# JavaScript SDK

This package is an isomorphic JavaScript library (works both in Node JS and in the browser) that provides a convenient API to access Wix Media Platform services.

## Installation

```bash
npm install media-platform-js-sdk --save
```
## Running the Demo

```bash
git clone git@github.com:wix/media-platform-js-sdk.git

cd media-platform-js-sdk

npm install

npm start
```
and open http://localhost:3333/ in the browser

## Instantiating the Media Platform in the Server

First, if you haven't done so yet, register at [Wix Media Platform][wixmp-url], create your organization, project and application.

```javascript
var MediaPlatform = require('media-platform-js-sdk').MediaPlatform;

var mediaPlatform = new MediaPlatform({
    domain: '<As appears in the application page>',
    appId: '<As appears in the application page>',
    sharedSecret: '<As appears in the application page>'
});
```
## Instantiating the Media Platform in the Browser

```html
<script src="/media-platform.min.js">

var mediaPlatform = new MP.MediaPlatform({
    domain: '<As appears in the application page>',
    authenticationUrl: '<your authentication url - see example below>'
});
```
Authentication URL Node.js (with express) example:

```javascript
/**
 * Your own authentication mechanism comes here
 */
app.get('/media-platform/auth-header', function (req, res, next) {
    /**
     * @description by default, the header authenticates the application
     * @type {{Authorization}}
     */
    var header = mediaPlatform.getAuthorizationHeader();

    res.send(header);
});
```

## File Upload

### Server

```javascript
var UploadFileRequest = require('media-platform-js-sdk').file.UploadFileRequest;
/**
* Only required for streams and buffers
*/
var uploadRequest = new UploadFileRequest().setMimeType('image/jpeg');

mediaPlatform.uploadFile('/path', '<ReadStream || Buffer || string path to file>', uploadRequest || null, function (error, response) {

    if (error) {
        console.error('upload failed: ' + error.message);
        return;
    }

    console.log('upload successful: ' + response);
});
```

### Browser 

```html
<form id="upload-form" enctype="multipart/form-data" action="" method="post" target="upload-result">
    <input id="file" name="file" type="file">
</form>
<button id="upload-button">Upload</button>

<script>
    var fileUploadButton = document.getElementById('upload-button');
    var file = document.getElementById('file');
    var path = file.value.split("\\").pop();
        
    fileUploadButton.addEventListener('click', function() {
        mediaPlatform.fileManager.uploadFile(path, file)
            .on('upload-success', function(response) {
                 // do something
            })                
            .on('upload-error', function(error) {
                 // do something
            });
    });
</script>
```

## Image Consumption

The SDK provides a programmatic facility to generate image URLs 

```javascript
var Image = require('media-platform-js-sdk').Image;

/**
* The Image constructor accepts a FileDescriptor, FileMetadata or URL  
*/
var image = new Image(fileDescriptor);

var url = image.crop(200, 200).toUrl('http://<image host>').url;

```

## File Management

Wix Media Platform exposes a comprehensive set of APIs tailored for the management of previously uploaded files.

```javascript
var fileManager = mediaPlatform.fileManager;
```

List files in a directory

```javascript
var ListFilesRequest = require('media-platform-js-sdk').file.ListFilesRequest;

var listFilesRequest = new ListFilesRequest()
    .ascending()
    .setCursor('c')
    .setPageSize(10);

fileManager.listFiles('/directory', listFilesRequest, callback);
```

Get file metadata (by id)

```javascript
fileManager.getFileMetadataById('fileId', callback);
```

Delete file

```javascript
fileManager.deleteFileById('fileId', callback);

fileManager.deleteFileByPath('/path/to/file.txt', callback);
```

## Reporting Issues

Please use [the issue tracker](https://github.com/wix/media-platform-js-sdk/issues) to report issues related to this library, or to the Wix Media Platform API in general.

## License

We use a custom license, see [LICENSE.md](LICENSE.md).

## About Wix

[Wix.com][wix-url] is a leading cloud-based web development platform with more than 100 million registered users worldwide. 
Our powerful technology makes it simple for everyone to create a beautiful website and grow their business online.

## About Google Cloud Platform

[Google Cloud Platform](https://cloud.google.com/) enables developers to build, test and deploy applications on Google’s reliable infrastructure.
It offers computing, storage and application services for web, mobile and backend solutions.


[wix-url]: https://www.wix.com/
[wixmp-url]: https://gcp.wixmp.com/
[npm-image]: https://img.shields.io/npm/v/media-platform-js-sdk.svg
[npm-url]: https://npmjs.org/package/media-platform-js-sdk
[downloads-image]: https://img.shields.io/npm/dm/media-platform-js-sdk.svg
[travis-image]: https://travis-ci.org/wix/media-platform-js-sdk.svg?branch=master
[travis-url]: https://travis-ci.org/wix/media-platform-js-sdk
