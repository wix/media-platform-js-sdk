# Wix Media Platform

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[Wix Media Platform](https://www.wixmp.com/) is a collection of services for storing, serving, uploading, and managing image, audio, and video files.

## Image

Wix Media Platform provides powerful image-processing services that support resizing, cropping, rotating, sharpening, and face-detection, as well as offering a number of filters and adjustments. Images can be easily served with on-the-fly manipulations using the Wix Media Platform SDKs or Image API.

See it in [action.](https://app.wixmp.com/dashboard/index.html)

## Audio

Wix Media Platform provides storage for professional, high-quality audio files that can then be used in commercial music-selling applications.

## Video

Video files uploaded to Wix Media Platform are automatically transcoded into additional formats of various qualities, enabling video playback on any browser or Internet-connected device.

For video playback see [Vidi](https://github.com/wix/vidi) - Adaptive video playback library.

## Documents

In addition, Wix Media Platform supports uploading and distribution of documents such as Excel and Word.

# JavaScript SDK

This package is an isomorphic JavaScript library (works both in Node JS and in the browser) that provides a convenient API to access Wix Media Platform services.

## Installation

```bash
npm install media-platform-js-sdk --save
```
## Running the Demo

```bash
git clone git@github.com:wix/media-platform-js-sdk.git

npm start
```
and open http://localhost:3333/ in the browser

## Instantiating the Media Platform in the Server

First, if you haven't done so yet, register at [Wix Media Media Platform](https://app.wixmp.com/dashboard/index.html),
Once registered you'll be issued with your own API Key, API Secret and API Endpoint.

```javascript
var MediaPlatform = require('media-platform-js-sdk').MediaPlatform;

var mediaPlatform = new MediaPlatform({
  domain: '<Project domain as appears in the Dashboard>',
  appId: '<API Key as appears in the Dashboard>',
  sharedSecret: '<API Secret as appears in the Dashboard>'
});
```
## Instantiating the Media Platform in the Browser

```html
<script src="/media-platform.min.js">

var mediaPlatform = new MP.MediaPlatform({
    domain: 'api.wixmp.com',
    authenticationUrl: '<your authentication url - see example below>'
});
```
Authentication URL Node.js (with express) example:

```javascript
app.get('/media-platform/auth-header', function (req, res, next) {
    mediaPlatform.getHeader('userId', function (error, header) {
        if (error) {
            res.status(500).send(error.message);
            return;
        }
        res.send(header);
    });
});
```

## File Upload

### Server

```javascript
var UploadRequest = require('media-platform-js-sdk').file.UploadRequest;
 
var uploadRequest = new UploadRequest()
    .setContentType('image/jpeg')
    .addTags('cat', 'fish');
mediaPlatform.uploadFile('path', <ReadStream || Buffer || string path to file>, uploadRequest || null, function (error, response) {

    if (error) {
      console.error('upload failed: ' + error.message);
      return;
    }

    console.log('upload successful: ' + response);
});
```

### Browser

File upload from the browser is a 2 step operation: 
 1. First the signed URL and the upload token is retrieved from the server
 2. Then a multipart/form-data request is made to the URL

In the server expose a route that returns the signed URL and upload token:

```javascript
app.get('/upload/:mediaType/credentials', function(req, res, next) {

    mediaPlatform.fileUploader.getUploadUrl('userId', req.params.mediaType,  function (error, urlAndToken) {

        if (error) {
            res.status(500).send(error.message);
            return;
        }

        res.send(urlAndToken);
    });
    
});
```

From the browser GET the URL and POST the form to it, including the token in the form body 

```html
<form id="upload-form" enctype="multipart/form-data" action="" method="post" target="upload-result">
    <input id="file" name="file" type="file" accept="image/*">
    <input id="media-type" name="media_type" type="text" value="picture" hidden>
</form>
<button id="upload-button">Upload</button>

<script>
    var button = document.getElementById('upload-button');
    var form = document.getElementById('upload-form');
    
    button.addEventListener('click', function () {

        mediaPlatform.fileUploader.getUploadUrl(MP.MediaType.IMAGE, function(error, response) {
            
            if (error) {
                alert('Oops! Something went wrong.');
                return;
            }
            
            var formData = new FormData(form);
            formData.append('upload_token', response.uploadToken);

            var request = new XMLHttpRequest();
            request.responseType = 'json';
            request.addEventListener('load', function (event) {
                var imageDto = new ImageDTO(event.target.response[0]);
                var imageRequest = MP.image.fromDto('media.wixapps.net', imageDto);
                var imageUrl = imageRequest.crop(800, 200, 1, 1).toUrl();
                var img = document.createElement('img');
                img.setAttribute('src', imageUrl.url);
            });
            request.addEventListener('error', function (event) {
                alert('Oops! Something went wrong.');
            });

            request.open('POST', response.uploadUrl);
            request.send(formData);
        })
})</script>
```

## Image Consumption

The SDK provides a programmatic facility to generate image URLs 

### Server

```javascript
/**
* A new image request from the host and ImageDTO (response from server)
*/
var fromDto = require('media-platform-js-sdk').image.fromDto;
var imageRequest = fromDto('media.wixapps.net', imageDto);

/**
* A new image request from a previously generated url
*/
var urlToImageRequest = require('media-platform-js-sdk').image.urlToImageRequest;
var imageRequest = urlToImageRequest('//media.wixapps.net/wixmedia-samples/images/000c45e21f8a433cb3b2483dfbb659d8/v1/fit/w_300,h_200/image.jpg#w_600,h_400,mt_image%2Fjpeg');

/**
* A new image request from the base url and the file id
*/
var ImageRequest = require('media-platform-js-sdk').image.ImageRequest;
var imageRequest = new ImageRequest('media.wixapps.net/wixmedia-samples/images', '000c45e21f8a433cb3b2483dfbb659d8');

var url = imageRequest.fit(500, 500).negative().saturation(-90).toUrl().url;

/**
* A pre-configured operation from a previously generated url
*/
var fromUrl = require('media-platform-js-sdk').image.fromUrl;
var imageOperation = fromUrl('//media.wixapps.net/wixmedia-samples/images/000c45e21f8a433cb3b2483dfbb659d8/v1/fit/w_300,h_200/image.jpg#w_600,h_400,mt_image%2Fjpeg');

var url = imageOperation.negative().saturation(-90).toUrl().url;

```

### Browser

```javascript
/**
* A new request from the host and ImageDTO (response from server)
*/
var imageRequest = MP.image.fromDto('media.wixapps.net', imageDto);


/**
* A new image request from a previously generated url
*/
var imageRequest = MP.image.urlToImageRequest('//media.wixapps.net/wixmedia-samples/images/000c45e21f8a433cb3b2483dfbb659d8/v1/fit/w_300,h_200/image.jpg#w_600,h_400,mt_image%2Fjpeg');

/**
* A new request from the base url and the file id
*/
var imageRequest = new MP.image.ImageRequest('media.wixapps.net/wixmedia-samples/images', '000c45e21f8a433cb3b2483dfbb659d8');

var url = imageRequest.fit(500, 500).negative().saturation(-90).toUrl().url;

/**
* A pre-configured operation from a previously generated url
*/
var imageOperation = MP.image.fromUrl('//media.wixapps.net/wixmedia-samples/images/000c45e21f8a433cb3b2483dfbb659d8/v1/fit/w_300,h_200/image.jpg#w_600,h_400,mt_image%2Fjpeg');

var url = imageOperation.negative().saturation(-90).toUrl().url;
```

## File Management

Wix Media Platform exposes a comprehensive set of APIs tailored for the management of previously uploaded files.

```javascript
var fileManager = mediaPlatform.fileManager;
```

Retrieve a list of uploaded files

```javascript
var ListFilesRequest = require('media-platform-js-sdk').file.ListFilesRequest;

var listFilesRequest = new ListFilesRequest()
    .ascending()
    .setCursor('c')
    .setMediaType(MediaType.IMAGE)
    .orderBy('date')
    .setSize(10)
    .setTag('dog')
    .setParentFolderId('parentFolderId');
fileManager.listFiles('userId', listFilesRequest, callback)
```

Get an uploaded file metadata 

(*does not return the actual file*)

```javascript
fileManager.getFile('fileId', callback)
```

Update a file metadata

```javascript
var UpdateFileRequest = require('media-platform-js-sdk').file.UpdateFileRequest;

var updateFileRequest = new UpdateFileRequest()
    .setOriginalFileName('dog.jpeg')
    .setParentFolderId('folderId')
    .setTags(['dog', 'Schnauzer']);
fileManager.updateFile('userId', 'fileId', updateFileRequest, callback);
```

Delete file

*Warning: The file will no longer be reachable*

```javascript
fileManager.deleteFile('userId', 'fileId', callback);
```

## Reporting Issues

Please use [the issue tracker](https://github.com/wix/media-platform-js-sdk/issues) to report issues related to this library, or to the Wix Media Platform API in general.

## License

We use a custom license, see [LICENSE.md](LICENSE.md).

## About Wix

[Wix.com](https://www.wix.com) is a leading cloud-based web development platform with more than 86 million registered users worldwide. 
Our powerful technology makes it simple for everyone to create a beautiful website and grow their business online.

## About Google Cloud Platform

[Google Cloud Platform](https://cloud.google.com/) enables developers to build, test and deploy applications on Google’s reliable infrastructure.
It offers computing, storage and application services for web, mobile and backend solutions.


[npm-url]: https://npmjs.org/package/media-platform-js-sdk
[npm-image]: https://img.shields.io/npm/v/media-platform-js-sdk.svg
[downloads-image]: https://img.shields.io/npm/dm/media-platform-js-sdk.svg
