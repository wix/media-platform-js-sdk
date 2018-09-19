---
layout: simple
---

[File Metadata API Documentation](https://support.wixmp.com/en/article/file-metadata)

Uploaded media files (images and video) are submitted for further processing, extraction and collection of metadata according to their type. 

> In order to retrieves files' metadata, your application needs to have a _[Permissions](https://support.wixmp.com/en/article/file-metadata#relevant-permission-settings)_
 that allows it to get metadata.

## Get File Metadata

```typescript
fileManager.getFileMetadataById(fileId: string): Promise<FileMetadata>
```
#### Parameters: 
- `fileId` (string) - the required file's ID.

returns Promise

## `FileMetadata` properties
A file's metadata also provides its [`FileDescriptor`](/file-Management#filedescriptor): 
```javascript
const fileDescriptor  = fileMetadata.fileDescriptor;
const basic = fileMetadata.basic;
const features = fileMetadata.features;
```
The file's metadata depends on its type (image or video).   
 
The `Metadata` object has the _basic_ and _features_ properties. The _basic_ field is automatically casted to `ImageBasicMetadata` or
 `VideoBasicMetadata` (see below), according to the file type.
The _features_ field includes information derived by WixMP's Feature Extraction and is casted automatically as well, to
 `ImageFeatures`. 



### `ImageBasicMetadata`
```javascript
const imageBasicMetadata = fileMetadata.basic;
```

| Field Name | Type      | Description            |
|------------|-----------| -----------------------|
| height     | integer   | Image height in pixels |
| width      | integer   | Image width in pixels  |
| format     | string    | Image file extension   |

### `ImageFeatures`
```javascript
const imageFeatures = fileMetadata.features;
```

| Field Name | Type              | Description                                     |
|------------|-------------------| ------------------------------------------------|
| labels     | Array\<Label>     | List of labels extracted from the image         |
| faces      | Array\<Rectangle> | List of faces detected in the image             |
| colors     | Array\<Color>     | List of dominant colors detected in the image   |


### `VideoBasicMetadata`
For an example of the `VideoBasicMetadata` fields' values, see the [Video Metadata API documentation](https://support.wixmp.com/en/article/file-metadata#video-metadata).

```javascript
const videoBasicMetadata = fileMetadata.basic;
```

| Field Name   | Type                | Description                     |
|--------------|---------------------| --------------------------------|
| interlaced   | boolean             | True if the video is interlaced |
| videoStreams | Array\<VideoStream> | Video stream info (see below)   |
| audioStreams | Array\<AudioStream> | Video stream info (see below)   |
| format       | VideoFormat         | Video format info (see below)   |


#### `VideoStream`

The `VideoStreams` field of the `VideoBasicMetadata` provides information about the video codec, frame rate, aspect ratio and more. 
```javascript
const videoStreams = videoBasicMetadata.videoStreams;
const videoStream = videoStreams[0];
```

| Field Name  | Type       | Description |
|-------------|------------| ------------|
| codecLongName | string    | Full video codec name (example: "MPEG-4 part 2") |
| codecName   | string     | The video's codec (example: "mpeg4") |
| codecTag    | string    | Video codec tag (example: "mp4v") |
| height      | integer    | Video height in pixels    |
| width       | integer    | Video width in pixels     |
| duration    | integer    | Video duration in seconds |
| bitrate     | integer    | Video bitrate             |
| rFrameRate  | string     | [Real base frame rate of the stream](https://ffmpeg.org/doxygen/2.7/structAVStream.html#ad63fb11cc1415e278e09ddc676e8a1ad)|
| avgFrameRate| string     | [Average frame rate of the stream](https://ffmpeg.org/doxygen/2.7/structAVStream.html#a946e1e9b89eeeae4cab8a833b482c1ad)|
| sampleAspectRatio| string| Sample (pixel) aspect ratio of the stream (example: "1:1")|
| displayAspectRatio| string| Display aspect ratio (DAR) of the stream (example: "16:9")|



#### `AudioStream`

The `AudioStream` field of the `VideoBasicMetadata` provides information about the audio codec, bit rate and more. 

```javascript
const audioStreams = videoBasicMetadata.audioStreams;
const audioStream = audioStreams[0];
```

| Field Name    | Type      | Description |
|---------------|-----------| ------------|
| codecLongName | string    | Full audio codec name (example: "AAC (Advanced Audio Coding)") |
| codecName     | string    | Audio codec (example: "aac") |
| codecTag      | string    | Audio codec tag (example: "mp4v") |
| duration      | integer   | Audio stream duration in seconds |
| bitrate       | integer   | Audio bitrate             |
| index         | integer   | Audio stream index        |


#### `VideoFormat()`
```javascript
const videoFormat = videoBasicMetadata.getFormat();
```

| Field Name     | Type      | Description |
|----------------|-----------| ------------|
| formatLongName | string    | The video's format (example: "QuickTime / MOV") |
| duration       | integer   | Video duration in seconds |
| bitrate        | integer   | Video bitrate             |
| size           | integer   | Video file size in bytes  |
