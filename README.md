# Wix Media Platform

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

## File Upload

### Server

### Browser

## Image Consumption

```javascript
var image = new Image('media.wixapps.net/wixmedia-samples/images', '000c45e21f8a433cb3b2483dfbb659d8', 'wow.jpeg');

var url = image.fit(500, 500).negative().saturation(-90).toUrl().url;
```

## Documentation

For detailed capabilities and APIs go to the full [documentation](http://mediacloud.wix.com/docs/overview.html)

## Reporting Issues

Please use [the issue tracker](https://github.com/wix/media-platform-js-sdk/issues) to report issues related to this library, or to the Wix Media Platform API in general.

## Contributing



## License
This library uses the Apache License, version 2.0.
