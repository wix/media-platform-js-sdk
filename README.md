# Wix Media Platform

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[Wix Media Platform](https://www.wixmp.com/) is a collection of services for storing, serving, uploading, and managing image, audio, and video files.

## Image

Wix Media Platform provides powerful image-processing services that support resizing, cropping, rotating, sharpening, and face-detection, as well as offering a number of filters and adjustments. Images can be easily served with on-the-fly manipulations using the Wix Media Platform SDKs or Image API.

See it in [action](https://app.wixmp.com/dashboard/index.html#/playground/picture)

## Audio

Wix Media Platform provides storage for professional, high-quality audio files that can then be used in commercial music-selling applications.

## Video

Video files uploaded to Wix Media Platform are automatically transcoded into additional formats of various qualities, enabling video playback on any browser or Internet-connected device.

For video playback see [Vidi](https://github.com/wix/vidi) - Adaptive video playback library.

# JavaScript SDK

This package is an isomorphic JavaScript library (works in Node and in the browser) that provides a convenient API to access Wix Media Platform file upload service and image manipulation API.

## Installation

```bash
npm install media-platform-js-sdk --save
```

## Running the Demo

```bash
npm start
```
and goto http://localhost:3333/

## Instantiating the Media Platform in the Server

```javascript
var MediaPlatform = require('media-platform-js-sdk').MediaPlatform;

var mediaPlatform = new MediaPlatform({
  domain: <as appears in the Dashboard>,
  apiKey: <as appears in the Dashboard>,
  sharedSecret: <as appears in the Dashboard>
});
```

## File Upload

### Server

```javascript
mediaPlatform.fileUploader.uploadImage(apiKey, <ReadStream || Buffer || string path to file>, function (error, response) {

    if (error) {
      console.error('upload failed: ' + error.message);
      return;
    }

    console.log('upload successful: ' + response);
});
```

### Browser

File upload from the browser is a 2 step operation, first the signed URL and the upload token is retrieved from the server
and then a multipart/form-data request is made to the URL.

In the server expose a route that returns the signed URL and upload token:

```javascript
app.get('/upload/:mediaType/credentials', function(req, res, next) {

    mediaPlatform.fileUploader.getUploadUrl(apiKey, req.params.mediaType,  function (error, urlAndToken) {

        if (error) {
            res.status(500).send(error.message);
            return;
        }

        res.send(urlAndToken);
    });
    
});
```

From the browser get the URL and POST the form to it 

```html
<form id="upload-form" enctype="multipart/form-data" action="" method="post" target="upload-result">
    <input id="file" name="file" type="file" accept="image/*">
    <input id="media-type" name="media_type" type="text" value="picture" hidden>
    <input id="upload-token" name="upload_token" type="text" hidden>
</form>
<button id="upload-button">Upload</button>

<script>
    var button = document.getElementById('upload-button');
    button.addEventListener('click', function () {
        fetch('http://localhost:3000/upload/picture/credentials').then(function (response) {
            response.json().then(function (uploadCredentials) {
                var form = document.getElementById('upload-form');
                form.getElementsByTagName('upload_token').value = uploadCredentials.uploadToken;
                form.setAttribute('action', uploadCredentials.uploadUrl);
                form.submit();
        })
    })
})
</script>
```

## Image Consumption

### Server

```javascript
var Image = require('media-platform-js-sdk').Image;

var image = new Image('media.wixapps.net/wixmedia-samples/images', '000c45e21f8a433cb3b2483dfbb659d8', 'wow.jpeg');

var url = image.fit(500, 500).negative().saturation(-90).toUrl().url;
```

### Browser

## Documentation

For detailed capabilities and APIs go to the full [documentation](http://mediacloud.wix.com/docs/overview.html)

## Reporting Issues

Please use [the issue tracker](https://github.com/wix/media-platform-js-sdk/issues) to report issues related to this library, or to the Wix Media Platform API in general.

## Contributing

## License
This library uses the Apache License, version 2.0.


[npm-url]: https://npmjs.org/package/media-platform-js-sdk
[npm-image]: https://img.shields.io/npm/v/media-platform-js-sdk.svg
[downloads-image]: https://img.shields.io/npm/dm/media-platform-js-sdk.svg
