# Wix Media Platform

[![Build Status][travis-image]][travis-url] 
[![NPM version][npm-image]][npm-url] 
[![Downloads][downloads-image]][npm-url]

[Wix Media Platform][wixmp-url] is an end-to-end solution for all modern web media management, handling images, video and audio in the most efficient way on the market. From upload, storage, metadata management and all the way to delivery, Wix Media Platform takes care of all possible media workflows.

# JavaScript SDK

This package is an isomorphic JavaScript library (works both in Node JS and in the browser) that provides a convenient API to access Wix Media Platform services.

## Installation

```bash
npm install media-platform-js-sdk --save
```
To get the most up-to-date version of the JS SDK, move to your project directory and type in ```npm update```:
```bash
cd media-platform-js-sdk
npm update
```
[Click here](https://docs.npmjs.com/getting-started/updating-local-packages) for more info.
## Running the Demo

```bash
git clone git@github.com:wix/media-platform-js-sdk.git

cd media-platform-js-sdk

npm install

npm start
```
and open http://localhost:3333/ in the browser

## Instantiating the Media Platform in the Server

First, if you haven't done so yet, register at [Wix Media Platform][wixmp-url], create your [organization, project][org-and-project-start] and [application][application-start].

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

[File Upload API Documentation](https://support.wixmp.com/en/article/file-management#upload-file)
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

## File Import
[File Import API documentation](https://support.wixmp.com/en/article/file-import)


```javascript
var ImportFileRequest = require('media-platform-js-sdk').file.ImportFileRequest;

var importFileRequest = new ImportFileRequest()
    .setDestination(new Destination().setPath('/to/here/file.txt'))
    .setSourceUrl('http://from/here/file.txt');

mediaPlatform.fileManager.importFile(importFileRequest, function (error, data) {
	if (error) {
        console.error('import failed: ' + error.message);
		return;
	}
	console.log('import successful: ' + response);
});
```

## Download a Secure File
[File Download API documentation](https://support.wixmp.com/en/article/file-download)

File access can be restricted by setting the acl to 'private'. In order to access these files, a secure URL must be generated

```javascript

var DownloadUrlRequest = require('media-platform-js-sdk').file.DownloadUrlRequest;

var downloadUrlRequest = new DownloadUrlRequest();

var downloadUrl = mediaPlatform.getDownloadUrl(path, downloadUrlRequest);
```

## Jobs

The [Jobs API][jobs-api] forms the basis for all long running asynchronous operations in the platform.

### Job Lifecycle

A job is created by a service that performs a long running operation, such as video transcode or file import.

1. When a job is created, it is queued for execution, and its status is initially set to 'pending'.
2. Once the job execution commences, the job status is updated to 'working'.
3. On job completion, the job status is updated to either 'success' or 'error', and the 'result' property is populated (prior to the job's completion, the 'result' field is null).

### Get Job


```javascript

jobManager.getJob('jobId', callback);
```

### Get Job Group

```javascript

jobManager.getJobGroup('jobGroupId', callback);
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

## File Metadata & Management
[File Management API Documentation](https://support.wixmp.com/en/article/file-management)

[File Metadata API Documentation](https://support.wixmp.com/en/article/file-metadata)

Wix Media Platform provides a comprehensive set of APIs tailored for management of previously uploaded files.

```javascript
var fileManager = mediaPlatform.fileManager;
```

### List Files in a Directory

```javascript
var ListFilesRequest = require('media-platform-js-sdk').file.ListFilesRequest;

var listFilesRequest = new ListFilesRequest()
    .ascending()
    .setCursor('c')
    .setPageSize(10);

fileManager.listFiles('/directory', listFilesRequest, callback);
```

### Get File Metadata (by id)

```javascript
fileManager.getFileMetadataById('fileId', callback);
```

### Delete File (by id or path)

```javascript
fileManager.deleteFileById('fileId', callback);

fileManager.deleteFileByPath('/path/to/file.txt', callback);
```

## Archive Functions
[Archive API Documentation](https://support.wixmp.com/en/article/archive-service)

### Archive Creation

It is possible to create an archive from several files

```javascript
var CreateArchiveRequest = require('media-platform-js-sdk').archive.CreateArchiveRequest;

var createArchiveRequest = new CreateArchiveRequest()
                    .setDestination(
                        new Destination().setPath('/fish/file.zip').setAcl('public')
                    )
                    .addSource(
                        new Source().setFileId('file-to-archive')
                    )
                    .setArchiveType('zip');

mediaPlatform.archiveManager.createArchive(createArchiveRequest, function(job, error) {
    // handle job success
});
```

### Archive Extraction

Instead of uploading numerous files one by one, it is possible to upload a single zip file
and order the Media Platform to extract its content to a destination directory. 

```javascript
var ExtractArchiveRequest = require('media-platform-js-sdk').archive.ExtractArchiveRequest;

var destination = new Destination().setDirectory('/fish').setAcl('public');
var source = new Source().setFileId('archive-file-id');
var extractArchiveRequest = new ExtractArchiveRequest()
                                    .setDestination(destination)
                                    .setSource(source);

mediaPlatform.archiveManager.extractArchive(extractArchiveRequest, function(job, error) {
    // handle job success
});
```

## Transcoding

[Transcode API Documentation](https://support.wixmp.com/en/article/video-transcoding-5054232)

To initiate a transcode request

```javascript
var transcodeSpecification = new TranscodeSpecification()
    .setDestination(new Destination()
                        .setDirectory('/test/output/')
                        .setAcl('public')
    )
    .setQualityRange(new QualityRange()
                        .setMinimum('240p')
                        .setMaximum('1440p'));

var transcodeRequest = new TranscodeRequest()
    .addSource(new Source().setPath('/test/file.mp4'))
    .addSpecification(transcodeSpecification);

transcodeManager.transcodeVideo(transcodeRequest, function(error, data) {
    // handle response
});
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
[org-and-project-start]: https://support.wixmp.com/en/article/creating-your-organization-and-project
[application-start]: https://support.wixmp.com/en/article/creating-your-first-application
[jobs-api]: https://support.wixmp.com/en/article/jobs
